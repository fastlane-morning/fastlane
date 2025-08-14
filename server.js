const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Real Fast Lane API integration with enhanced headers and error handling
const getCurrentPrice = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch('https://fastlane.co.il/PageMethodsService.asmx/GetCurrentPrice', {
      method: 'POST',
      headers: {
        'Host': 'fastlane.co.il',
        'Content-Length': '2',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://fastlane.co.il/',
        'Origin': 'https://fastlane.co.il',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'he-IL,he;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({}),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Fast Lane API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the nested JSON structure: {"d": "{\"Price\":\"8\", ...}"}
    const innerData = JSON.parse(data.d);
    
    // Convert .NET date format /Date(1755166557603)/ to ISO string
    const dateMatch = innerData.PriceDateTime.match(/\/Date\((\d+)\)\//);
    let timestamp = new Date().toISOString();
    if (dateMatch) {
      timestamp = new Date(parseInt(dateMatch[1])).toISOString();
    }
    
    return {
      price: parseFloat(innerData.Price),
      currency: 'ILS',
      timestamp: timestamp,
      route: 'Highway 6 - Fast Lane',
      dateStr: innerData.PriceDateStr,
      timeStr: innerData.PriceTimeStr
    };
  } catch (error) {
    console.error('Error calling Fast Lane API:', error);
    
    // Fallback: Return mock data with error indication for development/testing
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Using fallback mock data due to API connection issues');
      return {
        price: 8.0,
        currency: 'ILS',
        timestamp: new Date().toISOString(),
        route: 'Highway 6 - Fast Lane (Mock Data)',
        dateStr: new Date().toLocaleDateString('he-IL'),
        timeStr: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    throw error;
  }
};

// Main endpoint for Siri to fetch price
app.get('/api/price', async (req, res) => {
  try {
    const priceData = await getCurrentPrice();
    
    // Format response optimized for Siri speech
    const response = {
      price: priceData.price,
      currency: priceData.currency,
      speech_text: `The current Fast Lane toll price is ${priceData.price} Israeli Shekels`,
      timestamp: priceData.timestamp,
      route: priceData.route
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({
      error: 'Unable to fetch current price',
      speech_text: 'Sorry, I could not get the current Fast Lane toll price'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint with basic info
app.get('/', (req, res) => {
  res.json({
    service: 'Fast Lane Price Reader',
    description: 'Siri-accessible API for Israel Fast Lane toll prices',
    endpoints: {
      price: '/api/price',
      health: '/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Fast Lane Price Reader API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Price endpoint: http://localhost:${PORT}/api/price`);
});

module.exports = app;