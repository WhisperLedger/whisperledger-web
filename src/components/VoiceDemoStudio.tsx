import React, { useState } from 'react';
import { Mic, CheckCircle2 } from 'lucide-react';

interface ExpenseSample {
  speech: string;
  merchant: string;
  category: string;
  amount: string;
  latency: string;
}

const SAMPLES: Record<string, ExpenseSample> = {
  starbucks: {
    speech: '“Paid ₹350 at Starbucks for cold brew coffee on card”',
    merchant: 'Starbucks Coffee',
    category: 'Food & Dining',
    amount: '₹350',
    latency: '0.38s Inference',
  },
  uber: {
    speech: '“Paid ₹480 to Uber for airport cab via UPI”',
    merchant: 'Uber Rides',
    category: 'Transportation',
    amount: '₹480',
    latency: '0.35s Inference',
  },
  flight: {
    speech: '“Booked flight tickets to Mumbai on Indigo for ₹5,800”',
    merchant: 'IndiGo Airlines',
    category: 'Travel & Flights',
    amount: '₹5,800',
    latency: '0.39s Inference',
  },
  groceries: {
    speech: '“Blinkit grocery order ₹940 paid with Paytm”',
    merchant: 'Blinkit Groceries',
    category: 'Groceries & Home',
    amount: '₹940',
    latency: '0.34s Inference',
  },
  swiggy: {
    speech: '“Swiggy dinner order ₹620 via Google Pay”',
    merchant: 'Swiggy Food',
    category: 'Food & Dining',
    amount: '₹620',
    latency: '0.37s Inference',
  },
};

export const VoiceDemoStudio: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('starbucks');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const current = SAMPLES[selectedKey];

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 450);
  };

  return (
    <section id="voice-ai" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="super-card p-6 sm:p-12 border-primary/20 bg-gradient-to-b from-white via-primary/5 to-white shadow-xl relative overflow-hidden">
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="super-pill super-pill-blue">Interactive Audio Studio</span>
          <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">Try Speaking to WhisperLedger</h2>
          <p className="text-slateBody text-sm sm:text-base">
            Click any prompt below to simulate real-time neural voice parsing, acoustic waveform visualization, and structured ledger extraction.
          </p>
        </div>

        {/* Sample Prompt Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button 
            onClick={() => handleSelect('starbucks')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
              selectedKey === 'starbucks'
                ? 'bg-primary text-white border border-primary'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-primary'
            }`}
          >
            ☕ “Starbucks ₹350”
          </button>
          <button 
            onClick={() => handleSelect('uber')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
              selectedKey === 'uber'
                ? 'bg-primary text-white border border-primary'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-primary'
            }`}
          >
            🚕 “Airport Uber ₹480”
          </button>
          <button 
            onClick={() => handleSelect('flight')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
              selectedKey === 'flight'
                ? 'bg-primary text-white border border-primary'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-primary'
            }`}
          >
            ✈️ “IndiGo Flights ₹5,800”
          </button>
          <button 
            onClick={() => handleSelect('groceries')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
              selectedKey === 'groceries'
                ? 'bg-primary text-white border border-primary'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-primary'
            }`}
          >
            🛒 “Blinkit ₹940”
          </button>
          <button 
            onClick={() => handleSelect('swiggy')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
              selectedKey === 'swiggy'
                ? 'bg-primary text-white border border-primary'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-primary'
            }`}
          >
            🍕 “Swiggy ₹620”
          </button>
        </div>

        {/* Live Audio Box */}
        <div className="max-w-xl mx-auto p-5 sm:p-7 rounded-2xl bg-white border border-primary/20 space-y-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-dark flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span> Acoustic Neural Stream
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
              {isProcessing ? 'Parsing Voice...' : 'Ready'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className={`flex items-center gap-1 h-8 shrink-0 transition-opacity ${isProcessing ? 'opacity-100' : 'opacity-40'}`}>
              <div className="wave-line"></div>
              <div className="wave-line" style={{ animationDelay: '0.15s' }}></div>
              <div className="wave-line" style={{ animationDelay: '0.3s' }}></div>
              <div className="wave-line" style={{ animationDelay: '0.45s' }}></div>
              <div className="wave-line" style={{ animationDelay: '0.2s' }}></div>
              <div className="wave-line" style={{ animationDelay: '0.35s' }}></div>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 italic truncate flex-1">
              {current.speech}
            </p>
            <button 
              onClick={() => handleSelect(selectedKey)}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md hover:bg-primaryHover" 
              aria-label="Simulate audio microphone"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* Extracted Entity Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold shadow-xs">
              Merchant: <strong className="text-dark">{current.merchant}</strong>
            </span>
            <span className="text-xs px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold shadow-xs">
              Amount: <strong className="text-dark">{current.amount}</strong>
            </span>
            <span className="text-xs px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold shadow-xs">
              Category: <strong className="text-dark">{current.category}</strong>
            </span>
            <span className="text-xs px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold ml-auto">
              ⚡ {current.latency}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
