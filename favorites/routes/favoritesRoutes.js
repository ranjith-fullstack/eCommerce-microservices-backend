const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoritesController');
const router = express.Router();

// Add a product to favorites
router.post('/add', addFavorite);

// Remove a product from favorites
router.delete('/:userId/:productId', removeFavorite);

// Get all favorites for a user
router.get('/:userId', getFavorites);

module.exports = router;
