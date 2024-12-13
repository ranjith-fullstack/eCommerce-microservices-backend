const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const favoritesRoutes = require('./routes/favoritesRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/favorites', favoritesRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection failed:', err));

// Start server
const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
