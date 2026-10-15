import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white mt-6 sm:mt-8">
      <div className="max-w-6xl mx-auto py-8 sm:py-9 px-5 sm:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="WhisperLedger" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-bold text-[#101827]">WhisperLedger</span>
          <span>© 2026 • Built for privacy &amp; precision in India.</span>
        </div>
        <div className="flex flex-wrap items-center gap-5 justify-center">
          <a href="/#product" className="hover:text-[#0066FF] transition-colors">The product</a>
          <a href="/#features" className="hover:text-[#0066FF] transition-colors">What it solves</a>
          <Link to="/privacy" className="hover:text-[#0066FF] transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-[#0066FF] transition-colors">Terms</Link>
          <a href="mailto:support@whisperledger.in" className="hover:text-[#0066FF] transition-colors">Contact support</a>
        </div>
      </div>
    </footer>
  );
};
