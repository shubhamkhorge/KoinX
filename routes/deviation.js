const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

function calculateStandardDeviation(values) {
  const n = values.length;
  if (n === 0) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / n;
  const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
  const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / n;
  return Math.sqrt(variance);
}

router.get('/', async (req, res, next) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const lastHundredRecords = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);

    if (lastHundredRecords.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    const prices = lastHundredRecords.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    console.error('Deviation calculation error:', error);
    next(error); // Pass errors to the error handling middleware
  }
});

module.exports = router;