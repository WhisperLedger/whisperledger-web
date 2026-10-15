import React from 'react';
import { ArrowRight, Check, LockKeyhole, Mic, ReceiptText, ShieldCheck, UsersRound } from 'lucide-react';
import { ProductShowcase } from '../components/ProductShowcase';
import { InterestForm } from '../components/InterestForm';

const features = [
  { 
    icon: Mic, 
    eyebrow: 'Record', 
    title: 'Capture the moment. Review the detail.', 
    copy: 'Add an expense manually or by voice. With SMS capture enabled, you decide whether a suggestion is saved automatically or held for approval.',
    highlight: '₹480 Uber ride captured',
    badge: '1-tap review'
  },
  { 
    icon: UsersRound, 
    eyebrow: 'Separate', 
    title: 'Shared costs without the group-chat maths', 
    copy: 'Keep rent, groceries, bills and balances in a household space—separate from your personal spending.',
    highlight: '₹1,400 share calculated',
    badge: 'Split ledger'
  },
  { 
    icon: ReceiptText, 
    eyebrow: 'Follow up', 
    title: 'Keep money still due within sight', 
    copy: 'Track refunds, cancellations and money owed alongside the original purchase and the next action.',
    highlight: '₹1,000 refund due tomorrow',
    badge: 'Recovery alert'
  },
];

const rhythmSteps = [
  ['01', 'Capture with context', 'Record a moment while it is fresh, then adjust details when you have them.'],
  ['02', 'Choose the level of automation', 'Keep eligible SMS captures automatic, or hold them for your review. The choice stays in your hands.'],
  ['03', 'See what still needs attention', 'Separate personal spending, shared balances and pending returns in one calm view.'],
];

const faqs = [
  ['What is WhisperLedger?', 'WhisperLedger is a review-first daily expense tracker and household financial ledger designed for India. It captures everyday INR spending, simplifies shared household splits, and follows up on refunds and money owed—without ads, intrusive bank logins, or spreadsheets.'],
  ['Who created WhisperLedger?', 'WhisperLedger was conceived and created by Tanmay Agarwal as an offline-ready, privacy-respecting financial ledger built specifically for Indian expense and household patterns.'],
  ['What is the prime goal of WhisperLedger?', 'The primary goal of WhisperLedger is to help you maintain a clean, frictionless record of where your money moves, eliminate group-chat math for shared flat expenses, and ensure forgotten refunds are recovered—all while keeping your financial data completely private and on-device.'],
  ['When will WhisperLedger be available?', 'We are preparing the Android release with a focus on reliability, privacy and a clear first-run experience. Availability will be announced here when it is ready.'],
  ['Will I need to enable SMS permissions?', 'No. Manual entry and voice logging work without SMS permissions. If you choose SMS capture, you can set it to automatic handling or manual approval.'],
  ['Does WhisperLedger need my bank login?', 'No. WhisperLedger is not a bank and does not ask for your bank username, password or account credentials to keep a ledger.'],
  ['Who is it for?', 'It is for people who want a clear record of their own spending, and for households that need a calmer way to track shared costs and balances.'],
];

export const LandingPage: React.FC = () => (
    <div className="landing-page relative overflow-hidden bg-[#fbfcff] text-[#101827]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_74%_24%,rgba(0,102,255,.12),transparent_27%),radial-gradient(circle_at_18%_12%,rgba(139,92,246,.09),transparent_24%)]" aria-hidden="true" />

      {/* Curiosity Announcement Strip */}
      <div className="relative z-10 border-b border-blue-100 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-blue-50/90 py-2.5 px-4 text-center text-xs text-slate-700">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0066ff] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Coming Soon
          </span>
          <span className="font-semibold text-slate-900">WhisperLedger for Android is in final invite-only testing.</span>
          <a href="#notify" className="font-bold text-[#0066ff] underline underline-offset-2 hover:text-blue-700 ml-1">
            Request your VIP Early Access invite &rarr;
          </a>
        </div>
      </div>

      <div>
        {/* Hero Section */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50/90 border border-blue-200/70 px-3.5 py-1.5 text-xs font-semibold text-[#0066ff] mb-5 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Private Beta • Coming Soon</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#0066ff]">WhisperLedger</p>
            <h1 className="mt-6 text-[clamp(2.35rem,6.2vw,5.2rem)] font-semibold leading-[.95] tracking-[-.06em] text-[#101827]">
              Money leaves a trail.<br /><span className="text-[#0066ff]">Make it useful.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
              Most finance apps sell your data, spam loan offers, or demand your bank passwords. We’re building something quietly different: an invite-first, on-device ledger designed for daily Indian spending, shared flat costs, and money owed back.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#notify" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101827] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#263246] active:scale-98">
                Request VIP Early Access <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#product" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                Explore the product
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Review-first by design</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Personal and household spaces</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Built around INR spending</span>
            </div>
          </div>
          <div id="product" className="relative min-h-[500px] scroll-mt-24 sm:min-h-[590px]">
            {/* Replaced generic 'private by default' pill with an intriguing real preview */}
            <div className="absolute -left-4 top-12 hidden w-52 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-[0_20px_50px_-24px_rgba(0,102,255,.3)] backdrop-blur md:block z-10">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#0066ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Coming Soon to Android</span>
              </div>
              <p className="mt-2 text-xs font-bold leading-snug text-slate-900">
                No bank logins.<br />No loan ads.<br />
                <span className="text-slate-500 font-normal">Everything stays encrypted on your device.</span>
              </p>
            </div>
            <ProductShowcase />
            <div className="hidden sm:block absolute bottom-7 right-4 rounded-2xl border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_20px_50px_-24px_rgba(0,102,255,.3)] backdrop-blur z-10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#0066ff]">On-Device Intelligence</p>
              <p className="mt-0.5 text-xs font-bold text-slate-900">1-Tap Bank SMS Review</p>
              <p className="text-[11px] text-slate-500">Zero cloud scraping. Zero tracking.</p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="border-y border-[#e7edf6] bg-white" aria-label="WhisperLedger principles">
          <div className="mx-auto grid max-w-6xl divide-y divide-[#e7edf6] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {[
              ['01', 'One record', 'A clear account of what happened, while the context is still fresh.'],
              ['02', 'Two spaces', 'Personal and shared spending stay usefully separate.'],
              ['03', 'Your call', 'Choose automatic handling or approval for optional SMS capture.'],
            ].map(([num, title, copy]) => (
              <div key={title} className="py-7 sm:px-7 sm:py-9 first:sm:pl-0 last:sm:pr-0">
                <span className="text-[11px] font-mono font-bold text-[#0066ff] tracking-wider">{num}</span>
                <p className="mt-1 text-base font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid lg:grid-cols-[1.2fr_.8fr] items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">What WhisperLedger brings together</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.055em] text-[#101827] sm:text-5xl">
                A practical record for the money that moves through your day.
              </h2>
            </div>
            <p className="text-base text-slate-600 leading-relaxed max-w-md lg:mb-2">
              No bloated spreadsheets or intrusive bank password prompts. Three dedicated spaces designed to manage personal spending, household splits, and forgotten money due back.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, eyebrow, title, copy, highlight, badge }) => (
              <article key={title} className="group flex flex-col justify-between rounded-[1.5rem] border border-[#e5ebf4] bg-white p-7 shadow-[0_16px_40px_-32px_rgba(15,23,42,.25)] transition duration-300 hover:-translate-y-1 hover:border-[#cfe1ff] hover:shadow-[0_24px_50px_-28px_rgba(0,102,255,.2)]">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0066ff]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-10 text-xs font-bold uppercase tracking-[.13em] text-[#0066ff]">{eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-.035em] text-[#172033]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{copy}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{highlight}</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#0066ff]">{badge}</span>
                </div>
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
              {rhythmSteps.map(([number, title, copy]) => (
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
        <section id="recovery" className="mx-auto grid max-w-6xl items-stretch gap-8 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-[1.75rem] border border-[#dce9ff] bg-[#f1f7ff] p-8 sm:p-11 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0066ff] shadow-sm">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <p className="mt-10 text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">Privacy by choice</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.05em] text-[#101827] sm:text-4xl">
                Use the tools you need. Leave the rest off.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                SMS capture, voice input, notifications and sync are optional. WhisperLedger explains what each permission enables before you decide.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d5e4fc] grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div className="rounded-xl bg-white/70 p-3.5 border border-white">
                <span className="block text-[#0066ff] font-bold">100% Local</span>
                <span className="text-[11px] text-slate-500 font-normal">On-device biometric encryption</span>
              </div>
              <div className="rounded-xl bg-white/70 p-3.5 border border-white">
                <span className="block text-[#0066ff] font-bold">Zero Bank Logins</span>
                <span className="text-[11px] text-slate-500 font-normal">No credentials ever required</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#dce9ff] bg-white p-8 sm:p-11 shadow-[0_20px_50px_-30px_rgba(0,102,255,.2)] flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">Pending money, in context</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.05em] text-[#101827] sm:text-4xl">
                Make the things that need follow-up easier to see.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                Returns, cancellations and shared balances should not disappear into a long transaction list. Keep the amount, expected date and supporting notes close until the situation is resolved.
              </p>

              {/* Recovery Preview Cards */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-xs text-white">₹</span>
                    <div>
                      <strong className="block text-xs font-semibold text-slate-900">Amazon Order Return</strong>
                      <span className="text-[11px] text-amber-800">Refund expected tomorrow · ₹1,000</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-amber-700 shadow-xs">Due in 1 day</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-bold text-xs text-white">✓</span>
                    <div>
                      <strong className="block text-xs font-semibold text-slate-900">Swiggy Cancellation</strong>
                      <span className="text-[11px] text-emerald-800">Credited back to ICICI · ₹450</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-emerald-700 shadow-xs">Settled</span>
                </div>
              </div>
            </div>

            <ul className="mt-7 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-5">
              {['Link a refund to the purchase it came from', 'Keep promised dates and notes together', 'See what is owed without reconstructing the group chat'].map(item => (
                <li key={item} className="flex items-center gap-2.5 font-medium">
                  <Check className="h-4 w-4 shrink-0 text-[#0066ff]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="overflow-hidden rounded-[2rem] border border-[#d9e6f8] bg-white shadow-[0_24px_70px_-40px_rgba(0,64,160,.28)]">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="p-8 sm:p-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0066ff]">
                  <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-ping" />
                  Limited Beta Batch 01
                </div>
                <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-[#101827] sm:text-5xl">
                  Be the first to experience WhisperLedger.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                  We are handcrafting the Android release with biometric protection, 1-tap SMS review, and zero ads. Join the waitlist to receive your priority invite link the moment Batch 01 opens.
                </p>
                <div id="notify" className="scroll-mt-8">
                  <p className="mt-8 text-sm font-semibold text-slate-800">Enter your email for priority early access:</p>
                  <InterestForm />
                </div>
              </div>

              <div className="flex flex-col justify-between bg-gradient-to-br from-[#f4f8fe] to-[#eaf2fd] p-8 sm:p-14 border-t lg:border-t-0 lg:border-l border-[#e8edf5]">
                <ShieldCheck className="h-10 w-10 text-[#0066ff]" />
                <div className="mt-8 lg:mt-0">
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-slate-500">Early access perks</p>
                  <p className="mt-3 text-xl font-semibold leading-snug tracking-[-.03em] text-[#172033]">
                    Quiet, clean finance. No spam calls, no selling your credit score.
                  </p>
                  <div className="mt-6 space-y-3 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Release 1.0 Candidate for Android</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>100% Free Lifetime Tier for Beta Testers</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>Private APK &amp; Direct Play Store Beta Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - 2-Column Balanced Desktop Layout */}
        <section id="faq" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="grid lg:grid-cols-[380px_1fr] lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#0066ff]">Questions, answered</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.055em] text-[#101827] sm:text-4xl lg:text-5xl">
                The important things.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Everything you need to know about WhisperLedger, local data storage, and how your information is kept private.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Still have questions?</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">We're here to answer anything.</p>
                <a
                  href="mailto:support@whisperledger.in"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
                >
                  Contact founder &amp; team →
                </a>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 divide-y divide-slate-200 border-t border-slate-200 lg:border-t-0">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-5.5 first:pt-0">
                  <summary className="flex cursor-pointer list-none justify-between gap-6 text-base font-semibold text-slate-900 hover:text-[#0066ff] transition-colors">
                    {question}
                    <span className="text-xl font-normal text-[#0066ff] transition-transform duration-200 group-open:rotate-45 select-none shrink-0">+</span>
                  </summary>
                  <p className="pt-3 text-sm leading-relaxed text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
);

