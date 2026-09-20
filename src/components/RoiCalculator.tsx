import React, { useState } from 'react';

export const RoiCalculator: React.FC = () => {
  const [orders, setOrders] = useState<number>(45);

  const stuckCases = Math.round(orders * 0.28);
  const recoveredMoney = Math.round(orders * 418.8);
  const hoursSaved = Math.round(orders * 0.44);

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-200/60">
      <div className="text-left max-w-2xl space-y-3 mb-12">
        <span className="super-pill super-pill-blue uppercase tracking-wider">Financial ROI</span>
        <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">How Much Stuck Money Can You Reclaim?</h2>
        <p className="text-slateBody text-sm sm:text-base">
          Calculate how much money you risk losing each year in failed refunds, duplicate debits, and unreversed merchant holds.
        </p>
      </div>

      <div className="super-card p-6 sm:p-10 max-w-2xl space-y-6 text-left border-primary/20 bg-white">
        <div className="flex items-center justify-between">
          <label htmlFor="roiSlider" className="text-xs sm:text-sm font-bold text-dark">
            Your Monthly Online Orders &amp; UPI Spends
          </label>
          <span className="text-xs font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-xl">
            {orders} orders / mo
          </span>
        </div>
        
        <input 
          id="roiSlider"
          type="range" 
          min="10" 
          max="150" 
          value={orders} 
          step="5" 
          onChange={(e) => setOrders(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
          aria-label="Monthly online transactions slider"
        />

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stuck Refund Cases</p>
            <h5 className="text-lg sm:text-2xl font-black text-dark mt-1">~{stuckCases} Cases</h5>
            <p className="text-[10px] text-slate-500 mt-0.5">Annual average</p>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lost Money Recovered</p>
            <h5 className="text-lg sm:text-2xl font-black text-amber-600 mt-1">₹{recoveredMoney.toLocaleString('en-IN')}</h5>
            <p className="text-[10px] text-slate-500 mt-0.5">Back in your bank</p>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Support Time Saved</p>
            <h5 className="text-lg sm:text-2xl font-black text-emerald-600 mt-1">{hoursSaved} hrs</h5>
            <p className="text-[10px] text-slate-500 mt-0.5">Zero support calls</p>
          </div>
        </div>
      </div>
    </section>
  );
};
