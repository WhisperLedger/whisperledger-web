import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/60 bg-white py-10 px-4 sm:px-6 max-w-6xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 mt-20">
      <div className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="WhisperLedger" className="w-6 h-6 rounded-md object-cover" />
        <span className="font-bold text-dark">WhisperLedger</span>
        <span>© 2026 WhisperLedger Technologies.</span>
      </div>
      <div className="flex flex-wrap items-center gap-5 justify-center">
        <a href="/#product" className="hover:text-primary transition-colors">The product</a>
        <a href="/#features" className="hover:text-primary transition-colors">What it solves</a>
        <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
        <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
        <a href="mailto:support@whisperledger.in" className="hover:text-primary transition-colors">Contact support</a>
      </div>
    </footer>
  );
};
