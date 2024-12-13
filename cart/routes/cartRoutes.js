const express = require('express');
const {
  addToCart,
  getCart,
  updateItemQuantity,
  removeFromCart
} = require('../controllers/cartController');
const router = express.Router();

// Add item to cart
router.post('/add', addToCart); // POST /api/cart/add

// Get a user's cart
router.get('/:userId', getCart); // GET /api/cart/:userId

// Update item quantity in the cart
router.patch('/:userId/items/:productId/quantity', updateItemQuantity); // PATCH /api/cart/:userId/items/:productId/quantity

// Remove item from the cart
router.delete('/:userId/items/:productId', removeFromCart); // DELETE /api/cart/:userId/items/:productId

module.exports = router;
