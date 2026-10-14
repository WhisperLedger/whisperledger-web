import React, { useState } from 'react';
import { ArrowRight, BellRing, Check, Clock3, LockKeyhole, Mail, Mic, ReceiptText, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { ProductShowcase } from '../components/ProductShowcase';

const features = [
  { icon: Mic, eyebrow: 'Capture', title: 'A ledger that keeps pace with the day', copy: 'Add spending manually or by voice. Optional SMS captures wait for your review before they count.' },
  { icon: UsersRound, eyebrow: 'Share', title: 'A clearer space for shared money', copy: 'Keep rent, groceries, bills and balances visible without mixing a household with private spending.' },
  { icon: ReceiptText, eyebrow: 'Recover', title: 'Keep pending money from disappearing', copy: 'Follow refunds, cancellations and amounts owed beside the purchase that created them.' },
];

const launchSteps = [
  ['01', 'Capture with context', 'Record a moment while it is fresh, then adjust details when you have them.'],
  ['02', 'Review before it counts', 'Optional assisted captures remain clear and reviewable, never hidden in the background.'],
  ['03', 'See what still needs attention', 'Separate personal spending, shared balances and pending returns in one calm view.'],
];

const faqs = [
  ['When will WhisperLedger be available?', 'WhisperLedger is preparing for its public Android launch. We are finalizing end-to-end security audits, PostgreSQL data partitioning, and offline sync guarantees before opening the release.'],
  ['Will I need to enable SMS permissions?', 'No. SMS auto-fill is 100% optional. Full voice logging and manual expense entry operate completely without any SMS permissions.'],
  ['How does WhisperLedger protect my financial privacy?', 'Your financial records belong exclusively to you. We do not sell data to credit bureaus, show ads, or scrape bank accounts without explicit user confirmation.'],
  ['Is WhisperLedger built specifically for India?', 'Yes. WhisperLedger is engineered with native support for INR (₹), UPI transactional SMS parsing (HDFC, SBI, ICICI, Axis, Paytm, PhonePe, Cred), and household split calculations.'],
];

export const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      const existing = JSON.parse(localStorage.getItem('whisperledger_waitlist') || '[]');
      existing.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('whisperledger_waitlist', JSON.stringify(existing));
    } catch {}
    setSubmitted(true);
  };

  return (
    <div className="landing-page relative overflow-hidden bg-[#fbfcff] text-[#101827]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_74%_24%,rgba(0,102,255,.12),transparent_27%),radial-gradient(circle_at_18%_12%,rgba(139,92,246,.09),transparent_24%)]" aria-hidden="true" />

      {/* Launch Banner */}
      <section className="relative border-b border-[#e8edf5] bg-white/75 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2.5 text-center text-xs font-medium text-slate-600 sm:px-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0066ff] animate-ping" />
          <span className="font-semibold text-slate-800">WhisperLedger for Android</span> is preparing for public launch.
          <a href="#early-access" className="font-semibold text-[#005fd6] hover:underline ml-1">Request early access →</a>
        </div>
      </section>

      <main>
        {/* Hero Section */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe8ff] bg-[#f2f7ff] px-3 py-1.5 text-xs font-bold text-[#005fd6]">
              <Sparkles className="h-3.5 w-3.5" /> Coming Soon to Android
            </div>
            <h1 className="mt-7 text-[clamp(3.1rem,6.4vw,5.8rem)] font-semibold leading-[.93] tracking-[-.07em] text-[#101827]">
              Keep money clear.<br /><span className="text-[#0066ff]">Not complicated.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
              WhisperLedger brings daily spending, shared costs and pending money together in one considered ledger—without turning your finances into another full-time task.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#early-access" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101827] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#263246]">
                Request early access <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                Explore the platform
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Manual-first by design</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Optional assisted capture</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Engineered for India</span>
            </div>
          </div>
          <div className="relative min-h-[500px] sm:min-h-[590px]">
            <div className="absolute left-0 top-12 hidden w-40 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_18px_45px_-24px_rgba(15,23,42,.35)] backdrop-blur md:block">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-slate-400">Designed to be</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-slate-800">Private by default.<br />Useful by choice.</p>
            </div>
            <ProductShowcase />
            <div className="absolute bottom-7 right-0 rounded-2xl border border-[#dbe8ff] bg-[#f7faff]/95 px-4 py-3 shadow-[0_18px_45px_-24px_rgba(0,102,255,.32)] backdrop-blur sm:right-5">
              <p className="flex items-center gap-1.5 text-xs font-bold text-[#005fd6]"><Clock3 className="h-3.5 w-3.5" /> Launch status</p>
              <p className="mt-1 text-xs text-slate-500 font-medium">Coming Soon</p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="border-y border-[#e7edf6] bg-white" aria-label="WhisperLedger principles">
          <div className="mx-auto grid max-w-6xl divide-y divide-[#e7edf6] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {[
              ['One record', 'Your day-to-day money in a single considered place.'],
              ['Two contexts', 'Personal and shared spending stay meaningfully separate.'],
              ['No hidden actions', 'Assisted captures are visible before they affect your ledger.'],
            ].map(([title, copy]) => (
              <div key={title} className="py-7 sm:px-7 sm:py-9 first:sm:pl-0 last:sm:pr-0">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">What WhisperLedger brings together</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.055em] text-[#101827] sm:text-5xl">
              The essential views of everyday money, without the noise.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, eyebrow, title, copy }) => (
              <article key={title} className="group min-h-[285px] rounded-[1.5rem] border border-[#e5ebf4] bg-white p-7 shadow-[0_16px_40px_-32px_rgba(15,23,42,.25)] transition duration-300 hover:-translate-y-1 hover:border-[#cfe1ff] hover:shadow-[0_24px_50px_-28px_rgba(0,102,255,.2)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0066ff]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-12 text-xs font-bold uppercase tracking-[.13em] text-[#0066ff]">{eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.035em] text-[#172033]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-[#111b2e] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8cc1ff]">A clear rhythm</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-.055em] sm:text-5xl">
              Capture less friction. Keep more context.
            </h2>
            <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-14">
              {launchSteps.map(([number, title, copy]) => (
                <article key={number} className="border-t border-white/15 pt-5">
                  <p className="text-xs font-bold text-[#8cc1ff]">{number}</p>
                  <h3 className="mt-8 text-2xl font-medium tracking-[-.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy & Recovery Section */}
        <section id="recovery" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-20">
          <div className="rounded-[1.75rem] border border-[#dce9ff] bg-[#f1f7ff] p-8 sm:p-11">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0066ff] shadow-sm">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <p className="mt-10 text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">Privacy by choice</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.05em] text-[#101827] sm:text-4xl">
              Use the tools you need. Leave the rest off.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              SMS, voice, notifications and sync are optional. WhisperLedger is engineered to explain what a permission enables before you choose it.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">Pending money, in context</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.055em] text-[#101827] sm:text-5xl">
              Make the things that need follow-up easier to see.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Returns, cancellations and shared balances should not disappear into a long list of transactions. Keep the amount, expected date and supporting notes close until the situation is resolved.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-slate-700">
              {['Tie a refund to the purchase it came from', 'Keep promised dates and notes together', 'See shared balances without group-chat arithmetic'].map(item => (
                <li key={item} className="flex gap-3">
                  <Check className="h-5 w-5 shrink-0 text-[#0066ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Coming Soon & Early Access Section */}
        <section id="early-access" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="overflow-hidden rounded-[2rem] border border-[#d9e6f8] bg-white shadow-[0_24px_70px_-40px_rgba(0,64,160,.28)]">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="p-8 sm:p-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#edf6ff] px-3.5 py-1.5 text-xs font-bold text-[#0066ff]">
                  <BellRing className="h-3.5 w-3.5" /> Early Access Preview
                </div>
                <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-[#101827] sm:text-5xl">
                  WhisperLedger is coming soon.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                  We are conducting final reliability testing and database security audits ahead of the public Android release. Request early access below to be among the first invited to the private beta.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200/80 p-5 text-emerald-900">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      You’re on the early access priority list!
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      We’ll send an invite to <span className="font-semibold">{email}</span> as soon as access opens.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-11 pr-4 py-3.5 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-transparent text-slate-900 placeholder-slate-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066ff] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0056d6] shrink-0 shadow-md shadow-blue-500/20"
                    >
                      Notify Me <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <p className="mt-4 text-xs text-slate-400">
                  Zero spam. We will only contact you when early access is ready for your device.
                </p>
              </div>

              <div className="flex flex-col justify-between bg-[#f4f8fe] p-8 sm:p-14 border-t lg:border-t-0 lg:border-l border-[#e8edf5]">
                <ShieldCheck className="h-10 w-10 text-[#0066ff]" />
                <div className="mt-8 lg:mt-0">
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-slate-500">Release Roadmap</p>
                  <p className="mt-3 text-xl font-semibold leading-snug tracking-[-.03em] text-[#172033]">
                    The product must earn trust before it touches your financial records.
                  </p>
                  <div className="mt-6 space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>PostgreSQL schema & transactional ledger: Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Zero-egress offline SMS parsing: Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>Private Beta Testing: In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mx-auto max-w-3xl px-5 pb-24 sm:px-8 sm:pb-32">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">Questions, answered</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] text-[#101827] sm:text-5xl">The important things.</h2>
          <div className="mt-12 divide-y divide-slate-200">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-6 text-base font-semibold text-slate-800">
                  {question}
                  <span className="text-xl font-normal text-[#0066ff] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-xl pt-3 text-sm leading-relaxed text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

