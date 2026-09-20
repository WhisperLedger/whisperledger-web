import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StageData {
  stepNum: string;
  badge: string;
  title: string;
  description: string;
  points: string[];
  filename: string;
  codeSnippet: {
    comment1: string;
    line1: string;
    comment2: string;
    line2: string;
    conclusion: string;
  };
}

const STAGES: StageData[] = [
  {
    stepNum: '01',
    badge: 'Stage 01 • Voice & SMS Ingestion',
    title: 'Effortless Ambient Capture',
    description: 'Speak naturally in casual English, Hindi, or Hinglish ("Swiggy ₹420 paid via UPI") or let the on-device background service capture incoming bank SMS debits silently in 20ms.',
    points: [
      'Zero manual typing into spreadsheets or bloated tracking apps',
      'Zero audio uploads to cloud servers — 100% on-device private'
    ],
    filename: 'input_pipeline.py',
    codeSnippet: {
      comment1: '// Incoming Voice Audio Memo',
      line1: '🎙️ "Paid 350 at Starbucks for cold brew"',
      comment2: '// Background Bank SMS Stream',
      line2: 'SMS[HDFCBK]: ₹350 debited to Starbucks (UPI/429188)',
      conclusion: '➜ Latency: 0.38s • Battery: 0.00%'
    }
  },
  {
    stepNum: '02',
    badge: 'Stage 02 • Sub-Second Parsing',
    title: 'Instant Entity Extraction',
    description: 'The neural engine tokenizes text, normalizes merchant aliases, detects multi-person splits, and matches tax-deductible expense categories in under 400 milliseconds.',
    points: [
      'Extracts merchant, amount, category, and payment channel with 99.4% accuracy',
      'Identifies split tags like "split with rahul" and generates individual debit shares'
    ],
    filename: 'entity_extractor.rs',
    codeSnippet: {
      comment1: '// Extracted Entity Struct',
      line1: '{"merchant": "Starbucks", "amount": 350.00, "category": "Food"}',
      comment2: '// Payment Rail',
      line2: '{"channel": "UPI", "account": "HDFC-xx9182"}',
      conclusion: '➜ Normalized in 0.04s'
    }
  },
  {
    stepNum: '03',
    badge: 'Stage 03 • Isolated Storage',
    title: 'Private User-Scoped Ledger',
    description: 'Entries are saved locally into your personal cryptographic container. Syncs securely with PostgreSQL / Firebase with zero third-party marketing tracking.',
    points: [
      'Hardware-isolated biometric key secures all financial summaries',
      'Encrypted backup to personal cloud storage with zero tracking pixels'
    ],
    filename: 'local_storage.go',
    codeSnippet: {
      comment1: '// SQLite Cipher / Neon Sync',
      line1: 'INSERT INTO ledger_tx (uid, amount, hash) VALUES (...)',
      comment2: '// Encryption Enclave',
      line2: 'AES_256_GCM_Seal(payload, user_biometric_key)',
      conclusion: '➜ Encrypted at rest & transit'
    }
  },
  {
    stepNum: '04',
    badge: 'Stage 04 • Predictive Budgeting',
    title: 'Autonomous Spend Guard',
    description: 'WhisperLedger projects your remaining monthly burn rate and alerts you before you breach discretionary dining or entertainment caps.',
    points: [
      'Proactive velocity indicators warn when spending accelerates',
      'Categorizes subscriptions to highlight forgotten recurring drains'
    ],
    filename: 'velocity_engine.py',
    codeSnippet: {
      comment1: '// Burn Rate Computation',
      line1: 'Dining burn: ₹12,400 / ₹15,000 (82% used, 11 days remaining)',
      comment2: '// Velocity Warning',
      line2: '⚠️ Alert: Projected to breach dining limit by 18%',
      conclusion: '➜ Guardrail notice generated'
    }
  },
  {
    stepNum: '05',
    badge: 'Stage 05 • Legal Dispute Assembly',
    title: 'Statutory Notice Engine',
    description: 'When an order is canceled but the refund is not credited back to your bank within 48 hours, WhisperLedger compiles a formal Level-2 notice citing RBI turnaround regulations.',
    points: [
      'References RBI circular DPSS.CO.PD No.629/02.01.014/2019-20',
      'Direct 1-tap dispatch to merchant grievance and bank nodal desks'
    ],
    filename: 'rbi_dispute_builder.ts',
    codeSnippet: {
      comment1: '// Dispute Dossier',
      line1: 'Order #9182: ₹1,450 • UTR: 429188 • Breach: 52h overdue',
      comment2: '// Legal Drafting',
      line2: 'Subject: Statutory Demand Notice under RBI TAT Circular',
      conclusion: '➜ PDF & WhatsApp Notice compiled'
    }
  },
  {
    stepNum: '06',
    badge: 'Stage 06 • Funds Recovery',
    title: 'Automated Account Credit',
    description: 'The bank nodal desk prioritizes statutory complaints. Once the reversal hits your statement, WhisperLedger matches the incoming credit and resolves the dispute.',
    points: [
      'Auto-reconciliation of refund credits against original pending dispute',
      'Average turnaround reduced from 14 days to under 36 hours'
    ],
    filename: 'reconciliation_bot.go',
    codeSnippet: {
      comment1: '// Reversal Webhook Intercept',
      line1: 'CR HDFCBK ₹1,450 (Ref: SWIGGY REFUND / UTR: 429188)',
      comment2: '// Status Resolution',
      line2: 'Dispute #429188 -> RESOLVED_CREDITED',
      conclusion: '➜ ₹1,450 back in user account'
    }
  }
];

export const LifecycleStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stage = STAGES[activeStep];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-left max-w-2xl space-y-3 mb-10">
        <span className="super-pill super-pill-lime uppercase tracking-wider">Autonomous Lifecycle</span>
        <h2 className="fluid-h2 font-extrabold text-dark tracking-tight">The 6-Stage Intelligence Loop</h2>
        <p className="text-slateBody text-sm sm:text-base">
          Explore how WhisperLedger captures speech, guards your monthly budget, and enforces statutory refund recovery from end to end.
        </p>
      </div>

      {/* Stepper Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8">
        {STAGES.map((s, idx) => (
          <button
            key={s.stepNum}
            onClick={() => setActiveStep(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeStep === idx
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary'
            }`}
          >
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
              activeStep === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {s.stepNum}
            </span>
            <span>{s.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Central Interactive Stage Card */}
      <div className="super-card p-6 sm:p-10 border-primary/20 bg-gradient-to-br from-white via-white to-primary/5 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Left Stage Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="super-pill super-pill-blue">{stage.badge}</span>
              <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Input
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
              {stage.title}
            </h3>
            <p className="text-slateBody text-xs sm:text-sm leading-relaxed">
              {stage.description}
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              {stage.points.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stage Snippet Box */}
          <div className="lg:col-span-6">
            <div className="snippet-box text-xs space-y-2 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                <span className="font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {stage.filename}
                </span>
                <span>stream: active</span>
              </div>
              <p className="text-slate-400">{stage.codeSnippet.comment1}</p>
              <p className="text-emerald-400 font-semibold">{stage.codeSnippet.line1}</p>
              <p className="text-slate-500 mt-2">{stage.codeSnippet.comment2}</p>
              <p className="text-amber-300 font-mono">{stage.codeSnippet.line2}</p>
              <p className="text-primary font-bold mt-2">{stage.codeSnippet.conclusion}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
