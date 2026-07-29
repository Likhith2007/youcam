import React from 'react';
import { Sun, Camera, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

export default function ImageQualityCard({ qualityCheck }) {
  if (!qualityCheck) return null;

  const { status = 'optimal', lighting = 'Optimal', sharpness = 'Sharp', skinCoverage = '45%', recommendation = 'Lighting and face position are optimal for AI analysis.' } = qualityCheck;

  const isOptimal = status === 'optimal';
  const isWarning = status === 'warning';

  return (
    <div className={`glass-panel rounded-2xl p-5 mb-8 border transition-all ${
      isOptimal ? 'border-teal-500/30 bg-teal-950/10' : 'border-amber-500/40 bg-amber-950/10'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Title & Quality Badge */}
        <div className="flex items-start space-x-3">
          <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
            isOptimal ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}>
            {isOptimal ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-sm text-white">AI Image Quality & Exposure Log</h4>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                isOptimal ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
              }`}>
                {isOptimal ? 'Optimal Scan Quality' : 'Quality Guidance'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{recommendation}</p>
          </div>
        </div>

        {/* Diagnostic Metrics Pills */}
        <div className="flex items-center space-x-3 text-xs flex-wrap gap-y-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Lighting:</span>
            <span className="font-bold text-white">{lighting}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Clarity:</span>
            <span className="font-bold text-white">{sharpness}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
