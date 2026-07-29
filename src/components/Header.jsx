import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, Shield, Cpu, RefreshCw, KeyRound } from 'lucide-react';

export default function Header({ onReset, apiStatus }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 shadow-lg shadow-teal-500/20">
            <Activity className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-300"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Skin<span className="text-teal-400">Pulse</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                AI Clinical
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">YouCam Skin AI Hackathon Edition</p>
          </div>
        </div>

        {/* Status Badge & API Mode Indicator */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>YouCam API Status:</span>
            {apiStatus?.hasApiKey ? (
              <span className="inline-flex items-center text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> Live REST API
              </span>
            ) : (
              <span className="inline-flex items-center text-amber-400 font-medium" title="API Key not detected in .env - running in high-precision simulated JSON mode">
                <KeyRound className="w-3 h-3 mr-1" /> Simulation Fallback Mode
              </span>
            )}
          </div>

          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Analysis</span>
          </button>
        </div>

      </div>
    </header>
  );
}
