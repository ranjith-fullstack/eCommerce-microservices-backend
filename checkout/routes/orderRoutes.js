// routes/orderRoutes.js
const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/orderadd', createOrder);

module.exports = router;
