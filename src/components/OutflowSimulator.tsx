import React, { useState } from 'react';
import { Sparkles, Users } from 'lucide-react';

export const OutflowSimulator: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(6000);
  const [outflowType, setOutflowType] = useState<'personal' | 'shared' | 'recoverable'>('shared');
  const [roommates, setRoommates] = useState<number>(3);

  // Calculations
  let personalShare = 0;
  let recoverableAmount = 0;

  if (outflowType === 'personal') {
    personalShare = totalAmount;
    recoverableAmount = 0;
  } else if (outflowType === 'recoverable') {
    personalShare = 0;
    recoverableAmount = totalAmount;
  } else {
    personalShare = totalAmount / roommates;
    recoverableAmount = totalAmount - personalShare;
  }

  return (
    <div className="glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Math Engine
            </div>
            <h3 className="text-2xl font-bold text-white">The 3-Way Outflow Simulation</h3>
            <p className="text-slate-400 text-sm mt-1">
              Traditional apps treat all outflows as "expenses", distorting your true wealth. See how WhisperLedger protects your disposable budget.
            </p>
          </div>

          <div className="flex bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setOutflowType('personal')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                outflowType === 'personal'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              True Personal
            </button>
            <button
              onClick={() => setOutflowType('shared')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                outflowType === 'shared'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Shared Living
            </button>
            <button
              onClick={() => setOutflowType('recoverable')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                outflowType === 'recoverable'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              100% Recoverable
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Simulate UPI / Card Outflow
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-xl font-bold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {outflowType === 'shared' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Household Members Sharing
                  </label>
                  <span className="text-sm font-bold text-cyan-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {roommates} Flatmates
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={roommates}
                  onChange={(e) => setRoommates(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="font-semibold text-slate-200">What happens behind the scenes:</div>
              <p>
                1. Bank SMS automatically records a debit of <strong className="text-white">₹{totalAmount.toLocaleString()}</strong>.
              </p>
              <p>
                2. WhisperLedger isolates your true consumption from fronted receivables.
              </p>
              <p>
                3. Your Safe-to-Spend autopilot preserves <strong className="text-emerald-400">₹{recoverableAmount.toLocaleString()}</strong> for real obligations.
              </p>
            </div>
          </div>

          {/* Outcome Breakdown Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Bank Account Debit
                </span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  ₹{totalAmount.toLocaleString()}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Total money debited from bank via UPI or Credit Card.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  True Personal Expense
                </span>
                <div className="text-3xl font-extrabold text-cyan-300 mt-1">
                  ₹{Math.round(personalShare).toLocaleString()}
                </div>
              </div>
              <p className="text-xs text-cyan-200/60 mt-4">
                The only portion that actually depletes your net worth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Expected Recoverable
                </span>
                <div className="text-3xl font-extrabold text-emerald-300 mt-1">
                  ₹{Math.round(recoverableAmount).toLocaleString()}
                </div>
              </div>
              <p className="text-xs text-emerald-200/60 mt-4">
                Added to Money Recovery Engine with 1-click reminders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  Safe-To-Spend Shielded
                </span>
                <div className="text-3xl font-extrabold text-indigo-300 mt-1">
                  ₹{Math.round(recoverableAmount).toLocaleString()}
                </div>
              </div>
              <p className="text-xs text-indigo-200/60 mt-4">
                Safe-to-Spend assumes this returns, preventing false budget panics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
