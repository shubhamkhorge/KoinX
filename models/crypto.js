const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    coin : String,
    price : Number,
    marketCap : Number,
    change24h : Number,
  }, {timestamps: true});

  module.exports = mongoose.model('Crypto', cryptoSchema);