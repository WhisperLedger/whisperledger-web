import React from 'react';
import { ArrowRight, Check, Clock3, LockKeyhole, Mic, ReceiptText, UsersRound } from 'lucide-react';
import { ProductShowcase } from '../components/ProductShowcase';

const features = [
  {
    icon: Mic,
    title: 'Keep your daily ledger current',
    copy: 'Add an expense manually or by voice. Optional SMS captures wait for your review before they become transactions.',
  },
  {
    icon: UsersRound,
    title: 'Run a shared household clearly',
    copy: 'Create a household for rent, groceries, bills and help. See balances, approve split requests and settle up in one place.',
  },
  {
    icon: ReceiptText,
    title: 'Follow up on money owed back',
    copy: 'Track returns, cancelled orders and reversals with their expected dates and support context beside your spending record.',
  },
];

const faqs = [
  ['When will the app be available?', 'WhisperLedger is currently preparing for launch. Join the product journey through this site and check back for the first release.'],
  ['Will I have to enable SMS access?', 'No. SMS capture will remain optional. You will be able to track everything manually or with voice input instead.'],
  ['Will I be able to review an automatic entry?', 'Yes. Captured transactions are designed to wait for review and correction before they are included in your ledger.'],
  ['Is this financial or legal advice?', 'No. WhisperLedger helps organise your information; it does not provide banking, investment, tax, or legal advice.'],
];

export const LandingPage: React.FC = () => {
  return (
  <div className="relative overflow-hidden bg-[#fbfbfc] text-[#17171b]">
    <div className="premium-grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
    <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
      <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-20 items-center">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">WhisperLedger</p>
          <h1 className="mt-5 text-[clamp(2.8rem,6vw,5.35rem)] leading-[.98] tracking-[-0.06em] font-semibold text-[#17171b]">
            Your day-to-day money, in order.
          </h1>
          <p className="mt-7 text-lg sm:text-xl leading-relaxed text-[#65656d] max-w-lg">
            WhisperLedger is preparing a calmer way for people and shared homes to log what happened, review captures, split shared costs, and follow what is still due back.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href="#download" className="inline-flex justify-center items-center gap-2 rounded-full bg-[#17171b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#34343b]">
              See what’s coming <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#how-it-works" className="inline-flex justify-center items-center gap-2 rounded-full border border-[#dedee5] bg-white px-6 py-3.5 text-sm font-semibold text-[#35353c] transition hover:border-[#aaaab5]">
              See how it works
            </a>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#8a8a94]">Coming soon for Android. Voice and SMS capture will be optional; you choose what is saved.</p>
        </div>

        <ProductShowcase />
      </div>
    </section>

    <section className="border-y border-[#e9e9ee] bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid sm:grid-cols-3 gap-8">
        {['A daily ledger—not a budget spreadsheet', 'Personal and household money, separated', 'Every capture reviewed before it counts'].map((item, index) => (
          <div key={item} className="flex gap-4 items-start">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-xs font-semibold text-[#6157df]">0{index + 1}</span>
            <p className="pt-1 text-sm font-medium text-[#404048]">{item}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">Made for the gaps between transactions</p>
        <h2 className="mt-4 text-4xl sm:text-5xl leading-tight tracking-[-.05em] font-semibold">A clearer operating system for everyday money.</h2>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-px overflow-hidden rounded-[1.5rem] border border-[#e7e7ec] bg-[#e7e7ec]">
        {features.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="bg-white p-7 sm:p-8 min-h-[250px] flex flex-col justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f2ff] text-[#6157df]"><Icon className="w-5 h-5" /></span>
            <div><h3 className="text-xl tracking-[-.03em] font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#6c6c75]">{copy}</p></div>
          </article>
        ))}
      </div>
      <p className="mt-10 max-w-2xl border-l-2 border-[#6157df] pl-6 sm:pl-8 text-lg sm:text-xl leading-relaxed tracking-[-.03em] text-[#4c4b55]">For personal use, it replaces scattered notes. For a shared home, it gives everyone one current source of truth—without blending private spending into the group ledger.</p>
    </section>

    <section id="how-it-works" className="bg-[#17171b] text-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#bdb8ff]">A simple rhythm</p>
        <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl leading-tight tracking-[-.05em] font-semibold">Log it. Review it. Know where things stand.</h2>
        <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-16">
          {[
            ['01', 'Log', 'Use a quick manual entry or voice. If you opt into SMS capture, new entries wait for your confirmation.'],
            ['02', 'Separate', 'Keep your own transactions in Personal, while household spend, splits and balances live in their own space.'],
            ['03', 'Resolve', 'See pending refunds and household balances at a glance, then follow up or settle when the time is right.'],
          ].map(([number, title, copy]) => <div key={number} className="border-t border-white/15 pt-5"><p className="text-xs text-[#bdb8ff]">{number}</p><h3 className="mt-8 text-2xl font-medium tracking-[-.04em]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{copy}</p></div>)}
        </div>
      </div>
    </section>

    <section id="recovery" className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="rounded-[1.75rem] bg-[#eeedf9] p-7 sm:p-10">
        <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">Privacy by choice</p>
        <LockKeyhole className="mt-10 w-8 h-8 text-[#6157df]" />
        <h2 className="mt-6 text-3xl sm:text-4xl tracking-[-.05em] font-semibold">Use only the tools you need.</h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#666671]">SMS, voice, notifications, and sync are all optional. The app explains why a permission is useful before you turn it on.</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">Keep a thread on refunds</p>
        <h2 className="mt-4 text-4xl sm:text-5xl leading-tight tracking-[-.05em] font-semibold">Make pending money visible.</h2>
        <p className="mt-6 text-base leading-relaxed text-[#686871]">Returns, cancellations and reversals should not disappear into a transaction list. Keep the amount, expected date and supporting notes together until the money comes back.</p>
        <ul className="mt-8 space-y-4 text-sm text-[#45454e]">{['Tie a refund to the purchase it came from', 'Keep support notes and promised dates together', 'Export the details when you need them'].map(item => <li key={item} className="flex gap-3"><Check className="w-5 h-5 text-[#6157df] shrink-0" />{item}</li>)}</ul>
      </div>
    </section>

    <section className="border-y border-[#e7e7ec] bg-[#f5f4fb] py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">One product, two clear contexts</p>
        <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl leading-tight tracking-[-.05em] font-semibold">Useful whether the money is yours, shared, or on its way back.</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-4xl">
          <article className="rounded-[1.5rem] bg-white p-7 sm:p-8 shadow-[0_16px_35px_-26px_rgba(28,25,46,.28)]"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#6157df]">For your own spending</p><h3 className="mt-5 text-2xl tracking-[-.04em] font-semibold">Stop reconstructing the day from bank messages.</h3><p className="mt-4 text-sm leading-relaxed text-[#696873]">Use Daily Tracker to log spending in the moment, review optional captures and keep a usable record of what actually happened.</p></article>
          <article className="rounded-[1.5rem] bg-[#17171b] p-7 sm:p-8 text-white shadow-[0_16px_35px_-26px_rgba(28,25,46,.35)]"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#c4bfff]">For flats and shared homes</p><h3 className="mt-5 text-2xl tracking-[-.04em] font-semibold">Keep shared spending out of the group chat.</h3><p className="mt-4 text-sm leading-relaxed text-white/60">Create a separate Household Space for rent, groceries and bills, then make balances and settlements visible to the people involved.</p></article>
        </div>
      </div>
    </section>

    <section id="pricing" className="border-y border-[#e7e7ec] bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl"><p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">Planned pricing</p><h2 className="mt-4 text-4xl sm:text-5xl tracking-[-.05em] font-semibold">A simple launch plan, with more to come.</h2><p className="mt-4 text-sm leading-relaxed text-[#73737d]">Pricing is shared as an early indication and may evolve before the app launches.</p></div>
        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-3xl">
          <div className="rounded-2xl border border-[#e5e5eb] p-7"><p className="font-semibold">Starter</p><p className="mt-5 text-4xl tracking-[-.05em] font-semibold">₹0</p><p className="mt-2 text-sm text-[#73737d]">A planned personal ledger for everyday spending, available at launch.</p><a href="#download" className="mt-8 inline-flex text-sm font-semibold underline underline-offset-4">See launch status</a></div>
          <div className="rounded-2xl bg-[#17171b] p-7 text-white"><p className="font-semibold">Pro</p><p className="mt-5 text-4xl tracking-[-.05em] font-semibold">₹799 <span className="text-sm text-white/50">/ year</span></p><p className="mt-2 text-sm text-white/60">A planned option for deeper recovery, export and control tools once the product is available.</p><a href="#download" className="mt-8 inline-flex text-sm font-semibold text-[#d2ceff] underline underline-offset-4">See launch status</a></div>
        </div>
      </div>
    </section>

    <section id="faq" className="max-w-3xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#6157df]">Questions, answered</p>
      <h2 className="mt-4 text-4xl sm:text-5xl tracking-[-.05em] font-semibold">The important things.</h2>
      <div className="mt-12 divide-y divide-[#e4e4ea]">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none flex justify-between gap-6 text-base font-medium">{question}<span className="text-[#6157df] group-open:rotate-45 transition-transform">+</span></summary><p className="pt-3 max-w-xl text-sm leading-relaxed text-[#696973]">{answer}</p></details>)}</div>
    </section>

    <section id="download" className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
      <div className="rounded-[2rem] bg-[#6157df] px-7 py-12 sm:p-16 text-center text-white"><p className="text-xs uppercase tracking-[0.16em] font-bold text-white/65">WhisperLedger is coming soon</p><h2 className="mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl tracking-[-.05em] font-semibold">A clearer home for spending, shared costs and money still due back.</h2><div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#24232d]"><Clock3 className="w-4 h-4" /> Android launch in preparation</div><p className="mt-4 text-xs text-white/60">We are completing security, reliability and launch-readiness work before opening the app.</p></div>
    </section>
  </div>
  );
};
