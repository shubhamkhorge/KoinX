const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

router.get('/', async (req, res, next) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
});

module.exports = router;