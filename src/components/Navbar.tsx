import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 transition-all">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
          
          {/* Brand Logo with Official App Icon */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo.png" 
              alt="WhisperLedger Official Logo" 
              className="w-9 h-9 rounded-xl object-cover shadow-xs group-hover:scale-105 transition-transform"
            />
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-0.5">
              Whisper<span className="text-[#0066FF]">Ledger</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="/#product" className="hover:text-[#0066FF] transition-colors">The product</a>
            <a href="/#features" className="hover:text-[#0066FF] transition-colors">What it solves</a>
            <a href="/#recovery" className="hover:text-[#0066FF] transition-colors">Privacy</a>
            <a href="/#faq" className="hover:text-[#0066FF] transition-colors">Questions</a>
          </nav>

          {/* Desktop Actions CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <a 
              href="/#notify" 
              className="inline-flex items-center rounded-xl bg-[#101827] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#263246] shadow-sm hover:shadow active:scale-98"
            >
              <span>Get availability updates</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition" 
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Rendered via React Portal outside of backdrop-blur header) */}
      {mobileOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          {/* Dimmed backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-250">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="WhisperLedger" className="w-9 h-9 rounded-xl object-cover shadow-xs" />
                <span className="font-extrabold text-slate-900 text-lg">
                  Whisper<span className="text-[#0066FF]">Ledger</span>
                </span>
              </Link>
              <button 
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-2 py-6 text-base font-semibold text-slate-800">
              <a 
                href="/#product" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>The product</span>
                <span className="text-slate-300 text-xs">›</span>
              </a>
              <a 
                href="/#features" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>What it solves</span>
                <span className="text-slate-300 text-xs">›</span>
              </a>
              <a 
                href="/#recovery" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>Privacy &amp; Offline</span>
                <span className="text-slate-300 text-xs">›</span>
              </a>
              <a 
                href="/#faq" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>Questions</span>
                <span className="text-slate-300 text-xs">›</span>
              </a>
            </nav>

            {/* Privacy highlights card */}
            <div className="mt-auto rounded-2xl bg-slate-50 border border-slate-100 p-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                <span>Private by Default</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Biometric-protected and offline-ready. Built specifically for INR expenses.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <a 
                href="/#notify" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#0066FF] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0052CC] active:scale-98 transition"
              >
                <span>Get Availability Updates</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
