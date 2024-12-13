// controllers/cartController.js
const Cart = require('../models/cartModel');


exports.addToCart = async (req, res) => {
  const { userId, product } = req.body;
  // Check if product and userId are present in the request
  if (!userId || !product || !product.productId) {
    return res.status(400).json({ message: 'User ID and product information are required' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for this user, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === product.productId);

    if (itemIndex > -1) {
      // If product already exists, increment quantity
      cart.items[itemIndex].quantity += 1;
    } else {
      // If it's a new product, push it to the cart
      cart.items.push({
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity,
      });
    }

    // Save the cart after modifying
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);  // Error logging
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the cart by userId
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

exports.updateItemQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the item quantity
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();

    // Return updated cart
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Error updating cart item quantity', error });
  }
};


// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const updatedItems = cart.items.filter(item => item.productId.toString() !== productId);
    cart.items = updatedItems;

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ message: 'Error removing item', error });
  }
};