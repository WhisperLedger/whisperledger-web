import React, { useState } from 'react';
import { Coffee, Navigation, ShoppingBag, MessageCircle, Mail, FileText, Download } from 'lucide-react';

export const FlagshipPhoneMockup: React.FC = () => {
  const [mode, setMode] = useState<'voice' | 'recovery' | 'statement'>('voice');

  return (
    <div className="flex flex-col items-center justify-center relative w-full pt-4 sm:pt-0">
      
      {/* Mode Switcher Controls */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/90 border border-slate-200 mb-4 z-20 shadow-xs">
        <button 
          onClick={() => setMode('voice')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'voice' 
              ? 'bg-primary text-white shadow-xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:text-dark'
          }`}
        >
          🎙️ Voice Ledger
        </button>
        <button 
          onClick={() => setMode('recovery')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'recovery' 
              ? 'bg-primary text-white shadow-xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:text-dark'
          }`}
        >
          🛡️ Dispute Notice
        </button>
        <button 
          onClick={() => setMode('statement')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'statement' 
              ? 'bg-primary text-white shadow-xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:text-dark'
          }`}
        >
          📊 Spend Audit
        </button>
      </div>

      {/* Flagship Device */}
      <div className="flagship-device">
        {/* Dynamic Island */}
        <div className="device-island">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-2 bg-primary rounded-full animate-bounce"></span>
            <span className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
          <span className="text-[9px] font-mono text-white/80 font-bold">0.38s</span>
        </div>

        {/* Device Screen Body */}
        <div className="device-screen p-4 justify-between space-y-3">
          
          {/* Top Monthly Spend Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-dark to-slate-900 text-white shadow-md">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">September Spend</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                ● On-Device Sync
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-black tracking-tight">₹42,850</h3>
              <span className="text-[11px] text-emerald-400 font-bold">↓ 14% under budget</span>
            </div>
            <div className="w-full bg-slate-700/60 h-2 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accentLime h-full w-[65%] rounded-full"></div>
            </div>
          </div>

          {/* VIEW 1: LIVE VOICE LEDGER ENTRIES */}
          {mode === 'voice' && (
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Live Speech Stream</span>
                <span className="text-primary font-mono font-bold">Neural Engine</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-dark">Starbucks Cold Brew</p>
                      <p className="text-[10px] text-slate-500">Voice Memo • 11:20 AM</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-dark">₹350</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-dark">Uber Airport Cab</p>
                      <p className="text-[10px] text-slate-500">Bank SMS Sync • 09:45 AM</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-dark">₹480</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-dark">Zara Lifestyle</p>
                      <p className="text-[10px] text-slate-500">Card Charge • Yesterday</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-dark">₹3,490</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: LEGAL RECOVERY DISPUTE NOTICE */}
          {mode === 'recovery' && (
            <div className="space-y-2.5 flex-1 flex flex-col justify-center">
              <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">L2 Legal Notice Ready</span>
                  <span className="text-[10px] font-mono text-amber-700 font-bold">UTR: 42918829</span>
                </div>
                <h4 className="font-bold text-xs text-dark">Swiggy Unreturned Refund Dispute</h4>
                <p className="text-[10px] text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                  "Formal Notice under RBI TAT: Transaction ID #9182 of ₹1,450 remains uncredited past 48 hours. Subject to statutory interest under RBI/2019-20/67..."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800">1-Tap WhatsApp</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                  <Mail className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800">Nodal Desk Email</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: SPEND AUDIT & PDF EXPORT */}
          {mode === 'statement' && (
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-dark flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-primary" /> Sept 2026 Audit
                  </span>
                  <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">CA Ready</span>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between text-slate-600"><span>Dining &amp; Food</span><span className="font-bold text-dark">₹12,400 (29%)</span></div>
                  <div className="flex justify-between text-slate-600"><span>Travel &amp; Cabs</span><span className="font-bold text-dark">₹8,950 (21%)</span></div>
                  <div className="flex justify-between text-slate-600"><span>Bills &amp; Utilities</span><span className="font-bold text-dark">₹6,200 (15%)</span></div>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs">
                <Download className="w-3.5 h-3.5" /> Export CA Audit Report
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
