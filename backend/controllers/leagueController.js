const pool = require('../config/database');

// Get all leagues
exports.getAllLeagues = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [leagues] = await connection.query(
      'SELECT * FROM leagues ORDER BY name ASC'
    );
    connection.release();

    res.json(leagues);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
};

// Get league by ID with teams and standings
exports.getLeagueById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Get league
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'League not found' });
    }

    const league = leagues[0];

    // Get teams in league
    const [teams] = await connection.query(
      'SELECT * FROM teams WHERE league_id = ? ORDER BY name ASC',
      [id]
    );

    // Get standings
    const [standings] = await connection.query(
      `SELECT s.*, t.name as team_name, t.logo_url 
       FROM standings s
       JOIN teams t ON s.team_id = t.id
       WHERE s.league_id = ?
       ORDER BY s.position ASC`,
      [id]
    );

    connection.release();

    res.json({
      league,
      teams,
      standings,
    });
  } catch (error) {
    console.error('Error fetching league:', error);
    res.status(500).json({ error: 'Failed to fetch league' });
  }
};

// Create league (admin only)
exports.createLeague = async (req, res) => {
  try {
    const { name, country, description, founded_year, logo_url } = req.body;

    if (!name || !country) {
      return res.status(400).json({ error: 'Name and country are required' });
    }

    const connection = await pool.getConnection();

    // Check if league already exists
    const [existing] = await connection.query(
      'SELECT id FROM leagues WHERE name = ?',
      [name]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'League already exists' });
    }

    const [result] = await connection.query(
      `INSERT INTO leagues (name, country, description, founded_year, logo_url)
       VALUES (?, ?, ?, ?, ?)`,
      [name, country, description || null, founded_year || null, logo_url || null]
    );

    connection.release();

    res.status(201).json({
      id: result.insertId,
      name,
      country,
      message: 'League created successfully',
    });
  } catch (error) {
    console.error('Error creating league:', error);
    res.status(500).json({ error: 'Failed to create league' });
  }
};

// Update league (admin only)
exports.updateLeague = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, description, founded_year, logo_url } = req.body;

    const connection = await pool.getConnection();

    // Check if league exists
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'League not found' });
    }

    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (country) {
      updateFields.push('country = ?');
      updateValues.push(country);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description || null);
    }
    if (founded_year !== undefined) {
      updateFields.push('founded_year = ?');
      updateValues.push(founded_year || null);
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
      `UPDATE leagues SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    connection.release();

    res.json({
      id,
      message: 'League updated successfully',
    });
  } catch (error) {
    console.error('Error updating league:', error);
    res.status(500).json({ error: 'Failed to update league' });
  }
};

// Delete league (admin only)
exports.deleteLeague = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Check if league exists
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'League not found' });
    }

    await connection.query('DELETE FROM leagues WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'League deleted successfully' });
  } catch (error) {
    console.error('Error deleting league:', error);
    res.status(500).json({ error: 'Failed to delete league' });
  }
};

// Get league standings
exports.getLeagueStandings = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Verify league exists
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'League not found' });
    }

    // Get standings
    const [standings] = await connection.query(
      `SELECT s.*, t.name as team_name, t.logo_url 
       FROM standings s
       JOIN teams t ON s.team_id = t.id
       WHERE s.league_id = ?
       ORDER BY s.position ASC`,
      [id]
    );

    connection.release();

    res.json(standings);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
};

// Get league teams
exports.getLeagueTeams = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Verify league exists
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'League not found' });
    }

    // Get teams in league
    const [teams] = await connection.query(
      'SELECT * FROM teams WHERE league_id = ? ORDER BY name ASC',
      [id]
    );

    connection.release();

    res.json(teams);
  } catch (error) {
    console.error('Error fetching league teams:', error);
    res.status(500).json({ error: 'Failed to fetch league teams' });
  }
};
