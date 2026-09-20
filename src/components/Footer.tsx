import React from 'react';
import { Sparkles, Shield, Lock, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070a10] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">WhisperLedger</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            The autonomous money operating system for personal and shared households. Designed with high-throughput Go backend services, end-to-end encryption, and native Android SMS telemetry.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> AES-256 / Argon2id
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Zero Telemetry Leaks
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Golang 1.24 API Core
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Architecture</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#simulator" className="hover:text-cyan-400">3-Way Outflow Ledger</a></li>
            <li><a href="#debt-graph" className="hover:text-cyan-400">Debt Simplification Graph</a></li>
            <li><a href="#features" className="hover:text-cyan-400">Money Leak Detective</a></li>
            <li><a href="/admin" className="hover:text-cyan-400">Executive Admin Portal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Ecosystem</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://github.com/Agarwal16/whisperledger-backend" className="hover:text-cyan-400">Go Backend Repo</a></li>
            <li><a href="https://github.com/Agarwal16/whisperledger-frontend" className="hover:text-cyan-400">React Native / Expo App</a></li>
            <li><a href="https://github.com/Agarwal16/whisperledger-web" className="hover:text-cyan-400">Web Landing & Dashboard</a></li>
            <li><a href="/health" className="hover:text-cyan-400">System Status</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 WhisperLedger Technologies. Strictly Private & Autonomous.</p>
        <p className="flex items-center gap-1 mt-4 md:mt-0">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500" /> for complete financial clarity.
        </p>
      </div>
    </footer>
  );
};
