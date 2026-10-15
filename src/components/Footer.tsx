import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white mt-20">
      <div className="max-w-6xl mx-auto py-10 px-5 sm:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="WhisperLedger" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-bold text-dark">WhisperLedger</span>
          <span>© 2026 • Created by Tanmay Agarwal.</span>
        </div>
        <div className="flex flex-wrap items-center gap-5 justify-center">
          <a href="/#product" className="hover:text-primary transition-colors">The product</a>
          <a href="/#features" className="hover:text-primary transition-colors">What it solves</a>
          <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
          <a href="mailto:support@whisperledger.in" className="hover:text-primary transition-colors">Contact support</a>
        </div>
      </div>
    </footer>
  );
};
