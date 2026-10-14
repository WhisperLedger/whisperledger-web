import React, { useState } from 'react';
import { 
  ArrowRight, Check, Clock3, LockKeyhole, Mic, ReceiptText, 
  UsersRound, Download, ShieldCheck, Sparkles, Smartphone,
  Zap, ArrowDown, ChevronRight, HelpCircle
} from 'lucide-react';
import { ProductShowcase } from '../components/ProductShowcase';

const features = [
  {
    icon: Mic,
    tag: 'Daily Tracker',
    title: 'Review-first personal ledger',
    copy: 'Log expenses in 3 seconds via voice or quick entry. Optional UPI transaction alerts wait for your 1-tap review before joining your permanent books.',
  },
  {
    icon: UsersRound,
    tag: 'Household Spaces',
    title: 'Split flat rent, bills & groceries',
    copy: 'Run shared expenses for flats and families without awkward reminders. View running balances, approve split requests, and settle up cleanly.',
  },
  {
    icon: ReceiptText,
    tag: 'Refund Watchdog',
    title: 'Never lose a cancelled refund',
    copy: 'Track returns, Swiggy order cancellations, and airline reversals with expected dates and support notes right beside your transaction timeline.',
  },
];

const faqs = [
  ['How is WhisperLedger different from traditional expense managers?', 'Traditional apps either demand your sensitive netbanking credentials or dump unformatted raw bank alerts into messy categories. WhisperLedger uses a review-first architecture: nothing enters your books without your 1-tap confirmation, and your bank passwords are never requested.'],
  ['Is the Android APK safe to install?', 'Yes. The APK is built directly from our open TypeScript and React Native codebase, signed with production certificates, and contains zero advertising SDKs or third-party tracking scripts.'],
  ['How does household expense splitting work?', 'You can invite flatmates or family members to a shared Household Space. When anyone logs a shared expense (like flat rent or groceries), members can split equally or by custom amounts and settle debts with one click.'],
  ['Are my SMS messages or bank details uploaded to the cloud?', 'No. SMS parsing runs 100% on-device. Your personal messages, OTPs, and bank balances are never uploaded to any server. Only transactions you explicitly confirm are stored in your secure PostgreSQL ledger.'],
  ['When is the official Play Store and iOS release?', 'The production Android APK (v1.0.0) is available now for direct download on this site. Google Play Store and iOS App Store releases are scheduled following our private beta rollout across India.'],
];

export const LandingPage: React.FC = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim() && waitlistEmail.includes('@')) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#fafafc] text-[#16181d]">
      {/* Launch Banner */}
      <div className="bg-[#16181d] text-white py-2.5 px-4 text-center text-xs border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium text-[11px] border border-blue-400/30">
            <Sparkles className="w-3 h-3 text-blue-400" /> PRODUCT LAUNCH 2026
          </span>
          <span className="text-slate-300">
            WhisperLedger Android Release v1.0.0 is live for early access in India.
          </span>
          <a href="#download" className="font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 ml-1">
            Get the APK →
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-20 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Available for Android • Built for Indian Everyday Spending</span>
            </div>

            <h1 className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[1.02] tracking-[-0.05em] font-extrabold text-[#111216]">
              Your day-to-day money, finally in order.
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#5a5c66] max-w-lg">
              A review-first personal ledger built for India. Log cashflow in seconds, manage flatmate splits cleanly, and recover pending e-commerce refunds—without bank logins or spreadsheet anxiety.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <a 
                href="/downloads/whisperledger-v1.0.0.apk"
                download="WhisperLedger-v1.0.0.apk"
                className="inline-flex justify-center items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition shadow-lg shadow-blue-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Android APK (v1.0.0)</span>
              </a>

              <a 
                href="#how-it-works" 
                className="inline-flex justify-center items-center gap-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 transition"
              >
                <span>Explore Architecture</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Sub-hero trust bullets */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Zero bank passwords
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> 100% on-device SMS review
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Standalone 79 MB release
              </span>
            </div>
          </div>

          {/* Interactive Phone Mockup */}
          <ProductShowcase />
        </div>
      </section>

      {/* Trust & Spec Bar */}
      <section className="border-y border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 grid sm:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">Zero Account Linking</p>
              <p className="text-[11px] text-slate-500 mt-0.5">No netbanking credentials or aggregator sync required.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Check className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">Review-First Verification</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Transactions wait for your 1-tap confirmation before saving.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <UsersRound className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">Separate Household Spaces</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Personal spending remains private; shared bills stay visible.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <ReceiptText className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">Pending Refund Watchdog</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Monitors Swiggy, Amazon & IRCTC returns until credited.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Core Product Pillars */}
      <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest font-bold text-blue-600">Product Pillars</p>
          <h2 className="mt-3 text-3xl sm:text-4xl leading-tight tracking-tight font-extrabold text-slate-950">
            Engineered for the realities of Indian cash flow.
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            From quick chai payments to split flat rent and delayed refund reversals, WhisperLedger bridges the gap between chaotic bank alerts and structured accounting.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, tag, title, copy }) => (
            <article 
              key={title} 
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold mb-4">
                  <Icon className="w-3.5 h-3.5 text-blue-600" /> {tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Step-by-Step Architecture Section */}
      <section id="how-it-works" className="bg-[#12141c] text-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-blue-400">Three Clear Steps</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">How WhisperLedger Works</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Designed around deliberate review, transparent room sharing, and instant ledger reconciliations.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-blue-400">01 / CAPTURE</span>
              <h3 className="text-lg font-bold text-white">Log via Voice or 1-Tap</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add an expense in English or Hindi by voice, or let optional on-device SMS parsing queue bank and UPI transactions ready for confirmation.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-blue-400">02 / SEPARATE</span>
              <h3 className="text-lg font-bold text-white">Personal vs Household</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your personal ledger remains completely private. Shared apartment rent, utilities, and grocery bills live in a dedicated collaborative space.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-blue-400">03 / SETTLE</span>
              <h3 className="text-lg font-bold text-white">Recover & Balance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                See exact net balances across flatmates with 1-click settlement, while the Refund Watchdog keeps tabs on delayed merchant reversals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-bold text-blue-600">Launch Pricing</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Transparent, predictable access.
          </h2>
          <p className="mt-2 text-xs text-slate-600">
            No advertisements. No monetizing your transaction history. Just straightforward software.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Starter Edition</span>
              <p className="text-3xl font-extrabold text-slate-950 mt-4">₹0 <span className="text-xs font-normal text-slate-500">/ free forever</span></p>
              <p className="text-xs text-slate-600 mt-2">Personal day-to-day ledger for individuals.</p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Unlimited personal expense logs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Voice note transcription
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> On-device SMS expense review
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 1 Household space with up to 3 members
                </li>
              </ul>
            </div>

            <a
              href="#download"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 font-semibold text-xs text-slate-800 transition"
            >
              Get Free APK
            </a>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#12141c] text-white p-7 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
              LAUNCH PROMO
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Pro Edition</span>
              <p className="text-3xl font-extrabold text-white mt-4">₹799 <span className="text-xs font-normal text-slate-400">/ year</span></p>
              <p className="text-xs text-slate-400 mt-2">Comprehensive suite for shared flats, power users & refund management.</p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Everything in Starter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Unlimited Household Spaces & flatmates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> E-Commerce Refund Watchdog & reminders
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Automated monthly PDF & CSV statements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Priority cloud sync & encrypted backups
                </li>
              </ul>
            </div>

            <a
              href="#download"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white transition shadow-md shadow-blue-500/20"
            >
              Join Pro Early Access
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 border-t border-slate-200/80">
        <p className="text-xs uppercase tracking-widest font-bold text-blue-600">Frequently Asked Questions</p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950 tracking-tight">Everything you need to know.</h2>

        <div className="mt-10 divide-y divide-slate-200">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-4">
              <summary className="cursor-pointer list-none flex justify-between gap-4 text-sm font-semibold text-slate-900">
                <span>{question}</span>
                <span className="text-blue-600 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="pt-2 text-xs leading-relaxed text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Download & Launch CTA Section */}
      <section id="download" className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="rounded-3xl bg-[#12141c] text-white p-8 sm:p-14 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-semibold border border-blue-400/20">
              <Smartphone className="w-3.5 h-3.5" /> Android APK Release Available
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Start logging your spending today.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Download the official production APK build directly to your phone. Zero setup friction, zero ad networks, 100% private.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/downloads/whisperledger-v1.0.0.apk"
                download="WhisperLedger-v1.0.0.apk"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download APK (v1.0.0 • 79.1 MB)</span>
              </a>

              <a
                href="https://whisperledger.in"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-semibold transition"
              >
                <span>Share whisperledger.in</span>
              </a>
            </div>

            {/* Quick 3-Step Install Guide */}
            <div className="mt-8 pt-8 border-t border-slate-800 grid sm:grid-cols-3 gap-4 text-left">
              <div className="p-3.5 rounded-xl bg-[#161922] border border-slate-800/80">
                <span className="font-mono text-blue-400 text-[10px] font-bold">STEP 1</span>
                <p className="text-xs font-semibold text-white mt-1">Download APK</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Click the download button above to get the standalone release file.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161922] border border-slate-800/80">
                <span className="font-mono text-blue-400 text-[10px] font-bold">STEP 2</span>
                <p className="text-xs font-semibold text-white mt-1">Allow Installation</p>
                <p className="text-[11px] text-slate-400 mt-0.5">When prompted by Android, tap "Allow install from this source".</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161922] border border-slate-800/80">
                <span className="font-mono text-blue-400 text-[10px] font-bold">STEP 3</span>
                <p className="text-xs font-semibold text-white mt-1">Open & Review</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Launch WhisperLedger, register an account, and experience review-first tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
