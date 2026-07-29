import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Droplets, Eye, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

const METRIC_CONFIG = {
  texture: {
    title: 'Texture & Smoothness',
    icon: Activity,
    color: 'text-teal-400',
    barColor: 'from-teal-500 to-emerald-400',
    unit: 'Smoothness Index'
  },
  wrinkles: {
    title: 'Wrinkles & Fine Lines',
    icon: Sparkles,
    color: 'text-cyan-400',
    barColor: 'from-cyan-500 to-blue-400',
    unit: 'Elasticity Rating'
  },
  moisture: {
    title: 'Moisture & Hydration',
    icon: Droplets,
    color: 'text-blue-400',
    barColor: 'from-blue-500 to-indigo-400',
    unit: 'Barrier Lock %'
  },
  oiliness: {
    title: 'Oiliness & Sebum Level',
    icon: Flame,
    color: 'text-amber-400',
    barColor: 'from-amber-500 to-orange-400',
    unit: 'Sebum Balance %'
  },
  darkCircles: {
    title: 'Dark Circles & Bags',
    icon: Eye,
    color: 'text-purple-400',
    barColor: 'from-purple-500 to-pink-400',
    unit: 'Luminosity Index'
  },
  acne: {
    title: 'Acne & Blemish Severity',
    icon: ShieldAlert,
    color: 'text-emerald-400',
    barColor: 'from-emerald-500 to-teal-400',
    unit: 'Clarity Index'
  }
};

export default function DiagnosticCards({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-white">Diagnostic Breakdown</h3>
          <p className="text-xs text-slate-400">Detailed metric scores across key YouCam AI skin parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(metrics).map(([key, data], idx) => {
          const config = METRIC_CONFIG[key] || {
            title: key,
            icon: Activity,
            color: 'text-teal-400',
            barColor: 'from-teal-500 to-emerald-400'
          };
          const MetricIcon = config.icon;
          const score = data.score || 80;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${config.color}`}>
                      <MetricIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">{config.title}</h4>
                      <span className="text-[11px] text-slate-400">{data.label}</span>
                    </div>
                  </div>

                  <span className={`font-display font-extrabold text-2xl ${config.color}`}>
                    {score}
                  </span>
                </div>

                {/* Progress Meter Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Clinical Score</span>
                    <span className="font-medium text-slate-300">{score} / 100</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${config.barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.05 }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {data.description}
                </p>
              </div>

              {/* Status Footer Tag */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Concern Level:</span>
                <span className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                  data.concernLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  data.concernLevel === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {data.concernLevel || 'Low'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
