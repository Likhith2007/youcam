import React from 'react';
import { Utensils, Droplets, Fish, Leaf, Apple, ShieldCheck, AlertTriangle, Sparkles, HeartPulse } from 'lucide-react';
import { parseBoldText } from '../utils/textFormatter';

export default function DietRoutineCard({ dietRoutine }) {
  if (!dietRoutine) return null;

  const { summary, hydrationGoal, superfoods = [], foodsToLimit = [] } = dietRoutine;

  const getSuperfoodIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'fish': return Fish;
      case 'leaf': return Leaf;
      case 'apple': return Apple;
      default: return ShieldCheck;
    }
  };

  return (
    <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-500/40 relative overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-xl text-white">Dermatological Diet & Nutrition Plan</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider flex items-center space-x-1">
                <HeartPulse className="w-3 h-3 text-emerald-400" />
                <span>Cellular Healing</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Nutritional strategy tailored to your skin analysis to support sub-surface cellular repair
            </p>
          </div>
        </div>

        {/* Hydration Target Badge */}
        {hydrationGoal && (
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2 text-xs text-slate-200">
            <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] block text-slate-400 uppercase font-semibold">Daily Hydration Target</span>
              <span className="font-bold text-teal-300">{parseBoldText(hydrationGoal)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary Box */}
      {summary && (
        <div className="mt-6 p-4.5 rounded-2xl bg-slate-900/90 border border-slate-800 relative z-10">
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {parseBoldText(summary)}
          </p>
        </div>
      )}

      {/* Superfoods Grid */}
      {superfoods.length > 0 && (
        <div className="mt-6 relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-sm text-white">Recommended Skin-Healing Superfoods & Benefits</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {superfoods.map((food, idx) => {
              const FoodIcon = getSuperfoodIcon(food.icon);
              return (
                <div key={idx} className="glass-panel rounded-2xl p-4 border border-slate-800/90 hover:border-emerald-500/40 transition-all flex items-start space-x-3.5 group">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <FoodIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                      {parseBoldText(food.name)}
                    </h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {parseBoldText(food.benefit)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Foods to Limit */}
      {foodsToLimit.length > 0 && (
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 relative z-10">
          <div className="flex items-center space-x-2 mb-2 text-amber-300 font-semibold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Dietary Triggers To Limit Or Avoid</span>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            {foodsToLimit.map((item, idx) => (
              <div key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>{parseBoldText(item)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
