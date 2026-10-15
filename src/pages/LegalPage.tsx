import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sections = {
  privacy: {
    title: 'Privacy at WhisperLedger',
    intro: 'WhisperLedger stores account and ledger information in order to provide sync, household sharing, statements, and support. Voice and SMS permissions are optional and can be changed in device settings.',
    items: [
      ['What we process', 'Account profile data, ledger entries you choose to save, household membership, and support requests. We process notification tokens only to deliver notifications you opt into.'],
      ['Availability updates', 'If you ask to be notified from this website, we store your email address and consent separately from any product account. We use it only for meaningful WhisperLedger availability updates until you opt out.'],
      ['Your controls', 'You can choose whether to use SMS capture, voice input, cloud sync, and push notifications. Do not enable a permission unless you understand its purpose.'],
      ['Data requests', 'Use the in-app support desk to request an export or deletion. We will verify account ownership before acting on a request.'],
    ],
  },
  terms: {
    title: 'Terms of use',
    intro: 'WhisperLedger helps organize financial information. It does not provide banking, investment, tax, or legal advice, and it cannot guarantee a refund or dispute outcome.',
    items: [
      ['Your responsibility', 'Review every captured transaction before relying on it. You remain responsible for entries, payment decisions, and any message you send to a merchant or bank.'],
      ['Recovery tools', 'Recovery content is a draft and workflow aid, not legal representation. Consult a qualified professional for legal advice or a disputed claim.'],
      ['Service access', 'Premium access is granted only after an approved entitlement is recorded by WhisperLedger. A request or payment intent is not an entitlement.'],
    ],
  },
} as const;

export const LegalPage: React.FC = () => {
  const kind = useLocation().pathname.includes('terms') ? 'terms' : 'privacy';
  const page = sections[kind];

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <Link to="/" className="text-sm font-bold text-[#0066FF] hover:underline">← Back to WhisperLedger</Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-widest text-[#0066FF]">Last updated: October 14, 2026</p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-black text-[#101827] tracking-tight">{page.title}</h1>
      <p className="mt-5 text-base leading-relaxed text-slate-600">{page.intro}</p>
      <div className="mt-10 space-y-6">
        {page.items.map(([heading, body]) => (
          <section key={heading} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#101827]">{heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-slate-500">Questions? <a className="text-[#0066FF] font-bold hover:underline" href="mailto:support@whisperledger.in">Contact support</a>.</p>
    </div>
  );
};
