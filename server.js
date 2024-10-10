const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Use routes
app.use('/stats', statsRoute);
app.use('/deviation', deviationRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Import and start background job
const fetchCryptoData = require('./jobs/fetchCryptoData');
cron.schedule('0 */2 * * *', fetchCryptoData);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});