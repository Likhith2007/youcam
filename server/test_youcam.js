import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YOUCAM_API_KEY || 'sk-ZT3RNhORt9fva9Tsa5QcTTCD6c-s4yLQXn_WrgRlGjKdbVL40gHhvZARMRSBOmvc';

const endpoints = [
  'https://openapi.perfectcorp.com/v1.0/skin/analysis',
  'https://api.perfectcorp.com/v1.0/skin/analysis',
  'https://youcam-api.perfectcorp.com/v1/skin/analyze',
  'https://s2s.perfectcorp.com/v1.0/skin/analysis',
  'https://api.perfectcorp.com/s2s/v1.0/skin/analysis'
];

async function testEndpoints() {
  console.log('Testing YouCam API Key:', apiKey.substring(0, 15) + '...');
  for (const url of endpoints) {
    try {
      console.log(`\nTesting ${url}...`);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_raw: '' })
      });
      console.log(`Status: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log(`Response: ${text.slice(0, 200)}`);
    } catch (e) {
      console.log(`Error connecting to ${url}:`, e.message);
    }
  }
}

testEndpoints();
