const axios = require('axios');
const Crypto = require('../models/crypto');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchCryptoData() {
  try {
    for (const coin of coins) {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
      const { id, market_data } = response.data;

      await Crypto.create({
        coin: id,
        price: market_data.current_price.usd,
        marketCap: market_data.market_cap.usd,
        change24h: market_data.price_change_percentage_24h,
      });

      console.log(`Data fetched and stored for ${id}`);
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
}

// Run the function once when the server starts
fetchCryptoData();

// Export the function for use with a scheduler if needed
module.exports = fetchCryptoData;