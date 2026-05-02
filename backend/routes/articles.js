const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Public routes
router.get('/', articleController.getAllArticles);
router.get('/search', articleController.searchArticles);
router.get('/league/:league_id', articleController.getArticlesByLeague);
router.get('/:slug', articleController.getArticleBySlug);

// Admin routes (will add auth middleware in Phase 2)
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
