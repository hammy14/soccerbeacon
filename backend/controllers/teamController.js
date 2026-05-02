const pool = require('../config/database');

// Get all teams with optional filtering
exports.getAllTeams = async (req, res) => {
  try {
    const { league_id, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM teams WHERE 1=1';
    const params = [];

    if (league_id) {
      query += ' AND league_id = ?';
      params.push(league_id);
    }

    query += ' ORDER BY name ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const connection = await pool.getConnection();
    const [teams] = await connection.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM teams WHERE 1=1';
    const countParams = [];

    if (league_id) {
      countQuery += ' AND league_id = ?';
      countParams.push(league_id);
    }

    const [countResult] = await connection.query(countQuery, countParams);
    connection.release();

    res.json({
      teams,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

// Get team by ID with players and recent matches
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Get team
    const [teams] = await connection.query(
      'SELECT * FROM teams WHERE id = ?',
      [id]
    );

    if (teams.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Team not found' });
    }

    const team = teams[0];

    // Get players
    const [players] = await connection.query(
      'SELECT * FROM players WHERE team_id = ? ORDER BY number ASC',
      [id]
    );

    // Get recent matches
    const [matches] = await connection.query(
      `SELECT m.*, 
              ht.name as home_team_name, ht.logo_url as home_logo,
              at.name as away_team_name, at.logo_url as away_logo
       FROM matches m
       JOIN teams ht ON m.home_team_id = ht.id
       JOIN teams at ON m.away_team_id = at.id
       WHERE (m.home_team_id = ? OR m.away_team_id = ?)
       AND m.status IN ('finished', 'live')
       ORDER BY m.match_date DESC
       LIMIT 10`,
      [id, id]
    );

    // Get upcoming matches
    const [upcoming] = await connection.query(
      `SELECT m.*, 
              ht.name as home_team_name, ht.logo_url as home_logo,
              at.name as away_team_name, at.logo_url as away_logo
       FROM matches m
       JOIN teams ht ON m.home_team_id = ht.id
       JOIN teams at ON m.away_team_id = at.id
       WHERE (m.home_team_id = ? OR m.away_team_id = ?)
       AND m.status = 'scheduled'
       ORDER BY m.match_date ASC
       LIMIT 5`,
      [id, id]
    );

    // Get standings
    const [standings] = await connection.query(
      'SELECT * FROM standings WHERE team_id = ?',
      [id]
    );

    connection.release();

    res.json({
      team,
      players,
      recentMatches: matches,
      upcomingMatches: upcoming,
      standings: standings[0] || null,
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
};

// Create team (admin only)
exports.createTeam = async (req, res) => {
  try {
    const { league_id, name, city, founded_year, stadium, description, logo_url } = req.body;

    if (!league_id || !name) {
      return res.status(400).json({ error: 'League ID and name are required' });
    }

    const connection = await pool.getConnection();

    // Check if league exists
    const [leagues] = await connection.query(
      'SELECT id FROM leagues WHERE id = ?',
      [league_id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'League not found' });
    }

    // Check if team already exists in league
    const [existing] = await connection.query(
      'SELECT id FROM teams WHERE league_id = ? AND name = ?',
      [league_id, name]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Team already exists in this league' });
    }

    const [result] = await connection.query(
      `INSERT INTO teams (league_id, name, city, founded_year, stadium, description, logo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [league_id, name, city || null, founded_year || null, stadium || null, description || null, logo_url || null]
    );

    connection.release();

    res.status(201).json({
      id: result.insertId,
      league_id,
      name,
      message: 'Team created successfully',
    });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Failed to create team' });
  }
};

// Update team (admin only)
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, founded_year, stadium, description, logo_url } = req.body;

    const connection = await pool.getConnection();

    // Check if team exists
    const [teams] = await connection.query(
      'SELECT * FROM teams WHERE id = ?',
      [id]
    );

    if (teams.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Team not found' });
    }

    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (city !== undefined) {
      updateFields.push('city = ?');
      updateValues.push(city || null);
    }
    if (founded_year !== undefined) {
      updateFields.push('founded_year = ?');
      updateValues.push(founded_year || null);
    }
    if (stadium !== undefined) {
      updateFields.push('stadium = ?');
      updateValues.push(stadium || null);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description || null);
    }
    if (logo_url !== undefined) {
      updateFields.push('logo_url = ?');
      updateValues.push(logo_url || null);
    }

    if (updateFields.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(id);

    await connection.query(
      `UPDATE teams SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    connection.release();

    res.json({
      id,
      message: 'Team updated successfully',
    });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Failed to update team' });
  }
};

// Delete team (admin only)
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Check if team exists
    const [teams] = await connection.query(
      'SELECT * FROM teams WHERE id = ?',
      [id]
    );

    if (teams.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Team not found' });
    }

    await connection.query('DELETE FROM teams WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Failed to delete team' });
  }
};

// Get team players
exports.getTeamPlayers = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Check if team exists
    const [teams] = await connection.query(
      'SELECT * FROM teams WHERE id = ?',
      [id]
    );

    if (teams.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Team not found' });
    }

    // Get players
    const [players] = await connection.query(
      'SELECT * FROM players WHERE team_id = ? ORDER BY number ASC',
      [id]
    );

    connection.release();

    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};
