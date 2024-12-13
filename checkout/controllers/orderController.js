// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, city, state, zipCode, cartTotal ,userId } = req.body;

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      cartTotal,
      userId 
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};
