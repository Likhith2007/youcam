import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, Activity, ShieldCheck } from 'lucide-react';

const SCAN_STAGES = [
  { id: 1, text: 'Acquiring facial mesh landmarks & contour geometry...', icon: Cpu },
  { id: 2, text: 'Analyzing epidermal micro-texture & surface smoothness...', icon: Activity },
  { id: 3, text: 'Scanning infraorbital dark circles & hyperpigmentation...', icon: Sparkles },
  { id: 4, text: 'Evaluating transepidermal moisture lock & wrinkle depth...', icon: ShieldCheck },
  { id: 5, text: 'Synthesizing clinical skin health diagnostics report...', icon: Cpu },
];

export default function ScanningAnimation({ imagePreview }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < SCAN_STAGES.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const currentStage = SCAN_STAGES[stageIndex];
  const StageIcon = currentStage.icon;

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6">
      
      {/* Photo Frame Container with Laser Scanner */}
      <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-3xl overflow-hidden border-2 border-teal-500/50 shadow-2xl shadow-teal-500/20 bg-slate-900">
        
        {/* User Image */}
        <img
          src={imagePreview}
          alt="Face Scanning Preview"
          className="w-full h-full object-cover filter contrast-105 saturate-105 brightness-95"
        />

        {/* Tactical Mesh Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#14b8a6 1px, transparent 1px), linear-gradient(to right, rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 24px 24px, 24px 24px'
          }}
        />

        {/* Animated Scanning Laser Beam */}
        <motion.div
          className="laser-line"
          initial={{ top: '0%' }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Tactical Corner Targets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-teal-400"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-teal-400"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-teal-400"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-teal-400"></div>

        {/* Floating Scan Pulse Tag */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 border border-teal-500/40 backdrop-blur-md flex items-center space-x-2 text-xs text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
          <span className="font-mono font-bold tracking-wider">YOUCAM AI SCANNING</span>
        </div>
      </div>

      {/* Progress Telemetry Text */}
      <div className="mt-8 w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-xl text-center">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
            initial={{ width: '10%' }}
            animate={{ width: `${((stageIndex + 1) / SCAN_STAGES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Animated Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center space-x-2 text-slate-200 text-sm font-medium"
          >
            <StageIcon className="w-4 h-4 text-teal-400 animate-spin" />
            <span>{currentStage.text}</span>
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-slate-500 mt-2">Computing 120+ clinical dermatological metrics</p>
      </div>

    </div>
  );
}
