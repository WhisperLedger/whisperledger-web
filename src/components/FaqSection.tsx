import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Does WhisperLedger read my personal or WhatsApp messages?",
    answer: "Never. WhisperLedger strictly inspects official bank SMS sender IDs (HDFCBK, SBINB, ICICIB) directly on your device. Personal chats, OTPs, and private messages are 100% untouched and ignored."
  },
  {
    question: "How does the Money Recovery Engine recover funds?",
    answer: "It synthesizes transaction UTRs, timestamps, and merchant details into formal Level-2/Level-3 dispute letters referencing RBI turnaround guidelines (RBI DPSS.629), ready to dispatch to bank nodal desks via WhatsApp and Email in 1 click."
  },
  {
    question: "Will background SMS sync drain my battery?",
    answer: "No. The background listener only wakes up for 20 milliseconds when an official financial SMS arrives and immediately returns to sleep. There is zero noticeable battery consumption."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. You can cancel with 1 tap from App Settings or Google Play / App Store subscriptions. During the 7-day trial, you will not be charged a single rupee."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-slate-200/60">
      <div className="text-left space-y-2 mb-10">
        <h2 className="fluid-h2 font-extrabold text-dark">Got Questions?</h2>
        <p className="text-slateBody text-sm">Everything you need to know about WhisperLedger.</p>
      </div>

      <div className="space-y-3 text-left">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="super-card overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <span className="font-bold text-sm text-dark">{faq.question}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slateBody border-t border-slate-100 pt-3 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
