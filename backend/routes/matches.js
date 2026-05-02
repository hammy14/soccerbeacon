const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', matchController.getAllMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/recent', matchController.getRecentMatches);
router.get('/league/:league_id', matchController.getMatchesByLeague);
router.get('/:id', matchController.getMatchById);

// Admin routes
router.post('/', verifyToken, isAdmin, matchController.createMatch);
router.put('/:id', verifyToken, isAdmin, matchController.updateMatch);
router.delete('/:id', verifyToken, isAdmin, matchController.deleteMatch);

module.exports = router;
