// Utility functions for validation
const validateName = (name) => name && name.length >= 2;
const validateEmail = (email) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
const validatePassword = (password) => password && password.length >= 8;

module.exports = { validateName, validateEmail, validatePassword };
