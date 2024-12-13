const { validateName, validateEmail, validatePassword } = require('../utils/validation');

const validateSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = {};

  if (!validateName(name)) {
    errors.name = 'Name must be at least 2 characters long';
  }
  if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!validatePassword(password)) {
    errors.password = 'Password must be at least 8 characters long';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = validateSignup;
