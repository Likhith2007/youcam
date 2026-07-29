import React, { useState } from 'react';
import { Layers, Eye, ShieldAlert, Sparkles, Droplets, Info } from 'lucide-react';

export default function BlemishHeatmap({ imagePreview, heatmapPoints = [] }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const filters = [
    { id: 'all', label: 'All Concerns', icon: Layers },
    { id: 'acne', label: 'Acne & Spots', icon: ShieldAlert, color: 'text-rose-400' },
    { id: 'wrinkles', label: 'Wrinkles & Lines', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'darkCircles', label: 'Dark Circles', icon: Eye, color: 'text-purple-400' },
    { id: 'moisture', label: 'Dryness Zones', icon: Droplets, color: 'text-amber-400' },
  ];

  const filteredPoints = activeFilter === 'all'
    ? heatmapPoints
    : heatmapPoints.filter(p => p.type === activeFilter);

  const getPointColor = (type) => {
    switch (type) {
      case 'acne': return { fill: 'rgba(244, 63, 94, 0.4)', stroke: '#f43f5e', ring: 'rgba(244, 63, 94, 0.8)' };
      case 'wrinkles': return { fill: 'rgba(6, 182, 212, 0.4)', stroke: '#06b6d4', ring: 'rgba(6, 182, 212, 0.8)' };
      case 'darkCircles': return { fill: 'rgba(168, 85, 247, 0.4)', stroke: '#a855f7', ring: 'rgba(168, 85, 247, 0.8)' };
      case 'moisture': return { fill: 'rgba(245, 158, 11, 0.4)', stroke: '#f59e0b', ring: 'rgba(245, 158, 11, 0.8)' };
      default: return { fill: 'rgba(20, 184, 166, 0.4)', stroke: '#14b8a6', ring: 'rgba(20, 184, 166, 0.8)' };
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800">
      
      {/* Header & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-white">Visual AI Blemish Heatmap Overlay</h3>
          <p className="text-xs text-slate-400">Toggle concern layers to inspect localized facial analysis points</p>
        </div>

        {/* Filter Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const FilterIcon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <FilterIcon className="w-3.5 h-3.5" />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Heatmap Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Image Container with Dynamic Heatmap SVG */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-black">
            <img
              src={imagePreview}
              alt="Face Analysis Target"
              className="w-full h-full object-cover"
            />

            {/* SVG Overlay layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-auto" viewBox="0 0 100 100" preserveAspectRatio="none">
              {filteredPoints.map((pt, idx) => {
                const color = getPointColor(pt.type);
                const isHovered = hoveredPoint?.id === pt.id;

                return (
                  <g
                    key={pt.id || `svg-spot-${idx}`}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer transition-transform duration-200 hover:scale-125"
                  >
                    {/* Outer Glowing Pulse Circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={pt.radius ? pt.radius * 0.4 : 5}
                      fill={color.fill}
                      stroke={color.stroke}
                      strokeWidth={isHovered ? '1.5' : '0.8'}
                      className="animate-pulse"
                    />

                    {/* Center Hotspot Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="1.8"
                      fill={color.stroke}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Live Hover Tooltip Popover */}
            {hoveredPoint && (
              <div
                className="absolute z-30 p-3 rounded-xl bg-slate-950/95 border border-teal-500/50 backdrop-blur-md shadow-2xl text-xs w-48 text-slate-100 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
                style={{ left: `${hoveredPoint.x}%`, top: `${hoveredPoint.y - 2}%` }}
              >
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>{hoveredPoint.label}</span>
                  <span className="text-[10px] uppercase font-semibold text-teal-400 px-1.5 py-0.5 rounded bg-teal-500/10">
                    {hoveredPoint.severity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Parameter Score: <strong className="text-teal-300">{hoveredPoint.score || 80}/100</strong>
                </p>
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 border border-slate-800 flex items-center space-x-1">
              <Info className="w-3 h-3 text-teal-400" />
              <span>Hover over hotspot dots for details</span>
            </div>
          </div>
        </div>

        {/* Right: Legend & Concern Breakdown List */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="font-bold text-sm text-white">Detected Landmark Markers ({filteredPoints.length})</h4>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredPoints.map((pt, idx) => {
              const color = getPointColor(pt.type);
              return (
                <div
                  key={pt.id || `list-spot-${idx}`}
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className={`p-3 rounded-2xl bg-slate-900/80 border transition-all cursor-pointer flex items-center justify-between ${
                    hoveredPoint?.id === pt.id ? 'border-teal-400 bg-slate-800/90' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 animate-pulse"
                      style={{ backgroundColor: color.stroke }}
                    />
                    <div>
                      <h5 className="font-semibold text-xs text-white">{pt.label}</h5>
                      <span className="text-[10px] text-slate-400 capitalize">Type: {pt.type}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    Score {pt.score || 80}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
