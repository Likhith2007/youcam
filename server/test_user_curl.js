import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YOUCAM_API_KEY;
const baseUrl = 'https://yce-api-01.makeupar.com/s2s/v3.0/task/cloth';

async function testUserCurlTask() {
  console.log('--- Testing User cURL Task Initiation ---');
  const payload = {
    src_file_id: "grG9CzIS4Mv+PxAbSZ4b2lvEfz2KSZ3K/XaB/mhmRRwLbKfeLEmuXUa9yH4wuc2K",
    ref_file_id: "on/7akVaeScJa1imtIRtdOQ+w+sn6E82xeJM66v/ZC6pqupmNZ5FN4+BIkGveheo",
    garment_category: "auto"
  };

  console.log('Sending Payload:', JSON.stringify(payload));
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  console.log('Start HTTP Status:', res.status);
  const data = await res.json();
  console.log('Start Response:', JSON.stringify(data));

  const taskId = data.data?.task_id;
  if (taskId) {
    console.log(`\nPolling task_id: ${taskId}...`);
    for (let i = 1; i <= 30; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollRes = await fetch(`${baseUrl}/${taskId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const pollData = await pollRes.json();
      console.log(`[Poll #${i}] Status: ${pollData.data?.task_status}`, JSON.stringify(pollData));

      if (pollData.data?.task_status === 'success') {
        console.log('\n🎉 SUCCESS! Result Data:', JSON.stringify(pollData.data));
        break;
      } else if (pollData.data?.task_status === 'error') {
        console.log('\n❌ ERROR:', JSON.stringify(pollData.data));
        break;
      }
    }
  }
}

testUserCurlTask();
