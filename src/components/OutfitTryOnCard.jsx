import React from 'react';
import { Shirt, Sparkles, CheckCircle2, Star, Palette, Scissors, ExternalLink, RefreshCw } from 'lucide-react';
import { parseBoldText } from '../utils/textFormatter';

export default function OutfitTryOnCard({ outfitData, userImage }) {
  if (!outfitData || !outfitData.hasOutfit) return null;

  const {
    garmentName = 'Selected Garment Outfit',
    garmentImage,
    previewImage,
    fitScore = 94,
    colorHarmony = '96% Excellent Match with Warm/Olive Undertones',
    fitAnalysis = 'The structured lapel and emerald hue create ideal contrast with your skin undertones while enhancing facial contour clarity.',
    tailoringTips = [
      'V-neck cut visually lengthens neck line and accentuates cheekbone definition.',
      'Jewel-tone emerald pigment cancels out facial redness while highlighting natural skin radiance.',
      'Relaxed shoulder drape balances jawline symmetry.'
    ]
  } = outfitData;

  const displayPreview = previewImage || garmentImage || userImage;

  return (
    <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-8 mb-8 border border-purple-500/40 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-xl text-white">YouCam AI Virtual Outfit Fitting Room</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] uppercase font-bold tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                <span>AI Garment Fit Engine</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Virtual try-on drape simulation & skin tone color harmony evaluation
            </p>
          </div>
        </div>

        {/* Fit Score Pill */}
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2 text-xs">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] block text-slate-400 uppercase font-semibold">Garment Fit Score</span>
              <span className="font-extrabold text-white text-sm">{fitScore}/100 <span className="text-emerald-400 font-normal text-xs">(Flattering Fit)</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Try-On Preview & Fit Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 relative z-10">
        
        {/* Left Column: AI Virtual Try-On Image Canvas Preview */}
        <div className="flex flex-col space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl bg-slate-900 border border-purple-500/30 overflow-hidden shadow-2xl group">
            
            {/* Try-On Rendered Image */}
            <img
              src={displayPreview}
              alt="AI Virtual Fitting Room Try-On"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Live Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-500/40 text-[10px] font-bold text-purple-300 flex items-center space-x-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <span>AI Fitted Garment Preview</span>
            </div>

            {/* Garment Thumbnail Badge */}
            {garmentImage && (
              <div className="absolute bottom-3 right-3 p-1.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center space-x-2">
                <img src={garmentImage} alt="Garment" className="w-10 h-10 rounded-lg object-cover" />
                <div className="pr-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Uploaded Clothing</span>
                  <span className="text-xs font-semibold text-white truncate max-w-[100px] block">{garmentName}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Garment Fit & Color Undertone Diagnostics */}
        <div className="flex flex-col justify-between space-y-6">
          
          {/* Color Harmony Box */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center space-x-2 text-purple-400 mb-2 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-4 h-4" />
              <span>Skin Tone & Color Harmony</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">{parseBoldText(colorHarmony)}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {parseBoldText(fitAnalysis)}
            </p>
          </div>

          {/* Tailoring & Silhouette Guidance */}
          <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center space-x-2 text-purple-300 mb-3 text-xs font-bold uppercase tracking-wider">
              <Scissors className="w-4 h-4 text-purple-400" />
              <span>AI Fit & Tailoring Recommendations</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {tailoringTips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{parseBoldText(tip)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buy Matching Garment Search Link */}
          <div className="pt-2">
            <a
              href={`https://www.amazon.com/s?k=${encodeURIComponent(garmentName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Shirt className="w-4 h-4" />
              <span>Find Matching Garments Online ↗</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
