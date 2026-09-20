import React, { useState } from 'react';
import { Check, CheckCircle2, X } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200/60">
      <div className="text-left space-y-3 mb-12">
        <span className="super-pill super-pill-lime uppercase tracking-wider">Simple &amp; Transparent</span>
        <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">Pricing That Respects You</h2>
        
        {/* Interval Toggle */}
        <div className="flex items-center gap-3 pt-4">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-dark' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-7 rounded-full bg-primary p-0.5 transition-colors cursor-pointer relative" 
            aria-label="Toggle annual billing"
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform transform ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${isAnnual ? 'text-dark' : 'text-slate-500'}`}>
            Annual <span className="super-pill super-pill-lime !py-0.5 !px-2">Save 33%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Free Plan */}
        <div className="super-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-dark">Starter Free</h3>
              <span className="super-pill bg-slate-100 text-slate-600 border border-slate-200">Forever Free</span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-dark">₹0</span>
              <span className="text-xs text-slate-500"> / forever</span>
            </div>
            <ul className="space-y-2.5 mt-6 text-xs text-slate-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Manual expense &amp; income tracking</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Biometric Face ID / Fingerprint lock</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 2 Category budgets</li>
              <li className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-300" /> AI Voice Auto-Logging</li>
              <li className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-300" /> Money Recovery Legal Engine</li>
            </ul>
          </div>
          <a href="#download" className="btn-super-secondary w-full text-xs !py-3">
            <span>Get Started Free</span>
          </a>
        </div>

        {/* Pro Plan */}
        <div className="super-card p-6 sm:p-8 flex flex-col justify-between space-y-6 border-primary relative shadow-lg bg-gradient-to-b from-white to-primary/5">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-dark">WhisperLedger Pro</h3>
              <span className="super-pill super-pill-lime">7-Day Free Trial</span>
            </div>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-dark">
                {isAnnual ? '₹799' : '₹99'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {isAnnual ? ' / year' : ' / month'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              {isAnnual ? '₹799/yr (approx. ₹66/mo — saves 33%)' : 'Billed monthly, cancel anytime'}
            </p>
            
            <ul className="space-y-2.5 mt-6 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited AI Voice Expense Auto-Logging</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Money Recovery Legal Dispute Engine</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Bank-grade monthly PDF &amp; CSV statements</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited category budgets with threshold alerts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Passive on-device bank SMS parser</li>
            </ul>
          </div>
          <a href="#download" className="btn-super-primary w-full text-xs !py-3">
            <span>Claim 7-Day Free Trial</span>
          </a>
        </div>
      </div>
    </section>
  );
};
