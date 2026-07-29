import React, { useState } from 'react';
import { Layers, Flame, Droplets, ShieldAlert, Sparkles, Eye, Maximize2, X } from 'lucide-react';

export default function MaskOverlayCards({ imagePreview, metrics, heatmap = [] }) {
  const [activeModalMask, setActiveModalMask] = useState(null);

  if (!imagePreview) return null;

  const acneHotspots = heatmap.filter(h => h.type === 'acne');
  const textureHotspots = heatmap.filter(h => h.type === 'texture');

  const maskTypes = [
    {
      id: 'oiliness',
      title: 'oiliness',
      subtitle: 'T-Zone Sebum & Lipid Distribution Mask',
      icon: Flame,
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      renderOverlay: () => (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 32 25 Q 50 18 68 25 Q 60 38 50 38 Q 40 38 32 25 Z" fill="rgba(245, 158, 11, 0.65)" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 46 38 L 54 38 L 53 54 L 47 54 Z" fill="rgba(245, 158, 11, 0.7)" stroke="#d97706" strokeWidth="0.8" />
          <ellipse cx="34" cy="52" rx="7" ry="11" fill="rgba(245, 158, 11, 0.65)" stroke="#d97706" strokeWidth="0.8" />
          <ellipse cx="66" cy="52" rx="7" ry="11" fill="rgba(245, 158, 11, 0.65)" stroke="#d97706" strokeWidth="0.8" />
          <ellipse cx="50" cy="72" rx="6" ry="4" fill="rgba(245, 158, 11, 0.65)" stroke="#d97706" strokeWidth="0.8" />
        </svg>
      )
    },
    {
      id: 'moisture',
      title: 'moisture',
      subtitle: 'Transepidermal Hydration & Lipid Lock Mask',
      icon: Droplets,
      color: 'text-blue-400',
      borderColor: 'hover:border-blue-500/50',
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      renderOverlay: () => (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 22 20 Q 50 10 78 20 Q 82 50 75 75 Q 50 90 25 75 Q 18 50 22 20 Z" fill="rgba(30, 58, 138, 0.45)" stroke="#3b82f6" strokeWidth="0.8" />
          <ellipse cx="50" cy="24" rx="14" ry="5" fill="rgba(234, 179, 8, 0.6)" stroke="#84cc16" strokeWidth="0.8" />
          <circle cx="34" cy="54" r="3" fill="#22c55e" />
          <circle cx="38" cy="58" r="2.5" fill="#eab308" />
          <circle cx="66" cy="54" r="3" fill="#22c55e" />
          <circle cx="62" cy="58" r="2.5" fill="#eab308" />
          <circle cx="50" cy="68" r="3" fill="#22c55e" />
        </svg>
      )
    },
    {
      id: 'acne',
      title: 'acne & spots',
      subtitle: 'Inflammatory Papule & Erythema Heatmap Mask',
      icon: ShieldAlert,
      color: 'text-rose-400',
      borderColor: 'hover:border-rose-500/50',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      renderOverlay: () => (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {acneHotspots.length > 0 ? (
            acneHotspots.map((pt, idx) => (
              <circle
                key={pt.id || idx}
                cx={pt.x}
                cy={pt.y}
                r={pt.radius ? pt.radius / 3.5 : 5}
                fill="rgba(244, 63, 94, 0.75)"
                stroke="#e11d48"
                strokeWidth="1"
                className="animate-pulse"
              />
            ))
          ) : (
            // If clear skin, render clear status indicator
            <text x="50" y="50" textAnchor="middle" fill="#10b981" fontSize="4" fontWeight="bold">Skin Clear (0 Blemishes)</text>
          )}
        </svg>
      )
    },
    {
      id: 'wrinkles',
      title: 'wrinkles',
      subtitle: 'Periorbital & Forehead Crease Depth Mask',
      icon: Sparkles,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      renderOverlay: () => (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Cyan Linear Crease Lines */}
          <path d="M 35 24 Q 50 22 65 24" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
          <path d="M 38 28 Q 50 26 62 28" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
          {/* Crow's feet lines */}
          <path d="M 26 40 L 32 43 M 24 44 L 31 45" stroke="#06b6d4" strokeWidth="1.5" />
          <path d="M 74 40 L 68 43 M 76 44 L 69 45" stroke="#06b6d4" strokeWidth="1.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <h3 className="font-display font-bold text-xl text-white">Detection Mask Overlay Previews</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official YouCam API mask overlay results for oiliness, moisture, acne, and wrinkle parameters
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-teal-300 font-medium flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>YouCam AI Mask Layering</span>
        </div>
      </div>

      {/* Mask Preview Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {maskTypes.map((mask) => {
          const MaskIcon = mask.icon;
          const score = metrics?.[mask.id]?.score || 80;

          return (
            <div
              key={mask.id}
              onClick={() => setActiveModalMask(mask)}
              className={`glass-panel rounded-2xl overflow-hidden border border-slate-800 ${mask.borderColor} transition-all cursor-pointer group flex flex-col justify-between`}
            >
              {/* Photo Viewport with Mask SVG Overlay */}
              <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                <img
                  src={imagePreview}
                  alt={`${mask.title} Mask Preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Render Parameter Specific SVG Mask */}
                {mask.renderOverlay()}

                {/* Hover Expand Icon */}
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-300 group-hover:text-white border border-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-md ${mask.badgeBg}`}>
                  Score {score}
                </div>
              </div>

              {/* Card Footer Label */}
              <div className="p-3 bg-slate-900/90 text-center border-t border-slate-800">
                <h4 className="font-bold text-xs text-white capitalize group-hover:text-teal-300 transition-colors flex items-center justify-center space-x-1">
                  <MaskIcon className={`w-3.5 h-3.5 ${mask.color}`} />
                  <span>{mask.title}</span>
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Expand Modal */}
      {activeModalMask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center space-x-2">
                <activeModalMask.icon className={`w-5 h-5 ${activeModalMask.color}`} />
                <h3 className="font-bold text-base text-white capitalize">{activeModalMask.title} Mask Preview</h3>
              </div>
              <button
                onClick={() => setActiveModalMask(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[3/4] bg-black overflow-hidden">
              <img
                src={imagePreview}
                alt={activeModalMask.title}
                className="w-full h-full object-cover"
              />
              {activeModalMask.renderOverlay()}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-300">
              {activeModalMask.subtitle}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
