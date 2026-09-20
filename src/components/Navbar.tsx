import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f17]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              WhisperLedger
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-cyan-400">
              Autonomous Wealth OS
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="/#features" className="hover:text-cyan-400 transition-colors">
            Core Innovations
          </a>
          <a href="/#simulator" className="hover:text-cyan-400 transition-colors">
            3-Way Ledger
          </a>
          <a href="/#debt-graph" className="hover:text-cyan-400 transition-colors">
            Debt Simplifier
          </a>
          <a href="/#security" className="hover:text-cyan-400 transition-colors">
            Enterprise Security
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              isAdmin
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Console</span>
          </Link>

          <a
            href="https://github.com/Agarwal16/whisperledger-frontend/releases"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:opacity-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </a>
        </div>
      </div>
    </header>
  );
};
