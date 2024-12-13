const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const hashPassword = require('../utils/hashPassword');
const dotenv = require('dotenv');
dotenv.config();

    const signup = async (req, res) => {
      const { name, email, password } = req.body;
    
      try {
        // Validate the input
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already registered' });
        }
    
        // Hash the password
        const hashedPassword = await hashPassword(password);
    
        // Create a new user
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Server error' });
      }
    };

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };
