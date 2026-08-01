import dotenv from 'dotenv';
import zlib from 'zlib';

dotenv.config();

// Test URL provided by user
const zipUrl = 'https://yce-us.s3-accelerate.amazonaws.com/ttl30/343046255364016210/115963760948/v2/aeMNNB0KmUIP8rnQ996tC5Q/d377c992-d273-4e36-a6f7-f8e2c463c45c.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260801T040923Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIARB77EV5Y5D7DAE3S%2F20260801%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=2e1d98f972b398a2ebde1118d3075e8820e783b668a977a2a5726908901d895b';

async function testZipDownload() {
  console.log('Downloading zip from YouCam S3...');
  try {
    const res = await fetch(zipUrl);
    console.log('Status:', res.status, res.statusText);
    if (!res.ok) {
      console.log('Expired or error response');
      return;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('Downloaded Zip Size:', buffer.length, 'bytes');

    // Parse ZIP headers (PK\x03\x04)
    let offset = 0;
    const files = [];
    while (offset < buffer.length - 4) {
      if (buffer.readUInt32LE(offset) === 0x04034b50) { // Local file header
        const filenameLen = buffer.readUInt16LE(offset + 26);
        const extraLen = buffer.readUInt16LE(offset + 28);
        const compSize = buffer.readUInt32LE(offset + 18);
        const uncompSize = buffer.readUInt32LE(offset + 22);
        const compMethod = buffer.readUInt16LE(offset + 8);
        const filename = buffer.toString('utf8', offset + 30, offset + 30 + filenameLen);
        
        console.log(`Found file in zip: "${filename}", compSize: ${compSize}, uncompSize: ${uncompSize}, compMethod: ${compMethod}`);
        
        const dataOffset = offset + 30 + filenameLen + extraLen;
        let fileBuffer = null;
        if (compSize > 0) {
          const compData = buffer.slice(dataOffset, dataOffset + compSize);
          if (compMethod === 0) { // Stored (no compression)
            fileBuffer = compData;
          } else if (compMethod === 8) { // Deflate
            try {
              fileBuffer = zlib.inflateRawSync(compData);
            } catch (e) {
              console.log('Decompress error:', e.message);
            }
          }
        }
        
        if (fileBuffer) {
          files.push({ filename, size: fileBuffer.length, fileBuffer });
          if (filename.includes('score_info.json')) {
            console.log('\n--- REAL YOUCAM SCORE_INFO.JSON ---');
            console.log(fileBuffer.toString('utf8'));
          }
        }
        offset = dataOffset + compSize;
      } else {
        offset++;
      }
    }

    console.log(`\nSuccessfully extracted ${files.length} files from YouCam ZIP:`);
    files.forEach(f => {
      console.log(` - ${f.filename} (${f.size} bytes)`);
    });

  } catch (err) {
    console.error('Error downloading zip:', err);
  }
}

testZipDownload();
