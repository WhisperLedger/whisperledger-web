import React from 'react';
import { 
  Sparkles, Shield, Smartphone, ArrowRight, CheckCircle2, 
  TrendingDown, RefreshCw, Download
} from 'lucide-react';
import { OutflowSimulator } from '../components/OutflowSimulator';
import { DebtSimplifierDemo } from '../components/DebtSimplifierDemo';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-28 py-12">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Wealth OS
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Money Autopilot for <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Shared & Personal Living.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Stop losing money to forgotten IOUs, unbalanced flatmate splits, and hidden leaks. 
          WhisperLedger automatically intercepts UPI SMS on-device, isolates true consumption, and simplifies household debts with mathematical certainty.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/Agarwal16/whisperledger-frontend/releases"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Android APK (v1.0)</span>
          </a>

          <a
            href="#simulator"
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <span>Explore 3-Way Engine</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* Live Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl glass-card border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">On-Device Privacy</div>
          </div>
          <div className="p-4 rounded-xl glass-card border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">0ms</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Native SMS Detection</div>
          </div>
          <div className="p-4 rounded-xl glass-card border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹0</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Forgotten IOU Losses</div>
          </div>
          <div className="p-4 rounded-xl glass-card border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">&lt; 15ms</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Go API Response Time</div>
          </div>
        </div>
      </section>

      {/* Feature Pillar 1: 3-Way Outflow Simulator */}
      <section id="simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <OutflowSimulator />
      </section>

      {/* Feature Pillar 2: Household Debt Simplifier */}
      <section id="debt-graph" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <DebtSimplifierDemo />
      </section>

      {/* 4 Core Pillars Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Built for Modern Living</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Beyond Standard Budgeting: 4 Pillars of Autonomous Wealth
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card-hover p-8 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Instant On-Device SMS Telemetry</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              WhisperLedger’s native Kotlin Android module parses incoming bank debits in real time with 0 background lag. Non-transactional OTPs are discarded locally without ever leaving your device.
            </p>
          </div>

          <div className="glass-card-hover p-8 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Money Recovery Engine</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Lending money to friends or waiting on security deposits? WhisperLedger tracks every recoverable rupee, generating one-tap friendly WhatsApp reminders and auto-settling when refunds arrive.
            </p>
          </div>

          <div className="glass-card-hover p-8 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Money Leak Detective</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Identifies duplicate vendor charges within 24 hours, creeping recurring subscriptions, and unsettled roommate loans before they slip through the cracks of your monthly cash flow.
            </p>
          </div>

          <div className="glass-card-hover p-8 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Biometric Vault & Go Security</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every sensitive financial action is guarded by Android Biometric Prompt (FaceID/Fingerprint) with hardware Keystore isolation and high-entropy Argon2 password hashing on the Go backend.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-8 border border-slate-800 overflow-x-auto">
          <h3 className="text-xl font-bold text-white mb-6">Why WhisperLedger Outperforms Legacy Tools</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="pb-4 font-semibold">Feature Dimension</th>
                <th className="pb-4 font-semibold text-slate-500">Splitwise / Walnut</th>
                <th className="pb-4 font-semibold text-cyan-400">WhisperLedger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              <tr>
                <td className="py-4">Ledger Philosophy</td>
                <td className="py-4 text-slate-500">Treats all transfers as pure expense</td>
                <td className="py-4 text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 3-Way Outflow Isolation
                </td>
              </tr>
              <tr>
                <td className="py-4">Real-Time SMS Capture</td>
                <td className="py-4 text-slate-500">Delayed / cloud uploads required</td>
                <td className="py-4 text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 0ms Native Kotlin Hook
                </td>
              </tr>
              <tr>
                <td className="py-4">Multi-person Debt Resolution</td>
                <td className="py-4 text-slate-500">Endless pairwise transactions</td>
                <td className="py-4 text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Minimum-Cash-Flow Graph
                </td>
              </tr>
              <tr>
                <td className="py-4">Backend Performance</td>
                <td className="py-4 text-slate-500">Monolithic slow sync</td>
                <td className="py-4 text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Go 1.24 + PostgreSQL Pool
                </td>
              </tr>
              <tr>
                <td className="py-4">Data Privacy</td>
                <td className="py-4 text-slate-500">Ad trackers & credit score upselling</td>
                <td className="py-4 text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero Ads, 100% Autonomous
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="glass-card rounded-3xl p-10 border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-slate-900 relative overflow-hidden shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-white">Take Total Control of Your Wealth</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-3">
            Deploy WhisperLedger on your phone, invite your household, and experience autonomous clarity.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://github.com/Agarwal16/whisperledger-frontend/releases"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download WhisperLedger APK</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
