const pool = require('../config/database');

// Get standings for a league
exports.getStandings = async (req, res) => {
  try {
    const { league_id } = req.params;

    const connection = await pool.getConnection();

    // Verify league exists
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [league_id]
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
      [league_id]
    );

    connection.release();

    res.json({
      league: leagues[0],
      standings,
    });
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
};

// Calculate and update standings for a league
exports.updateStandings = async (req, res) => {
  try {
    const { league_id } = req.params;

    const connection = await pool.getConnection();

    // Verify league exists
    const [leagues] = await connection.query(
      'SELECT * FROM leagues WHERE id = ?',
      [league_id]
    );

    if (leagues.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'League not found' });
    }

    // Get all teams in league
    const [teams] = await connection.query(
      'SELECT id FROM teams WHERE league_id = ?',
      [league_id]
    );

    // For each team, calculate standings
    for (const team of teams) {
      const [matches] = await connection.query(
        `SELECT * FROM matches 
         WHERE league_id = ? 
         AND (home_team_id = ? OR away_team_id = ?)
         AND status IN ('finished', 'live')`,
        [league_id, team.id, team.id]
      );

      let played = 0;
      let won = 0;
      let drawn = 0;
      let lost = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      for (const match of matches) {
        played++;

        if (match.home_team_id === team.id) {
          goalsFor += match.home_score || 0;
          goalsAgainst += match.away_score || 0;

          if (match.home_score > match.away_score) {
            won++;
          } else if (match.home_score === match.away_score) {
            drawn++;
          } else {
            lost++;
          }
        } else {
          goalsFor += match.away_score || 0;
          goalsAgainst += match.home_score || 0;

          if (match.away_score > match.home_score) {
            won++;
          } else if (match.away_score === match.home_score) {
            drawn++;
          } else {
            lost++;
          }
        }
      }

      const points = won * 3 + drawn;
      const goalDifference = goalsFor - goalsAgainst;

      // Update or insert standings
      const [existing] = await connection.query(
        'SELECT id FROM standings WHERE league_id = ? AND team_id = ?',
        [league_id, team.id]
      );

      if (existing.length > 0) {
        await connection.query(
          `UPDATE standings 
           SET played = ?, won = ?, drawn = ?, lost = ?, 
               goals_for = ?, goals_against = ?, goal_difference = ?, points = ?
           WHERE league_id = ? AND team_id = ?`,
          [played, won, drawn, lost, goalsFor, goalsAgainst, goalDifference, points, league_id, team.id]
        );
      } else {
        await connection.query(
          `INSERT INTO standings (league_id, team_id, played, won, drawn, lost, goals_for, goals_against, goal_difference, points)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [league_id, team.id, played, won, drawn, lost, goalsFor, goalsAgainst, goalDifference, points]
        );
      }
    }

    // Update positions
    const [allStandings] = await connection.query(
      `SELECT id FROM standings 
       WHERE league_id = ? 
       ORDER BY points DESC, goal_difference DESC, goals_for DESC`,
      [league_id]
    );

    for (let i = 0; i < allStandings.length; i++) {
      await connection.query(
        'UPDATE standings SET position = ? WHERE id = ?',
        [i + 1, allStandings[i].id]
      );
    }

    connection.release();

    res.json({
      message: 'Standings updated successfully',
      league_id,
    });
  } catch (error) {
    console.error('Error updating standings:', error);
    res.status(500).json({ error: 'Failed to update standings' });
  }
};

// Get team standing
exports.getTeamStanding = async (req, res) => {
  try {
    const { league_id, team_id } = req.params;

    const connection = await pool.getConnection();

    const [standings] = await connection.query(
      `SELECT s.*, t.name as team_name, t.logo_url 
       FROM standings s
       JOIN teams t ON s.team_id = t.id
       WHERE s.league_id = ? AND s.team_id = ?`,
      [league_id, team_id]
    );

    if (standings.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Standing not found' });
    }

    connection.release();

    res.json(standings[0]);
  } catch (error) {
    console.error('Error fetching standing:', error);
    res.status(500).json({ error: 'Failed to fetch standing' });
  }
};

// Get top scorers for a league
exports.getTopScorers = async (req, res) => {
  try {
    const { league_id } = req.params;
    const { limit = 10 } = req.query;

    const connection = await pool.getConnection();

    // This is a placeholder - would need match events table for actual goals
    // For now, return empty array
    const topScorers = [];

    connection.release();

    res.json({
      league_id,
      topScorers,
      note: 'Top scorers feature requires match events table',
    });
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    res.status(500).json({ error: 'Failed to fetch top scorers' });
  }
};
