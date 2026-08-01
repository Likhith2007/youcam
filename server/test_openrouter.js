import dotenv from 'dotenv';
dotenv.config();

const openRouterKey = process.env.OPENROUTER_API_KEY;

async function testOpenRouterModels() {
  console.log('Testing OpenRouter models...');
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models');
    const data = await res.json();
    const geminiModels = data.data.filter(m => m.id.toLowerCase().includes('gemini'));
    console.log('Available Gemini Models on OpenRouter:');
    geminiModels.forEach(m => console.log(' - ' + m.id));

    const dummyBase64Jpeg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';

    console.log(`\nTesting multimodal chat completion with model: google/gemini-2.5-flash...`);
    const chatRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Describe what you see in this image in 10 words' },
              { type: 'image_url', image_url: { url: dummyBase64Jpeg } }
            ]
          }
        ],
        max_tokens: 200
      })
    });
    console.log('Status:', chatRes.status, chatRes.statusText);
    const chatText = await chatRes.text();
    console.log('Response:', chatText);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

testOpenRouterModels();
