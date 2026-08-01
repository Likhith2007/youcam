import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Heart, Shirt, Activity, Droplets, Target, Palette, ShoppingBag, CheckCircle } from 'lucide-react';

export default function LandingExperienceHub({ onSelectExperience }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 animate-fade-in">
      
      {/* Hero Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
            AI-Powered. Real Results.
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg font-medium">
          Understand your skin. Visualize your style. Make smarter choices.
        </p>
        <div className="flex items-center justify-center space-x-1 text-purple-400 pt-1">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse delay-150" />
        </div>
      </div>

      {/* Main Experience Selection Hub Box */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden bg-slate-900/60 backdrop-blur-xl">
        
        {/* Hub Header */}
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            What would you like to try today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Choose an experience to get started
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CARD 1: SKIN AI (PURPLE/VIOLET THEME) */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-purple-950/10 hover:border-purple-500/60 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-purple-500/10">
                  <Activity className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-purple-300 transition-colors">
                    Skin AI
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Analyze your skin in seconds and get personalized dermatological insights.
                  </p>
                </div>
              </div>

              {/* Graphic Preview Box & Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Feature Bullet Points */}
                <div className="sm:col-span-6 space-y-4 text-xs">
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Skin Analysis</h4>
                      <p className="text-[11px] text-slate-400">Detect spots, pores, texture and wrinkles</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                      <Droplets className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Skin Score</h4>
                      <p className="text-[11px] text-slate-400">Get overall score with detailed metrics</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">AI Consultation</h4>
                      <p className="text-[11px] text-slate-400">Gemini 2.5 Flash tips tailored for your skin</p>
                    </div>
                  </div>
                </div>

                {/* Visual Graphic Mockup Preview */}
                <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 p-2 shadow-xl relative">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                      alt="Skin AI Scan Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-purple-500/40 text-[10px] flex items-center justify-between text-white font-bold">
                      <span>Overall Skin Score</span>
                      <span className="text-purple-400 font-extrabold text-xs">88 / 100</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Action Button & Security */}
            <div className="pt-6 space-y-2">
              <button
                onClick={() => onSelectExperience && onSelectExperience('skin')}
                className="w-full py-3.5 px-6 rounded-2xl font-display font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-500/25 flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98]"
              >
                <span>Try Skin AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-medium">
                <Lock className="w-3 h-3 text-purple-400" />
                <span>Your photos are encrypted and never stored.</span>
              </div>
            </div>

          </div>

          {/* CARD 2: APPAREL VIRTUAL TRY-ON (PINK/ROSE THEME) */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/30 bg-pink-950/10 hover:border-pink-500/60 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-pink-500/10">
                  <Shirt className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-pink-300 transition-colors">
                    Apparel Virtual Try-On
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    See how clothes look on you before you buy with YouCam S2S v3.0 AI.
                  </p>
                </div>
              </div>

              {/* Graphic Preview Box & Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Feature Bullet Points */}
                <div className="sm:col-span-6 space-y-4 text-xs">
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Realistic Try-On</h4>
                      <p className="text-[11px] text-slate-400">Advanced AI for true-to-life fit results</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
                      <Palette className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Explore Styles</h4>
                      <p className="text-[11px] text-slate-400">Try different outfits, colors & body parts</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Shop with Confidence</h4>
                      <p className="text-[11px] text-slate-400">Make better decisions and reduce returns</p>
                    </div>
                  </div>
                </div>

                {/* Visual Graphic Mockup Preview */}
                <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-pink-500/30 bg-slate-950 p-2 shadow-xl relative">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
                      alt="Apparel Try-On Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-pink-500/40 text-[10px] flex items-center justify-between text-white font-bold">
                      <span>YouCam v3.0 Fit</span>
                      <span className="text-pink-400 font-extrabold text-xs">96% Match</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Action Button & Security */}
            <div className="pt-6 space-y-2">
              <button
                onClick={() => onSelectExperience && onSelectExperience('cloth')}
                className="w-full py-3.5 px-6 rounded-2xl font-display font-bold text-sm bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-xl shadow-pink-500/25 flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98]"
              >
                <span>Try Virtual Try-On</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-medium">
                <Lock className="w-3 h-3 text-pink-400" />
                <span>Your photos are encrypted and never stored.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Trust & Feature Bar (Matching Mockup) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        
        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Secure & Private</h4>
            <p className="text-[11px] text-slate-400">Your data is encrypted and never shared</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">AI-Powered Accuracy</h4>
            <p className="text-[11px] text-slate-400">YouCam & Gemini 2.5 Flash models</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Instant Results</h4>
            <p className="text-[11px] text-slate-400">Get diagnostics and try-on in seconds</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Personalized for You</h4>
            <p className="text-[11px] text-slate-400">Insights and recommendations tailored</p>
          </div>
        </div>

      </div>

    </div>
  );
}
