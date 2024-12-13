const express = require('express');
const { signup, login } = require('../controllers/authController');
const validateSignup = require('../middlewares/validateSignup');

const router = express.Router();

// POST: /api/auth/signup
router.post('/signup', validateSignup, signup);

// POST: /api/auth/login
router.post('/login', login);

module.exports = router;
