const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/orders', orderRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection failed:', err));

// Start server
const PORT = 5005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
