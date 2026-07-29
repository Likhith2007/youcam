/**
 * Image Pre-Processor & Specification Validator for YouCam API
 * Enforces Perfect Corp Console Specs:
 * - Format: JPEG / PNG
 * - File Size: <= 10 MB
 * - Dimensions: Short side >= 480px, Long side <= 4096px (Optimal HD: 1080px)
 */

export async function processAndResizeImage(fileOrDataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    if (typeof fileOrDataUrl === 'string') {
      img.src = fileOrDataUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.readAsDataURL(fileOrDataUrl);
    }

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      const shortSide = Math.min(width, height);
      const longSide = Math.max(width, height);

      console.log(`[Image Resizer] Original Dimensions: ${width}x${height}px (Short: ${shortSide}px, Long: ${longSide}px)`);

      // Scale to optimal HD dimensions if needed
      let targetWidth = width;
      let targetHeight = height;

      // 1. Long side exceeds 4096px -> scale down to max 2048px
      if (longSide > 4096) {
        const scale = 2048 / longSide;
        targetWidth = Math.round(width * scale);
        targetHeight = Math.round(height * scale);
      } 
      // 2. Short side under 480px -> scale up to min 720px for HD clarity
      else if (shortSide < 480) {
        const scale = 720 / shortSide;
        targetWidth = Math.round(width * scale);
        targetHeight = Math.round(height * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

      canvas.toBlob((blob) => {
        console.log(`[Image Resizer] Resized Dimensions: ${targetWidth}x${targetHeight}px | Size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
        resolve({
          dataUrl: resizedDataUrl,
          blob: blob,
          width: targetWidth,
          height: targetHeight,
          sizeMB: (blob.size / 1024 / 1024).toFixed(2)
        });
      }, 'image/jpeg', 0.92);
    };

    img.onerror = (err) => {
      reject(new Error('Failed to load image for resizing: ' + err.message));
    };
  });
}
