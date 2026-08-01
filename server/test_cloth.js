import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YOUCAM_API_KEY;
const clothUrl = 'https://yce-api-01.makeupar.com/s2s/v3.0/task/cloth';

async function testClothEndpoint() {
  console.log('Testing YouCam S2S v3.0 Cloth Task Initiation...');
  console.log('API Key:', apiKey ? apiKey.slice(0, 10) + '...' : 'Missing');

  try {
    const res = await fetch(clothUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        garment_category: 'auto'
      })
    });

    console.log('HTTP Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Response Body:', text);
    const json = JSON.parse(text);
    const taskId = json.data?.task_id;

    if (taskId) {
      console.log(`Polling status for task_id: ${taskId}...`);
      for (let i = 1; i <= 10; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const pollRes = await fetch(`${clothUrl}/${taskId}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const pollData = await pollRes.json();
        console.log(`[Poll #${i}] Status:`, pollData.data?.task_status, JSON.stringify(pollData));
        if (pollData.data?.task_status === 'success' || pollData.data?.task_status === 'error') {
          break;
        }
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testClothEndpoint();
