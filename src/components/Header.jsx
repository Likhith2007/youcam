import React, { useState } from 'react';
import { Activity, Sparkles, Shield, Cpu, RefreshCw, KeyRound, Shirt, Stethoscope, User, LogOut, ChevronDown, UserCheck } from 'lucide-react';

export default function Header({ onReset, apiStatus, activeStudio = 'home', onSelectStudio, currentUser, onOpenAuthModal, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectStudio && onSelectStudio('home')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-600 shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                YouCam <span className="text-purple-400">AI Suite</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Personalized Skin & Style Intelligence</p>
          </div>
        </div>

        {/* Studio Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => onSelectStudio && onSelectStudio('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeStudio === 'home'
                ? 'bg-purple-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Home</span>
          </button>

          <button
            onClick={() => onSelectStudio && onSelectStudio('skin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeStudio === 'skin'
                ? 'bg-teal-500 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Skin AI</span>
          </button>

          <button
            onClick={() => onSelectStudio && onSelectStudio('cloth')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeStudio === 'cloth'
                ? 'bg-pink-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Apparel Try-On</span>
          </button>
        </div>

        {/* Profile & Auth Section */}
        <div className="flex items-center space-x-3">
          
          {/* User Profile Icon / Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-1 pr-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer group"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-purple-500/40"
                />
                <span className="text-xs font-bold text-white hidden sm:block truncate max-w-[110px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl p-3 border border-slate-800 shadow-2xl bg-slate-900/95 z-50 animate-fade-in space-y-2">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white truncate">{currentUser.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                        Pro VIP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>

                  <div className="space-y-1 text-xs font-medium text-slate-300">
                    <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-slate-800/60 cursor-pointer">
                      <span>Saved Skin Scans:</span>
                      <span className="font-bold text-teal-400">{currentUser.diagnosticsCount || 14}</span>
                    </div>
                    <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-slate-800/60 cursor-pointer">
                      <span>Saved Try-On Outfits:</span>
                      <span className="font-bold text-pink-400">{currentUser.savedOutfitsCount || 8}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 flex items-center space-x-2 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/20 flex items-center space-x-1.5 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
