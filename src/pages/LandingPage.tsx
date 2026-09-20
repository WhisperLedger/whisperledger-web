import React, { useState } from 'react';
import { 
  Download, PlayCircle, Mic, MessageSquare, ShieldAlert, Lock, 
  CheckCircle2, Waves, FileCheck2, Send, Apple, Play, X
} from 'lucide-react';
import { FlagshipPhoneMockup } from '../components/FlagshipPhoneMockup';
import { VoiceDemoStudio } from '../components/VoiceDemoStudio';
import { LifecycleStepper } from '../components/LifecycleStepper';
import { RoiCalculator } from '../components/RoiCalculator';
import { PricingSection } from '../components/PricingSection';
import { FaqSection } from '../components/FaqSection';
import { OutflowSimulator } from '../components/OutflowSimulator';
import { DebtSimplifierDemo } from '../components/DebtSimplifierDemo';

export const LandingPage: React.FC = () => {
  const [recoveryPhase, setRecoveryPhase] = useState<'step1' | 'step2' | 'step3'>('step1');

  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION: Left-Aligned Typography & Flagship Phone Showcase */}
      <section className="pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Prop & Trust Stats */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="fluid-h1 text-dark tracking-tight leading-[1.08]">
              Command your money <span className="gradient-text-super">by voice.</span><br />
              Recover lost funds <span className="gradient-text-amber">with Legal AI.</span>
            </h1>

            <p className="text-base sm:text-lg text-slateBody font-normal max-w-xl leading-relaxed">
              Stop typing expenses into tedious spreadsheets. WhisperLedger turns natural speech into structured ledger entries in <strong className="text-dark font-semibold">0.38s</strong>, silently logs bank SMS on-device, and recovers stuck refunds with formal RBI dispute notices.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a href="#download" className="btn-super-primary text-sm sm:text-base !py-3.5 !px-8">
                <Download className="w-5 h-5" />
                <span>Get WhisperLedger Free</span>
              </a>
              <a href="#voice-ai" className="btn-super-secondary text-sm sm:text-base !py-3.5 !px-8">
                <PlayCircle className="w-5 h-5 text-primary" />
                <span>Try Voice Demo Live</span>
              </a>
            </div>

            {/* Trust Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-dark">25,000+</p>
                <p className="text-[11px] font-medium text-slate-500">Active Users</p>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">₹1.8 Cr+</p>
                <p className="text-[11px] font-medium text-slate-500">Refunds Reclaimed</p>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">4.9 / 5</p>
                <p className="text-[11px] font-medium text-slate-500">App Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: Flagship 3D Smartphone Device */}
          <div className="lg:col-span-5">
            <FlagshipPhoneMockup />
          </div>

        </div>
      </section>

      {/* 2. HERO MICRO-PREVIEWS (4-Pillar Grid) */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-4 sm:-mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          <div className="nex-micro-card p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-primary flex items-center justify-center font-bold">
                <Mic className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-primary bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                0.38s Engine
              </span>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-dark">Conversational Voice</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Natural English &amp; Hinglish input</p>
            </div>
            <div className="snippet-box">
              <div className="text-slate-400">// Audio Stream</div>
              <div className="text-emerald-400 font-semibold">"Starbucks ₹350"</div>
              <div className="text-primary mt-1">➜ &#123;"status": "Logged"&#125;</div>
            </div>
          </div>

          <div className="nex-micro-card p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-md">
                20ms Wakeup
              </span>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-dark">Passive SMS Sync</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Captures debits with 0% drain</p>
            </div>
            <div className="snippet-box">
              <div className="text-slate-400">// Bank Alert</div>
              <div className="text-amber-300 font-semibold">HDFCBK: ₹840 debited</div>
              <div className="text-purple-400 mt-1">➜ Parsed silently</div>
            </div>
          </div>

          <div className="nex-micro-card p-5 flex flex-col justify-between space-y-4 border-amber-200/80">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                RBI DPSS.629
              </span>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-dark">Legal Dispute Engine</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Recovers stuck funds in 1 tap</p>
            </div>
            <div className="snippet-box">
              <div className="text-slate-400">// Dispute Notice</div>
              <div className="text-rose-400 font-semibold">Stuck: ₹1,450 (48h+)</div>
              <div className="text-amber-400 mt-1">➜ L2 Notice Ready</div>
            </div>
          </div>

          <div className="nex-micro-card p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                100% Local
              </span>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-dark">Biometric Privacy</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Zero cloud audio upload</p>
            </div>
            <div className="snippet-box">
              <div className="text-slate-400">// On-Device Enclave</div>
              <div className="text-emerald-400 font-semibold">Apple/Android NPU</div>
              <div className="text-slate-300 mt-1">➜ 0 KB Cloud Upload</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE VOICE STUDIO */}
      <VoiceDemoStudio />

      {/* 4. 6-STAGE AUTONOMOUS INTELLIGENCE LOOP */}
      <LifecycleStepper />

      {/* 5. BENTO GRID: 4 SUPERPOWERS */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/60">
        <div className="text-left max-w-2xl space-y-3 mb-14">
          <span className="super-pill super-pill-lime uppercase tracking-wider">Engine Superpowers</span>
          <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">Engineered for Velocity &amp; Defense</h2>
          <p className="text-slateBody text-sm sm:text-base">
            Every component built with consumer privacy, sub-second latency, and legal rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* BENTO 1: Voice Engine (8 cols) */}
          <div className="md:col-span-8 super-card p-7 sm:p-9 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white via-white to-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="super-pill super-pill-blue">Neural Audio Synthesizer</span>
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">⚡ 0.38s Real-Time</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold text-dark">Instant Conversational Ledger</h3>
              <p className="text-slateBody text-sm leading-relaxed max-w-lg">
                Talk naturally in English, Hindi, or Hinglish. WhisperLedger extracts complex parameters like splits, tips, and multiple payment methods with zero voice training.
              </p>
            </div>
            
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-dark">“Booked 2 Indigo tickets for ₹11,600”</p>
                  <p className="text-[10px] text-slate-500 font-mono">Parsed: Merchant=IndiGo, Category=Travel, Amount=11600</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                Auto-Logged ✓
              </span>
            </div>
          </div>

          {/* BENTO 2: 100% On-Device Privacy (4 cols) */}
          <div className="md:col-span-4 super-card p-7 sm:p-9 flex flex-col justify-between space-y-6 bg-white">
            <div className="flex items-center justify-between">
              <span className="super-pill super-pill-lime">On-Device Enclave</span>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-dark">Zero Cloud Audio Leak</h3>
              <p className="text-slateBody text-xs sm:text-sm leading-relaxed">
                Voice audio is processed directly on your device's neural engine. No recordings are ever uploaded to cloud servers.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Biometric Face ID Protected
              </span>
            </div>
          </div>

          {/* BENTO 3: Passive SMS Watchdog (4 cols) */}
          <div className="md:col-span-4 super-card p-7 sm:p-9 flex flex-col justify-between space-y-6 bg-white">
            <div className="flex items-center justify-between">
              <span className="super-pill super-pill-amber">Passive SMS Watchdog</span>
              <span className="text-[10px] font-mono font-bold text-slate-500">0% Battery Drain</span>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-dark">Silent Bank SMS Capture</h3>
              <p className="text-slateBody text-xs sm:text-sm leading-relaxed">
                Wakes for just 20 milliseconds when an official bank SMS arrives. Captures UPI and Card debits silently without opening the app.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-purple-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> OTPs 100% Filtered &amp; Ignored
              </span>
            </div>
          </div>

          {/* BENTO 4: Legal Dispute Engine (8 cols) */}
          <div className="md:col-span-8 super-card p-7 sm:p-9 flex flex-col justify-between space-y-6 border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/30">
            <div className="flex items-center justify-between">
              <span className="super-pill super-pill-amber">Statutory Defense</span>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md">RBI TAT DPSS.629</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold text-dark">Autonomous Money Recovery Engine</h3>
              <p className="text-slateBody text-sm leading-relaxed max-w-lg">
                When e-commerce, food delivery, or airline refunds are stuck past 48 hours, WhisperLedger compiles transaction UTRs, timestamps, and statutory interest clauses into formal legal notices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-dark">Level-2 / Level-3 Legal Notice</p>
                  <p className="text-[10px] text-slate-500">Statutory interest penalties cited</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-dark">1-Tap WhatsApp &amp; Email Dispatch</p>
                  <p className="text-[10px] text-slate-500">Sent directly to bank nodal desk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON SECTION: WITHOUT VS WITH */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/60">
        <div className="text-left max-w-2xl space-y-3 mb-12">
          <span className="super-pill super-pill-lime uppercase tracking-wider">The Difference</span>
          <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">Old Manual Chaos vs Autonomous Intelligence</h2>
          <p className="text-slateBody text-sm sm:text-base">
            See why spreadsheets and ordinary tracker apps leave you frustrated, drained, and out of pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch text-left">
          {/* Without */}
          <div className="super-card p-6 sm:p-9 flex flex-col justify-between space-y-6 border-rose-200 bg-rose-50/10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-extrabold text-dark">Without WhisperLedger</h3>
                  <p className="text-xs text-rose-600 font-semibold mt-0.5">Manual, Fragmented &amp; Unprotected</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <X className="w-5 h-5" />
                </span>
              </div>

              <ul className="space-y-4 mt-6 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <div>
                    <strong className="font-bold text-dark block">Tedious Manual Entry</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">Typing every single receipt into Excel. Quick cash debits and small UPI scans get forgotten daily.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <div>
                    <strong className="font-bold text-dark block">Lost Stuck Refunds</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">Delayed merchant refunds quietly slip through the cracks, costing you ₹1,500+ every single month.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <div>
                    <strong className="font-bold text-dark block">Cloud Privacy Exposure</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">Traditional tracker apps upload raw unencrypted SMS records and audio clips to remote third-party servers.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-200/60">
              <span className="text-xs font-mono font-bold text-rose-600">Average Loss: ₹18,000+/year &amp; 30+ hours wasted</span>
            </div>
          </div>

          {/* With */}
          <div className="super-card p-6 sm:p-9 flex flex-col justify-between space-y-6 border-primary/40 bg-gradient-to-b from-white to-primary/5">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-primary/20">
                <div>
                  <h3 className="text-xl font-extrabold text-dark">With WhisperLedger</h3>
                  <p className="text-xs text-primary font-semibold mt-0.5">Instant Voice, On-Device &amp; RBI Shielded</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              </div>

              <ul className="space-y-4 mt-6 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="font-bold text-dark block">0.38s Ambient Voice Logging</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">Speak naturally in English, Hindi, or Hinglish. Automatically structured and categorized in 0.38s.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="font-bold text-dark block">Autonomous Money Recovery</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">Level-2 dispute letters citing RBI DPSS.629 rules dispatched directly to bank nodal desks with 1 tap.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="font-bold text-dark block">100% On-Device Neural Privacy</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">Speech models run locally on your phone's neural engine. Zero audio recordings leave your device.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-primary/20">
              <span className="text-xs font-mono font-bold text-emerald-600">Reclaimed: Up to ₹18,850/year back in your account</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MONEY RECOVERY 3-PHASE CASE STUDY */}
      <section id="recovery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-200/60">
        <div className="text-left max-w-2xl space-y-3 mb-12">
          <span className="super-pill super-pill-amber uppercase tracking-wider">Live Simulation</span>
          <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">See Money Recovery in Action</h2>
          <p className="text-slateBody text-sm sm:text-base">Click through the 3 phases of recovering a stuck ₹1,450 refund:</p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mb-8 text-xs font-bold">
          <button 
            onClick={() => setRecoveryPhase('step1')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer text-center shadow-xs ${
              recoveryPhase === 'step1'
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-primary'
            }`}
          >
            1. Auto-Detection
          </button>
          <button 
            onClick={() => setRecoveryPhase('step2')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer text-center shadow-xs ${
              recoveryPhase === 'step2'
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-primary'
            }`}
          >
            2. Legal Notice
          </button>
          <button 
            onClick={() => setRecoveryPhase('step3')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer text-center shadow-xs ${
              recoveryPhase === 'step3'
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-primary'
            }`}
          >
            3. Refund Credited
          </button>
        </div>

        <div className="super-card p-6 sm:p-10 border-amber-200 max-w-2xl bg-gradient-to-b from-white to-amber-50/20 shadow-lg text-left">
          {recoveryPhase === 'step1' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="super-pill super-pill-amber">Step 1: Auto-Detection</span>
                <span className="text-xs text-rose-600 font-bold">Awaiting Merchant Resolution</span>
              </div>
              <h4 className="text-lg font-bold text-dark">Stuck Refund Identified (#429188)</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Swiggy order #8192 was canceled, but ₹1,450 remained debited past the 48-hour RBI turnaround threshold. The engine flag triggers automatically.
              </p>
            </div>
          )}

          {recoveryPhase === 'step2' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="super-pill super-pill-blue">Step 2: Legal Notice Assembly</span>
                <span className="text-xs text-primary font-bold">Level-2 Statutory Notice Ready</span>
              </div>
              <h4 className="text-lg font-bold text-dark">Formal Demand citing RBI DPSS.629</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dossier compiled with transaction UTR #42918829, timestamp, merchant order ID, and RBI statutory penalty clauses. Ready to dispatch via WhatsApp and Email in 1 tap.
              </p>
            </div>
          )}

          {recoveryPhase === 'step3' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="super-pill super-pill-lime">Step 3: Refund Credited</span>
                <span className="text-xs text-emerald-600 font-bold">Dispute Resolved</span>
              </div>
              <h4 className="text-lg font-bold text-dark">₹1,450 Restored into Bank Account</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Incoming bank reversal matching UTR #429188 detected. Dispute auto-closed. Total turnaround: 31 hours instead of 14 business days.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 8. INTERACTIVE SIMULATORS (3-Way Ledger & Debt Simplifier) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/60">
        <div className="text-left max-w-2xl space-y-3 mb-10">
          <span className="super-pill super-pill-blue uppercase tracking-wider">Household Math Engine</span>
          <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">True Consumption &amp; Debt Simplification</h2>
          <p className="text-slateBody text-sm sm:text-base">
            Isolate what you genuinely spent from reimbursements, and settle multi-person household debts in minimum transactions.
          </p>
        </div>
        <div className="space-y-12">
          <OutflowSimulator />
          <DebtSimplifierDemo />
        </div>
      </section>

      {/* 9. FINANCIAL ROI CALCULATOR */}
      <RoiCalculator />

      {/* 10. TRANSPARENT PRICING */}
      <PricingSection />

      {/* 11. FAQ ACCORDION */}
      <FaqSection />

      {/* 12. BOTTOM CTA */}
      <section id="download" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-14 bg-dark text-white text-left space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/30 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-accentLime/20 blur-3xl pointer-events-none"></div>

          <div className="space-y-2 max-w-xl relative z-10">
            <span className="super-pill super-pill-lime">Get Started in 10 Seconds</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight pt-1">
              Experience Financial Command
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Download WhisperLedger now. Start logging by voice and recovering stuck refunds in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 relative z-10">
            <a 
              href="https://github.com/WhisperLedger/whisperledger-frontend/releases" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-super-primary !py-3.5 !px-7 text-sm"
            >
              <Download className="w-5 h-5" />
              <span>Download Android APK (v1.0)</span>
            </a>
            <a 
              href="https://github.com/WhisperLedger" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-super-secondary !py-3.5 !px-7 text-sm !bg-slate-900 !text-white !border-slate-800 hover:!bg-slate-800"
            >
              <Play className="w-5 h-5 text-emerald-400" />
              <span>Explore GitHub Repository</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 relative z-10">7-Day Free Trial on Pro • No credit card required</p>
        </div>
      </section>

    </div>
  );
};
