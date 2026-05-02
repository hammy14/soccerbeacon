const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.get('/:id/players', teamController.getTeamPlayers);

// Admin routes
router.post('/', verifyToken, isAdmin, teamController.createTeam);
router.put('/:id', verifyToken, isAdmin, teamController.updateTeam);
router.delete('/:id', verifyToken, isAdmin, teamController.deleteTeam);

module.exports = router;
