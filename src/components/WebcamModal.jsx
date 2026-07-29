import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export default function WebcamModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setIsInitializing(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Webcam access error:', err);
      setError('Unable to access live camera feed. Please allow camera permissions or upload a face photo directly.');
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleTakeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    // Mirror horizontally for natural webcam feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCapture(dataUrl);
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-teal-400" />
            <h3 className="font-display font-semibold text-lg text-white">Live AI Face Scan Capture</h3>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport Area */}
        <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
          {isInitializing && (
            <div className="flex flex-col items-center space-y-3 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-teal-400" />
              <p className="text-sm">Initializing high-resolution camera feed...</p>
            </div>
          )}

          {error ? (
            <div className="p-6 text-center max-w-md">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <p className="text-sm text-slate-300 mb-4">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-semibold rounded-xl border border-slate-700"
              >
                Retry Camera Access
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />

              {/* Oval Face Alignment Overlay Guide */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <svg className="w-full h-full max-h-[85%]" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer dim background mask */}
                  <defs>
                    <mask id="face-oval-mask">
                      <rect width="400" height="500" fill="white" />
                      <ellipse cx="200" cy="230" rx="110" ry="155" fill="black" />
                    </mask>
                  </defs>
                  <rect width="400" height="500" fill="rgba(9, 13, 22, 0.45)" mask="url(#face-oval-mask)" />
                  
                  {/* Glowing Alignment Oval Line */}
                  <ellipse
                    cx="200"
                    cy="230"
                    rx="110"
                    ry="155"
                    stroke="#14b8a6"
                    strokeWidth="3"
                    strokeDasharray="10 6"
                    className="animate-pulse"
                  />

                  {/* Corner Crosshairs */}
                  <path d="M 180 75 L 200 75 L 220 75" stroke="#2dd4bf" strokeWidth="2" />
                  <path d="M 180 385 L 200 385 L 220 385" stroke="#2dd4bf" strokeWidth="2" />
                  <path d="M 90 230 L 90 250" stroke="#2dd4bf" strokeWidth="2" />
                  <path d="M 310 230 L 310 250" stroke="#2dd4bf" strokeWidth="2" />
                </svg>

                {/* Subtitle guidance */}
                <div className="absolute bottom-6 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-teal-500/30 text-xs font-medium text-teal-300 flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Center your face within the oval guide for optimal AI skin accuracy</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Controls Footer */}
        <div className="p-6 bg-slate-900 flex items-center justify-between border-t border-slate-800">
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!stream || error}
            onClick={handleTakeSnapshot}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 disabled:opacity-50 transition-all transform active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span>Capture Face Photo</span>
          </button>
        </div>

      </div>
    </div>
  );
}
