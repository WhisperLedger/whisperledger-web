import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-slate-200/60 transition-all">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        
        {/* Brand Logo with Official App Icon */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/assets/logo.png" 
            alt="WhisperLedger Official Logo" 
            className="w-9 h-9 rounded-xl object-cover group-hover:scale-105 transition-transform"
          />
          <span className="text-lg font-bold tracking-tight text-dark flex items-center gap-0.5">
            Whisper<span className="text-primary">Ledger</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="/#features" className="hover:text-primary transition-colors">Features</a>
            <a href="/#recovery" className="hover:text-primary transition-colors">Refunds</a>
            <a href="/#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>

        {/* Actions CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a href="/downloads/whisperledger-v1.0.0.apk" download="WhisperLedger-v1.0.0.apk" className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm">
            <span>Download APK</span>
          </a>
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
            <a href="/#how-it-works" onClick={() => setMobileOpen(false)} className="hover:text-primary">How it works</a>
            <a href="/#features" onClick={() => setMobileOpen(false)} className="hover:text-primary">Features</a>
            <a href="/#recovery" onClick={() => setMobileOpen(false)} className="hover:text-primary">Refunds</a>
            <a href="/#pricing" onClick={() => setMobileOpen(false)} className="hover:text-primary">Pricing</a>
            <a href="/#faq" onClick={() => setMobileOpen(false)} className="hover:text-primary">FAQ</a>
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-100">
            <a href="/#download" onClick={() => setMobileOpen(false)} className="btn-super-primary w-full justify-center !py-3.5">
              <span>WhisperLedger is coming soon</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
