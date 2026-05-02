const express = require('express');
const router = express.Router();
const standingsController = require('../controllers/standingsController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/league/:league_id', standingsController.getStandings);
router.get('/league/:league_id/team/:team_id', standingsController.getTeamStanding);
router.get('/league/:league_id/top-scorers', standingsController.getTopScorers);

// Admin routes
router.post('/league/:league_id/update', verifyToken, isAdmin, standingsController.updateStandings);

module.exports = router;
