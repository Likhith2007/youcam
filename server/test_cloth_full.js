import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YOUCAM_API_KEY;

async function registerFile() {
  const res = await fetch('https://yce-api-01.makeupar.com/s2s/v2.0/file/skin-analysis', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      files: [{ file_name: 'test.jpg', content_type: 'image/jpeg' }]
    })
  });
  const data = await res.json();
  return data.data?.files?.[0];
}

async function uploadToS3(uploadUrl, dummyBuffer) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpeg' },
    body: dummyBuffer
  });
  return res.ok;
}

async function testFullClothPipeline() {
  console.log('--- Registering User Body Image ---');
  const userFile = await registerFile();
  console.log('User File ID:', userFile?.file_id);

  console.log('\n--- Registering Garment Image ---');
  const garmentFile = await registerFile();
  console.log('Garment File ID:', garmentFile?.file_id);

  // 1x1 dummy JPEG buffer
  const dummyJpeg = Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=', 'base64');

  await uploadToS3(userFile.requests[0].url, dummyJpeg);
  await uploadToS3(garmentFile.requests[0].url, dummyJpeg);

  console.log('\n--- Submitting YouCam v3.0 Cloth Task ---');
  const clothRes = await fetch('https://yce-api-01.makeupar.com/s2s/v3.0/task/cloth', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      src_file_id: userFile.file_id,
      ref_file_id: garmentFile.file_id,
      garment_category: 'auto'
    })
  });
  const clothData = await clothRes.json();
  console.log('Task Submission Status:', clothRes.status, JSON.stringify(clothData));

  const taskId = clothData.data?.task_id;
  if (taskId) {
    console.log(`\nPolling task_id: ${taskId}...`);
    for (let i = 1; i <= 15; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollRes = await fetch(`https://yce-api-01.makeupar.com/s2s/v3.0/task/cloth/${taskId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const pollData = await pollRes.json();
      console.log(`[Poll #${i}] Task Status: ${pollData.data?.task_status}`, JSON.stringify(pollData));
      if (pollData.data?.task_status === 'success' || pollData.data?.task_status === 'error') {
        break;
      }
    }
  }
}

testFullClothPipeline();
