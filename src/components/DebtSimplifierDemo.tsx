import React, { useState } from 'react';
import { ArrowRight, GitBranch, RefreshCw, Zap, Check } from 'lucide-react';

export const DebtSimplifierDemo: React.FC = () => {
  const [resolved, setResolved] = useState<boolean>(true);

  return (
    <div className="glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GitBranch className="w-3.5 h-3.5" /> Graph Optimization Algorithm
          </div>
          <h3 className="text-2xl font-bold text-white">Household Minimum-Cash-Flow Simplifier</h3>
          <p className="text-slate-400 text-sm mt-1">
            Eliminate awkward multi-person debt loops. WhisperLedger compresses complex roommate debts into the mathematical minimum number of transfers.
          </p>
        </div>

        <button
          onClick={() => setResolved(!resolved)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${resolved ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span>{resolved ? 'Show Raw Messy Debts' : 'Apply Minimum-Cash-Flow'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* State 1: Messy or Before */}
        <div className={`p-6 rounded-2xl border transition-all ${!resolved ? 'border-amber-500/40 bg-amber-950/10' : 'border-slate-800 bg-slate-900/40 opacity-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Before: 6 Circular IOU Transfers
            </h4>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
              High Friction
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center text-slate-300">
              <span>Arjun → Rohan</span>
              <span className="text-rose-400 font-bold">₹1,400 (Groceries)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center text-slate-300">
              <span>Rohan → Priya</span>
              <span className="text-rose-400 font-bold">₹1,200 (Wi-Fi Bill)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center text-slate-300">
              <span>Priya → Kabir</span>
              <span className="text-rose-400 font-bold">₹800 (Maid Service)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center text-slate-300">
              <span>Kabir → Arjun</span>
              <span className="text-rose-400 font-bold">₹600 (Cleaning Supplies)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center text-slate-300">
              <span>Arjun → Priya</span>
              <span className="text-rose-400 font-bold">₹350 (Milk Delivery)</span>
            </div>
          </div>
        </div>

        {/* State 2: Optimized Graph */}
        <div className={`p-6 rounded-2xl border transition-all ${resolved ? 'border-emerald-500/40 bg-emerald-950/15' : 'border-slate-800 bg-slate-900/40 opacity-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" /> After: 2 Clean UPI Transfers
            </h4>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
              <Check className="w-3 h-3" /> 0 Debt Remainder
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex justify-between items-center text-slate-100 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Arjun</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Rohan</span>
              </div>
              <span className="text-emerald-400 font-bold text-sm">₹1,150</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex justify-between items-center text-slate-100 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Kabir</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Priya</span>
              </div>
              <span className="text-emerald-400 font-bold text-sm">₹200</span>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200/80 font-sans">
              ✨ 4 out of 6 transfers completely neutralized. Everyone is squared away with exactly 2 direct UPI transfers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
