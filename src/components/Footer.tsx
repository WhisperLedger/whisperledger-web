import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/60 bg-white py-10 px-4 sm:px-6 max-w-6xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 mt-20">
      <div className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="WhisperLedger" className="w-6 h-6 rounded-md object-cover" />
        <span className="font-bold text-dark">WhisperLedger</span>
        <span>© 2026 WhisperLedger Technologies.</span>
      </div>
      <div className="flex flex-wrap items-center gap-5 justify-center">
        <a href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
        <a href="/#features" className="hover:text-primary transition-colors">Superpowers</a>
        <a href="/#recovery" className="hover:text-primary transition-colors">Refund Recovery</a>
        <a href="/#pricing" className="hover:text-primary transition-colors">Pricing</a>
        <a href="mailto:support@whisperledger.app" className="hover:text-primary transition-colors">Support Desk</a>
        <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-1 font-semibold text-slate-500 hover:text-primary">
          <Shield className="w-3.5 h-3.5" /> Admin Console
        </Link>
      </div>
    </footer>
  );
};
