import React from 'react';
import { Sun, Moon, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RoutineEngine({ routine }) {
  if (!routine) return null;

  const { morning = [], evening = [] } = routine;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-display font-bold text-xl text-white">Targeted Morning & Evening Skincare Regimen</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
              AI Formulated
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Dynamically tuned to address your lowest diagnostic parameter scores</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Morning Regimen Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">AM Morning Regimen</h4>
              <p className="text-xs text-slate-400">Focus: Protection, Hydration & Environmental Shielding</p>
            </div>
          </div>

          <div className="space-y-4">
            {morning.map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start space-x-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold text-xs">
                  0{item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">{item.title}</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mt-0.5">{item.product}</h5>
                  <p className="text-xs text-slate-400 mt-1">{item.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evening Regimen Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">PM Night Regimen</h4>
              <p className="text-xs text-slate-400">Focus: Deep Renewal, Cellular Repair & Moisture Lock</p>
            </div>
          </div>

          <div className="space-y-4">
            {evening.map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start space-x-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-xs">
                  0{item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">{item.title}</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mt-0.5">{item.product}</h5>
                  <p className="text-xs text-slate-400 mt-1">{item.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
