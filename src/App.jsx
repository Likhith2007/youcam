import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCapture from './components/HeroCapture';
import WebcamModal from './components/WebcamModal';
import ScanningAnimation from './components/ScanningAnimation';
import SkinDashboard from './components/SkinDashboard';
import DiagnosticCards from './components/DiagnosticCards';
import BlemishHeatmap from './components/BlemishHeatmap';
import RoutineEngine from './components/RoutineEngine';
import ProductMatch from './components/ProductMatch';
import ReportExport from './components/ReportExport';
import ImageQualityCard from './components/ImageQualityCard';
import MaskOverlayCards from './components/MaskOverlayCards';
import { Sparkles, ArrowLeft, ShieldAlert } from 'lucide-react';
import { analyzeImagePixelsRealtime } from './utils/imageAnalyzer';
import { processAndResizeImage } from './utils/imageResizer';

export default function App() {
  const [appState, setAppState] = useState('idle'); // 'idle' | 'scanning' | 'results'
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiStatus, setApiStatus] = useState({ hasApiKey: false, mode: 'Simulation Mode' });
  const [analysisResult, setAnalysisResult] = useState(null);

  // Check API Status on load
  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setApiStatus(data))
      .catch(err => {
        console.warn('API status check warning (running local simulation):', err);
      });
  }, []);

  // Handle Photo Capture from Live Webcam
  const handleWebcamCapture = async (dataUrl) => {
    try {
      const resized = await processAndResizeImage(dataUrl);
      setSelectedImage(resized.dataUrl);
      runAnalysis(resized.dataUrl, null, resized.blob);
    } catch (err) {
      setSelectedImage(dataUrl);
      runAnalysis(dataUrl);
    }
  };

  // Handle File Upload from Dropzone / Input
  const handleFileSelect = async (file, concernType = 'auto') => {
    try {
      const resized = await processAndResizeImage(file);
      setSelectedImage(resized.dataUrl);
      runAnalysis(resized.dataUrl, concernType, resized.blob);
    } catch (err) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setSelectedImage(dataUrl);
        runAnalysis(dataUrl, concernType, file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Preset Sample Selection
  const handlePresetSelect = (preset) => {
    setSelectedImage(preset.imageUrl);
    runAnalysis(preset.imageUrl, preset.id);
  };

  // Trigger Skin AI Analysis Workflow
  const runAnalysis = async (imageUrl, presetType = null, rawFile = null) => {
    setAppState('scanning');

    try {
      // 1. Run real-time HTML5 Canvas pixel scanning on the actual uploaded photo
      const realtimePixelResult = await analyzeImagePixelsRealtime(imageUrl);

      let response;
      if (rawFile) {
        const formData = new FormData();
        formData.append('image', rawFile);
        if (presetType) formData.append('presetType', presetType);

        response = await fetch('/api/analyze-skin', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/analyze-skin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: imageUrl,
            presetType: presetType,
          }),
        });
      }

      const data = await response.json();

      // If backend returns simulated data or if real-time pixel analysis detected specific features, use the real pixel analysis!
      if (realtimePixelResult && (!data || data.isSimulated || data.overallScore > 75 && realtimePixelResult.overallScore < 70)) {
        setAnalysisResult(realtimePixelResult);
      } else {
        setAnalysisResult(data);
      }
      
      // Allow scanning animation to complete cleanly
      setTimeout(() => {
        setAppState('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2200);

    } catch (err) {
      console.error('Analysis error, using real-time canvas pixel analysis:', err);
      const realtimePixelResult = await analyzeImagePixelsRealtime(imageUrl);
      setAnalysisResult(realtimePixelResult);
      setTimeout(() => {
        setAppState('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };

  const handleReset = () => {
    setAppState('idle');
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Top Header */}
      <Header onReset={handleReset} apiStatus={apiStatus} />

      {/* Main Content Area */}
      <main className="flex-1">
        {appState === 'idle' && (
          <HeroCapture
            onOpenCamera={() => setIsWebcamOpen(true)}
            onSelectFile={handleFileSelect}
            onSelectPreset={handlePresetSelect}
          />
        )}

        {appState === 'scanning' && (
          <div className="py-12">
            <ScanningAnimation imagePreview={selectedImage} />
          </div>
        )}

        {appState === 'results' && analysisResult && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* If NO HUMAN FACE IS DETECTED (e.g. Rasna ad poster / object uploaded) */}
            {analysisResult.isFaceDetected === false ? (
              <div className="max-w-xl mx-auto glass-panel rounded-3xl p-8 border border-rose-500/40 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
                  <ShieldAlert className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl text-white">No Human Face Detected</h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    SkinPulse AI requires a clear front-facing portrait photo of a human face. 
                    Advertisements, drink packages, posters, and non-facial objects cannot be analyzed for dermatological skin metrics.
                  </p>
                </div>

                <div className="pt-2 flex justify-center space-x-3">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl font-semibold text-xs bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20"
                  >
                    Upload a Face Photo
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Top Toolbar */}
                <div className="flex items-center justify-between mb-6 no-print">
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-teal-400" />
                    <span>Analyze Another Photo</span>
                  </button>

                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Clinical Diagnostic Complete</span>
                  </div>
                </div>

                {/* Printable Report Wrapper */}
                <div id="skin-pulse-report" className="space-y-8">
                  {/* Image Quality & Exposure Log Card */}
                  <ImageQualityCard qualityCheck={analysisResult.qualityCheck} />

                  {/* 1. Overall Score & Skin Overview */}
                  <SkinDashboard analysisResult={analysisResult} />

                  {/* 2. Visual Heatmap Overlay */}
                  <BlemishHeatmap
                    imagePreview={selectedImage}
                    heatmapPoints={analysisResult.heatmap}
                  />

                  {/* 3. Parameter Mask Preview Cards Gallery (Matching YouCam Console) */}
                  <MaskOverlayCards
                    imagePreview={selectedImage}
                    metrics={analysisResult.metrics}
                    heatmap={analysisResult.heatmap}
                  />

                  {/* 3. Core Parameter Breakdown Cards */}
                  <DiagnosticCards metrics={analysisResult.metrics} />

                  {/* 4. Skincare Routine Engine */}
                  <RoutineEngine routine={analysisResult.routine} />

                  {/* 5. Product & Ingredient Match */}
                  <ProductMatch ingredients={analysisResult.recommendedIngredients} />
                </div>

                {/* 6. Export PDF Component */}
                <ReportExport analysisResult={analysisResult} />
              </>
            )}

          </div>
        )}
      </main>

      {/* Live WebRTC Camera Modal */}
      <WebcamModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCapture={handleWebcamCapture}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
          <p>
            SkinPulse &copy; 2026 — Built for the <strong className="text-teal-400 font-semibold">YouCam API Skin AI Hackathon</strong>
          </p>
          <p className="text-[11px] text-slate-600">
            Powered by YouCam AI REST API Engine & Express Proxy. Diagnostic scores are generated for cosmetic guidance and personal skin wellness.
          </p>
        </div>
      </footer>

    </div>
  );
}
