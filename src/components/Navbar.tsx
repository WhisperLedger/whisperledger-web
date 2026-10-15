import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { scrollToSection, scrollToWaitlist } from '../utils/scroll';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setMobileOpen(false);
    scrollToSection(e, sectionId, navigate, location.pathname);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
          
          {/* Brand Logo with Official App Icon */}
          <Link to="/" onClick={(e) => {
            if (location.pathname === '/' || location.pathname === '') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
              }
            }
          }} className="flex items-center gap-3 group">
            <img 
              src="/assets/logo.png" 
              alt="WhisperLedger Official Logo" 
              className="h-9 w-9 rounded-xl object-cover shadow-xs"
            />
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-0.5">
              Whisper<span className="text-[#0066FF]">Ledger</span>
            </span>
          </Link>

          {/* Desktop Navigation Links (Hash-free traversal) */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-slate-600">
            <a 
              href="#product" 
              onClick={(e) => handleNavClick(e, 'product')} 
              className="hover:text-[#0066FF] transition-colors py-1"
            >
              The product
            </a>
            <a 
              href="#features" 
              onClick={(e) => handleNavClick(e, 'features')} 
              className="hover:text-[#0066FF] transition-colors py-1"
            >
              What it solves
            </a>
            <a 
              href="#privacy" 
              onClick={(e) => handleNavClick(e, 'privacy')} 
              className="hover:text-[#0066FF] transition-colors py-1"
            >
              Privacy
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavClick(e, 'faq')} 
              className="hover:text-[#0066FF] transition-colors py-1"
            >
              Questions
            </a>
          </nav>

          {/* Desktop Actions CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button 
              type="button"
              onClick={(e) => {
                scrollToWaitlist(e, navigate, location.pathname);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#101827] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <span>Request Early Access</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Rendered via React Portal) */}
      {mobileOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <Link 
                to="/" 
                onClick={(e) => {
                  setMobileOpen(false);
                  if (location.pathname === '/' || location.pathname === '') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (window.location.hash) {
                      window.history.replaceState(null, '', window.location.pathname);
                    }
                  }
                }} 
                className="flex items-center gap-3"
              >
                <img src="/assets/logo.png" alt="WhisperLedger" className="w-9 h-9 rounded-xl object-cover shadow-xs" />
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  Whisper<span className="text-[#0066FF]">Ledger</span>
                </span>
              </Link>
              <button 
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-1.5 py-6 text-base font-semibold text-slate-800">
              <a 
                href="#product" 
                onClick={(e) => handleNavClick(e, 'product')} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>The product</span>
                <span className="text-slate-400 text-xs">›</span>
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>What it solves</span>
                <span className="text-slate-400 text-xs">›</span>
              </a>
              <a 
                href="#privacy" 
                onClick={(e) => handleNavClick(e, 'privacy')} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>Privacy</span>
                <span className="text-slate-400 text-xs">›</span>
              </a>
              <a 
                href="#faq" 
                onClick={(e) => handleNavClick(e, 'faq')} 
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-slate-800 hover:bg-slate-50 hover:text-[#0066FF] active:bg-blue-50 transition"
              >
                <span>Questions</span>
                <span className="text-slate-400 text-xs">›</span>
              </a>
            </nav>

            {/* Early Access Status card */}
            <div className="mt-auto rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/80 border border-blue-100 p-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Invite-Only Early Access</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                Handcrafted for Android. No bank logins, no loan ads, and 100% on-device encryption.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button 
                type="button"
                onClick={(e) => {
                  setMobileOpen(false);
                  scrollToWaitlist(e, navigate, location.pathname);
                }} 
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#0066FF] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0052CC] active:scale-98 transition"
              >
                <span>Request VIP Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
