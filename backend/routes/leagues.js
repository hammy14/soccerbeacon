const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', leagueController.getAllLeagues);
router.get('/:id', leagueController.getLeagueById);
router.get('/:id/teams', leagueController.getLeagueTeams);
router.get('/:id/standings', leagueController.getLeagueStandings);

// Admin routes
router.post('/', verifyToken, isAdmin, leagueController.createLeague);
router.put('/:id', verifyToken, isAdmin, leagueController.updateLeague);
router.delete('/:id', verifyToken, isAdmin, leagueController.deleteLeague);

module.exports = router;
