import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.YOUCAM_API_KEY || 'sk-ZT3RNhORt9fva9Tsa5QcTTCD6c-s4yLQXn_WrgRlGjKdbVL40gHhvZARMRSBOmvc';
const fileEndpoint = 'https://yce-api-01.makeupar.com/s2s/v2.0/file/skin-analysis';
const taskEndpoint = 'https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-analysis';

// Create a small dummy 1x1 JPEG buffer for testing API connection
const dummyJpeg = Buffer.from(
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
  'base64'
);

async function testFullYouCamFlow() {
  console.log('--- TESTING YOUCAM S2S V2.0 FULL FLOW ---');
  console.log('API Key:', apiKey.slice(0, 12) + '...');

  try {
    // Step 1: Request pre-signed URL & file_id
    console.log('\n1. Registering file...');
    const fileRes = await fetch(fileEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: [{
          content_type: 'image/jpeg',
          file_name: 'portrait.jpg',
          file_size: dummyJpeg.length
        }]
      })
    });

    const fileData = await fileRes.json();
    console.log('Step 1 Response:', JSON.stringify(fileData, null, 2));

    const fileObj = fileData.data?.files?.[0];
    const fileId = fileObj?.file_id;
    const putUrl = fileObj?.requests?.[0]?.url;

    if (!fileId || !putUrl) {
      console.error('Failed to get file_id or putUrl!');
      return;
    }

    // Step 2: Upload image to S3
    console.log('\n2. Uploading image to S3...');
    const s3Res = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': String(dummyJpeg.length)
      },
      body: dummyJpeg
    });

    console.log(`S3 PUT Status: ${s3Res.status} ${s3Res.statusText}`);

    // Step 3: Initiate Task
    console.log('\n3. Initiating task...');
    const taskPayload = {
      src_file_id: fileId,
      dst_actions: ["wrinkle", "pore", "texture", "acne", "moisture", "oiliness", "redness"]
    };

    console.log('Sending task payload:', JSON.stringify(taskPayload, null, 2));
    const taskRes = await fetch(taskEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskPayload)
    });

    console.log(`Task Initiation Status: ${taskRes.status} ${taskRes.statusText}`);
    const taskResText = await taskRes.text();
    console.log('Task Initiation Body:', taskResText);

    try {
      const taskJson = JSON.parse(taskResText);
      const taskId = taskJson.data?.task_id || taskJson.task_id || taskJson.id;
      if (taskId) {
        console.log(`\nFound taskId: ${taskId}. Polling task status...`);
        await pollTask(taskId);
      }
    } catch (e) {
      console.error('Failed to parse task response:', e);
    }

  } catch (err) {
    console.error('Error in test flow:', err);
  }
}

async function pollTask(taskId) {
  const pollUrl = `${taskEndpoint}/${taskId}`;
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 1500));
    console.log(`Polling attempt ${i + 1}...`);
    const pollRes = await fetch(pollUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey
      }
    });
    const pollText = await pollRes.text();
    console.log(`Poll Response (${pollRes.status}):`, pollText);
    if (pollText.includes('"success"') || pollText.includes('"complete"') || pollText.includes('"failed"')) {
      break;
    }
  }
}

testFullYouCamFlow();
