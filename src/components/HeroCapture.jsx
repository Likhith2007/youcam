import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Shield, Activity, Zap, CheckCircle2, ArrowRight, ShieldAlert, Droplets, Sun, Shirt } from 'lucide-react';
import { SAMPLE_PORTRAITS } from '../data/samplePortraits';

export default function HeroCapture({ onOpenCamera, onSelectFile, onSelectPreset, onSelectOutfit, selectedOutfitName }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState('auto');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0], selectedConcern);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onSelectFile(e.target.files[0], selectedConcern);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      
      {/* Hero Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>YouCam AI Skin Engine 2.0</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Clinical-Grade Skin AI <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
            Analysis in Seconds
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Experience dermatological-grade AI skin evaluation. Capture or upload a portrait photo to instantly analyze texture, wrinkles, moisture barrier, dark circles, and acne severity.
        </p>

        {/* Diagnostic Focus Selector Pill */}
        <div className="pt-2">
          <span className="text-xs text-slate-400 block mb-2 font-medium">Select Primary Analysis Focus:</span>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedConcern('auto')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedConcern === 'auto' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto-Detect AI
            </button>
            <button
              onClick={() => setSelectedConcern('acne')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                selectedConcern === 'acne' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Breakout / Active Pimples</span>
            </button>
            <button
              onClick={() => setSelectedConcern('dehydrated')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                selectedConcern === 'dehydrated' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Dehydrated & Dryness</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual Capture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
        
        {/* Card 1: WebRTC Live Camera */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:border-teal-500/40 transition-all group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Camera className="w-7 h-7 text-teal-400" />
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Take Live Photo
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Launch live WebRTC camera with an oval face alignment guide for optimal lighting and positioning.
            </p>
          </div>

          <button
            onClick={() => onOpenCamera(selectedConcern)}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98]"
          >
            <Camera className="w-4 h-4" />
            <span>Open Camera Feed</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: File Drag & Drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`glass-panel rounded-3xl p-8 flex flex-col justify-between transition-all border-dashed ${
            isDragOver ? 'border-teal-400 bg-teal-950/20' : 'border-slate-700/80 hover:border-slate-600'
          }`}
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-6">
              <Upload className="w-7 h-7 text-cyan-400" />
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Upload Photo File
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Drag and drop any front-facing portrait photo (JPG, PNG, WebP) or click to browse files.
            </p>
          </div>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center space-x-2 transition-all">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Browse Image Files</span>
            </div>
          </label>
        </div>

      </div>

      {/* AI Outfit & Clothing Fitting Room Selector (Optional) */}
      <div className="max-w-4xl mx-auto mb-10 p-5 rounded-3xl glass-panel border border-purple-500/30 bg-purple-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-sm text-white">YouCam AI Virtual Outfit Fitting Room (Optional)</h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  New AI Feature
                </span>
              </div>
              <p className="text-xs text-slate-400">Upload a clothing item to see an AI-generated Virtual Try-On & skin tone fit analysis</p>
            </div>
          </div>

          <label className="cursor-pointer shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    if (onSelectOutfit) onSelectOutfit(ev.target.result, 'Uploaded Custom Garment');
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <div className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center space-x-1.5 transition-all shadow-md shadow-purple-500/20">
              <Upload className="w-3.5 h-3.5" />
              <span>{selectedOutfitName ? 'Change Garment Photo' : 'Upload Garment Photo'}</span>
            </div>
          </label>
        </div>

        {/* Active Selected Garment Confirmation Banner */}
        {selectedOutfitName && (
          <div className="mt-3 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />
              <span>Garment Active: <span className="text-white font-extrabold">{selectedOutfitName}</span></span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSelectPreset && onSelectPreset(SAMPLE_PORTRAITS[0])}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/20 flex items-center space-x-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run AI Try-On & Fit Scan ⚡</span>
              </button>

              <button
                onClick={() => onSelectOutfit && onSelectOutfit(null, '')}
                className="px-2.5 py-2 text-[11px] font-semibold text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Sample Outfits */}
        <div className="pt-3">
          <span className="text-[11px] text-slate-400 block mb-2 font-medium">Or select a sample garment to try on:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => onSelectOutfit && onSelectOutfit('https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80', 'Emerald Silk Evening Blazer')}
              className={`p-2.5 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                selectedOutfitName === 'Emerald Silk Evening Blazer'
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80" alt="Blazer" className="w-10 h-10 rounded-xl object-cover" />
              <div className="min-w-0">
                <h5 className="font-bold text-xs truncate text-white">Emerald Silk Blazer</h5>
                <span className="text-[10px] text-purple-300">Structured Fit</span>
              </div>
            </div>

            <div
              onClick={() => onSelectOutfit && onSelectOutfit('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80', 'Classic Minimalist Linen Shirt')}
              className={`p-2.5 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                selectedOutfitName === 'Classic Minimalist Linen Shirt'
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80" alt="Shirt" className="w-10 h-10 rounded-xl object-cover" />
              <div className="min-w-0">
                <h5 className="font-bold text-xs truncate text-white">Minimalist Linen Shirt</h5>
                <span className="text-[10px] text-purple-300">Casual Relaxed</span>
              </div>
            </div>

            <div
              onClick={() => onSelectOutfit && onSelectOutfit('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80', 'Rose Velvet Evening Dress')}
              className={`p-2.5 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                selectedOutfitName === 'Rose Velvet Evening Dress'
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
              }`}
            >
              <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80" alt="Dress" className="w-10 h-10 rounded-xl object-cover" />
              <div className="min-w-0">
                <h5 className="font-bold text-xs truncate text-white">Rose Velvet Gown</h5>
                <span className="text-[10px] text-purple-300">Formal Couture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Demo Portraits (1-Click Evaluation for Hackathon Judges) */}
      <div className="max-w-5xl mx-auto pt-2">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Or test instantly with preset sample profiles
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SAMPLE_PORTRAITS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectPreset(sample)}
              className="glass-card rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all flex items-center space-x-4 border border-slate-800 hover:border-teal-500/40 group"
            >
              <img
                src={sample.imageUrl}
                alt={sample.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-700 group-hover:border-teal-400 transition-colors"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-white truncate">{sample.name}</h4>
                <p className="text-[11px] text-slate-400 truncate">{sample.tagline}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    Score {sample.metricsSummary.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
