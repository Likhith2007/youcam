import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (authMode === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }

    setError(null);

    // Create user profile object
    const userProfile = {
      name: authMode === 'signup' ? name : (email.split('@')[0] || 'Sophia Martinez'),
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      memberSince: 'August 2026',
      plan: 'YouCam AI Suite Pro',
      diagnosticsCount: 14,
      savedOutfitsCount: 8
    };

    // Save to localStorage
    localStorage.setItem('youcam_user', JSON.stringify(userProfile));
    onLoginSuccess(userProfile);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const demoUser = {
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      memberSince: 'August 2026',
      plan: 'YouCam AI Suite Pro VIP',
      diagnosticsCount: 18,
      savedOutfitsCount: 12
    };
    localStorage.setItem('youcam_user', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-slate-900/90 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20 text-white">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login'
              ? 'Access your saved skin analysis & virtual try-on history'
              : 'Join YouCam AI Suite for personalized dermatological insights'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex rounded-2xl bg-slate-950 p-1 mb-6 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => { setAuthMode('login'); setError(null); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-purple-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setError(null); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'signup'
                ? 'bg-purple-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Sophia Martinez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-display font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center space-x-2 transition-all"
          >
            <span>{authMode === 'login' ? 'Sign In to Account' : 'Create Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative px-3 bg-slate-900 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            Or Demo Account
          </span>
        </div>

        {/* Quick Demo Login Button */}
        <button
          onClick={handleQuickDemoLogin}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center space-x-2 transition-all"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>One-Click Demo Login (Sophia Martinez)</span>
        </button>

      </div>
    </div>
  );
}
