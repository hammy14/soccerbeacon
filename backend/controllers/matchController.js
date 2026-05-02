const pool = require('../config/database');

// Get all matches with filtering
exports.getAllMatches = async (req, res) => {
  try {
    const { league_id, status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `SELECT m.*, 
                        ht.name as home_team_name, ht.logo_url as home_logo,
                        at.name as away_team_name, at.logo_url as away_logo
                 FROM matches m
                 JOIN teams ht ON m.home_team_id = ht.id
                 JOIN teams at ON m.away_team_id = at.id
                 WHERE 1=1`;
    const params = [];

    if (league_id) {
      query += ' AND m.league_id = ?';
      params.push(league_id);
    }

    if (status) {
      query += ' AND m.status = ?';
      params.push(status);
    }

    query += ' ORDER BY m.match_date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const connection = await pool.getConnection();
    const [matches] = await connection.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM matches WHERE 1=1';
    const countParams = [];

    if (league_id) {
      countQuery += ' AND league_id = ?';
      countParams.push(league_id);
    }

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    const [countResult] = await connection.query(countQuery, countParams);
    connection.release();

    res.json({
      matches,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
};

// Get match by ID
exports.getMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    const [matches] = await connection.query(
      `SELECT m.*, 
              ht.name as home_team_name, ht.logo_url as home_logo,
              at.name as away_team_name, at.logo_url as away_logo,
              l.name as league_name
       FROM matches m
       JOIN teams ht ON m.home_team_id = ht.id
       JOIN teams at ON m.away_team_id = at.id
       JOIN leagues l ON m.league_id = l.id
       WHERE m.id = ?`,
      [id]
    );

    if (matches.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Match not found' });
    }

    connection.release();

    res.json(matches[0]);
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ error: 'Failed to fetch match' });
  }
};

// Create match (admin only)
exports.createMatch = async (req, res) => {
  try {
    const { league_id, home_team_id, away_team_id, match_date, venue, status = 'scheduled' } = req.body;

    if (!league_id || !home_team_id || !away_team_id || !match_date) {
      return res.status(400).json({ error: 'League ID, team IDs, and match date are required' });
    }

    const connection = await pool.getConnection();

    // Verify league exists
    const [leagues] = await connection.query(
      'SELECT id FROM leagues WHERE id = ?',
      [league_id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'League not found' });
    }

    // Verify teams exist
    const [teams] = await connection.query(
      'SELECT id FROM teams WHERE id IN (?, ?)',
      [home_team_id, away_team_id]
    );

    if (teams.length !== 2) {
      connection.release();
      return res.status(400).json({ error: 'One or both teams not found' });
    }

    const [result] = await connection.query(
      `INSERT INTO matches (league_id, home_team_id, away_team_id, match_date, venue, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [league_id, home_team_id, away_team_id, match_date, venue || null, status]
    );

    connection.release();

    res.status(201).json({
      id: result.insertId,
      league_id,
      home_team_id,
      away_team_id,
      match_date,
      status,
      message: 'Match created successfully',
    });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Failed to create match' });
  }
};

// Update match (admin only)
exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { home_score, away_score, status, venue, referee, attendance } = req.body;

    const connection = await pool.getConnection();

    // Check if match exists
    const [matches] = await connection.query(
      'SELECT * FROM matches WHERE id = ?',
      [id]
    );

    if (matches.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Match not found' });
    }

    const updateFields = [];
    const updateValues = [];

    if (home_score !== undefined) {
      updateFields.push('home_score = ?');
      updateValues.push(home_score);
    }
    if (away_score !== undefined) {
      updateFields.push('away_score = ?');
      updateValues.push(away_score);
    }
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    if (venue !== undefined) {
      updateFields.push('venue = ?');
      updateValues.push(venue || null);
    }
    if (referee !== undefined) {
      updateFields.push('referee = ?');
      updateValues.push(referee || null);
    }
    if (attendance !== undefined) {
      updateFields.push('attendance = ?');
      updateValues.push(attendance || null);
    }

    if (updateFields.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(id);

    await connection.query(
      `UPDATE matches SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    connection.release();

    res.json({
      id,
      message: 'Match updated successfully',
    });
  } catch (error) {
    console.error('Error updating match:', error);
    res.status(500).json({ error: 'Failed to update match' });
  }
};

// Delete match (admin only)
exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Check if match exists
    const [matches] = await connection.query(
      'SELECT * FROM matches WHERE id = ?',
      [id]
    );

    if (matches.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Match not found' });
    }

    await connection.query('DELETE FROM matches WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    console.error('Error deleting match:', error);
    res.status(500).json({ error: 'Failed to delete match' });
  }
};

// Get matches by league
exports.getMatchesByLeague = async (req, res) => {
  try {
    const { league_id } = req.params;
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `SELECT m.*, 
                        ht.name as home_team_name, ht.logo_url as home_logo,
                        at.name as away_team_name, at.logo_url as away_logo
                 FROM matches m
                 JOIN teams ht ON m.home_team_id = ht.id
                 JOIN teams at ON m.away_team_id = at.id
                 WHERE m.league_id = ?`;
    const params = [league_id];

    if (status) {
      query += ' AND m.status = ?';
      params.push(status);
    }

    query += ' ORDER BY m.match_date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const connection = await pool.getConnection();
    const [matches] = await connection.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM matches WHERE league_id = ?';
    const countParams = [league_id];

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    const [countResult] = await connection.query(countQuery, countParams);
    connection.release();

    res.json({
      matches,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
};

// Get upcoming matches
exports.getUpcomingMatches = async (req, res) => {
  try {
    const { league_id, limit = 10 } = req.query;

    let query = `SELECT m.*, 
                        ht.name as home_team_name, ht.logo_url as home_logo,
                        at.name as away_team_name, at.logo_url as away_logo
                 FROM matches m
                 JOIN teams ht ON m.home_team_id = ht.id
                 JOIN teams at ON m.away_team_id = at.id
                 WHERE m.status = 'scheduled'`;
    const params = [];

    if (league_id) {
      query += ' AND m.league_id = ?';
      params.push(league_id);
    }

    query += ' ORDER BY m.match_date ASC LIMIT ?';
    params.push(parseInt(limit));

    const connection = await pool.getConnection();
    const [matches] = await connection.query(query, params);
    connection.release();

    res.json(matches);
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming matches' });
  }
};

// Get recent matches
exports.getRecentMatches = async (req, res) => {
  try {
    const { league_id, limit = 10 } = req.query;

    let query = `SELECT m.*, 
                        ht.name as home_team_name, ht.logo_url as home_logo,
                        at.name as away_team_name, at.logo_url as away_logo
                 FROM matches m
                 JOIN teams ht ON m.home_team_id = ht.id
                 JOIN teams at ON m.away_team_id = at.id
                 WHERE m.status IN ('finished', 'live')`;
    const params = [];

    if (league_id) {
      query += ' AND m.league_id = ?';
      params.push(league_id);
    }

    query += ' ORDER BY m.match_date DESC LIMIT ?';
    params.push(parseInt(limit));

    const connection = await pool.getConnection();
    const [matches] = await connection.query(query, params);
    connection.release();

    res.json(matches);
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    res.status(500).json({ error: 'Failed to fetch recent matches' });
  }
};
