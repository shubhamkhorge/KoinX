const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function testEndpoint(endpoint, params = {}) {
  try {
    const response = await axios.get(`${baseURL}${endpoint}`, { params });
    console.log(`${endpoint} Test Successful:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${endpoint} Test Failed:`, error.response?.data || error.message);
    throw error;
  }
}

async function runTests() {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    
    for (const coin of coins) {
      await testEndpoint('/stats', { coin });
      await testEndpoint('/deviation', { coin });
    }
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test suite failed:', error.message);
  }
}

runTests();