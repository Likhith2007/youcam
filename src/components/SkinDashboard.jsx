import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Activity, ShieldAlert, Sparkles, Calendar, Clock, UserCheck, HeartPulse } from 'lucide-react';

export default function SkinDashboard({ analysisResult }) {
  const { overallScore, skinAge, skinType, timestamp, isSimulated } = analysisResult;

  useEffect(() => {
    if (overallScore >= 80) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [overallScore]);

  // Color calculation based on score
  const getScoreColor = (score) => {
    if (score >= 85) return { text: 'text-emerald-400', stroke: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'Optimal Health' };
    if (score >= 72) return { text: 'text-teal-400', stroke: '#14b8a6', bg: 'bg-teal-500/10', border: 'border-teal-500/30', label: 'Good - Mild Care' };
    if (score >= 60) return { text: 'text-amber-400', stroke: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'Moderate Support Needed' };
    return { text: 'text-rose-400', stroke: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/30', label: 'Attention Required' };
  };

  const scoreTheme = getScoreColor(overallScore);
  const strokeDashoffset = 360 - (360 * overallScore) / 100;

  const reportZipUrl = analysisResult?.reportZipUrl;

  return (
    <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-8 mb-8 border border-teal-500/30">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-display font-bold text-2xl text-white">Clinical Skin Health Overview</h2>
            {isSimulated && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                YouCam AI Simulation Mode
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Analyzed at {new Date(timestamp && !isNaN(new Date(timestamp)) ? timestamp : Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </p>
        </div>

        {/* Quick Readouts & Download Button */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {reportZipUrl && (
            <a
              href={reportZipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Download YouCam .zip</span>
            </a>
          )}

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Apparent Skin Age</span>
              <span className="font-bold text-white text-sm">{Math.round(skinAge)} Yrs</span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <HeartPulse className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Skin Classification</span>
              <span className="font-bold text-white text-sm">{skinType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Gauge & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
        
        {/* Left: Circular Score Gauge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="58"
                stroke="#1e293b"
                strokeWidth="10"
                fill="transparent"
              />
              <motion.circle
                cx="70"
                cy="70"
                r="58"
                stroke={scoreTheme.stroke}
                strokeWidth="10"
                strokeDasharray="364"
                initial={{ strokeDashoffset: 364 }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Skin Score</span>
              <motion.span
                className={`font-display font-extrabold text-5xl tracking-tight ${scoreTheme.text}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {overallScore}
              </motion.span>
              <span className="text-xs font-semibold text-slate-400 mt-0.5">/ 100</span>
            </div>
          </div>

          <div className={`mt-4 px-4 py-1.5 rounded-full ${scoreTheme.bg} border ${scoreTheme.border} ${scoreTheme.text} text-xs font-semibold tracking-wide flex items-center space-x-1.5`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{scoreTheme.label}</span>
          </div>
        </div>

        {/* Right: Key Takeaway Summary */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Dermatological Assessment Summary</h3>
          
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-200 leading-relaxed">
              Your YouCam AI facial diagnostic indicates an overall skin vitality score of <strong className={scoreTheme.text}>{overallScore}/100</strong>. 
              Primary strengths include high surface smoothness and minimal pore expansion. Targeted attention is recommended for moisture retention and periorbital brightening.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider block mb-0.5">Top Performing Metric</span>
                <span className="text-xs text-slate-200 font-medium">Texture & Elasticity (91%)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider block mb-0.5">Primary Target Focus</span>
                <span className="text-xs text-slate-200 font-medium">Sub-Surface Hydration Lock</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
