import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ArrowDownCircle, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-slate-200/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Official App Icon */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/assets/logo.png" 
            alt="WhisperLedger Official Logo" 
            className="w-10 h-10 rounded-2xl shadow-xs object-cover group-hover:scale-105 transition-transform" 
          />
          <span className="text-xl font-extrabold tracking-tight text-dark flex items-center gap-0.5">
            Whisper<span className="text-primary">Ledger</span>
          </span>
        </Link>

        {/* Navigation Links */}
        {!isAdmin ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="/#voice-ai" className="hover:text-primary transition-colors">Voice Demo</a>
            <a href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="/#features" className="hover:text-primary transition-colors">Superpowers</a>
            <a href="/#recovery" className="hover:text-primary transition-colors flex items-center gap-1.5">
              Refund Recovery <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            </a>
            <a href="/#calculator" className="hover:text-primary transition-colors">Calculator</a>
            <a href="/#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="/#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <span className="admin-pill admin-pill-emerald text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Root Enclave Session
            </span>
          </div>
        )}

        {/* Actions CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a href="/#download" className="btn-super-primary !py-2.5 !px-5 !text-xs">
            <ArrowDownCircle className="w-4 h-4" />
            <span>Get WhisperLedger</span>
          </a>
          <Link 
            to="/admin" 
            className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold shadow-xs ${
              isAdmin 
                ? 'bg-primary text-white border-primary' 
                : 'border-slate-200 hover:border-primary text-slate-600 hover:text-primary bg-white/90'
            }`} 
            title="Admin Portal"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="hidden xl:inline">Admin</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs" 
          aria-label="Open navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 shadow-2xl sm:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="WhisperLedger" className="w-9 h-9 rounded-xl object-cover" />
              <span className="font-extrabold text-dark text-lg">Whisper<span className="text-primary">Ledger</span></span>
            </div>
            <button 
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-5 py-8 text-base font-bold text-dark text-left">
            <a href="/#voice-ai" onClick={() => setMobileOpen(false)} className="hover:text-primary">🎙️ Voice Demo Live</a>
            <a href="/#how-it-works" onClick={() => setMobileOpen(false)} className="hover:text-primary">⚙️ How it Works</a>
            <a href="/#features" onClick={() => setMobileOpen(false)} className="hover:text-primary">⚡ Superpowers</a>
            <a href="/#recovery" onClick={() => setMobileOpen(false)} className="hover:text-primary">🛡️ Refund Recovery</a>
            <a href="/#calculator" onClick={() => setMobileOpen(false)} className="hover:text-primary">📊 ROI Calculator</a>
            <a href="/#pricing" onClick={() => setMobileOpen(false)} className="hover:text-primary">💳 Pricing &amp; Plans</a>
            <a href="/#faq" onClick={() => setMobileOpen(false)} className="hover:text-primary">❓ FAQ</a>
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-primary hover:text-primaryHover flex items-center gap-2 pt-2 border-t border-slate-100 font-bold">
              <Shield className="w-4 h-4" /> Admin Console
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-100">
            <a href="/#download" onClick={() => setMobileOpen(false)} className="btn-super-primary w-full justify-center !py-3.5">
              <span>Download WhisperLedger</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
