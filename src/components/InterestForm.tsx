import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export const InterestForm = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  const submitInterest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) {
      setState('error');
      setMessage('Please confirm that you would like to receive availability updates.');
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setState('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setState('submitting');
    setMessage('');

    const payload = JSON.stringify({
      email: trimmedEmail,
      consent,
      company: company.trim(),
    });

    // Tiered endpoints: local serverless endpoint first, followed by Cloud Run API
    const endpoints = [
      '/api/interest',
      '/api/v1/interest',
      'https://whisperledger-api-dozavowbya-el.a.run.app/api/v1/interest',
    ];

    let succeeded = false;
    let lastErrorMessage = '';

    for (const url of endpoints) {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12_000);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          signal: controller.signal,
        });

        const result = await response.json().catch(() => null);

        if (response.ok || response.status === 202) {
          succeeded = true;
          break;
        }

        if (result?.error?.message) {
          lastErrorMessage = result.error.message;
        }
      } catch (err: any) {
        // Continue to fallback endpoint if connection or timeout occurs
        if (err?.name === 'AbortError') {
          lastErrorMessage = 'Request timed out. Retrying...';
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    if (succeeded) {
      setState('success');
      setMessage("You're on the priority list! We've reserved your early access spot and will email your invite the moment WhisperLedger is ready.");
      setEmail('');
      setConsent(false);
    } else {
      setState('error');
      setMessage(
        lastErrorMessage ||
          'Unable to save your request right now. Please check your connection and try again.'
      );
    }
  };

  if (state === 'success') {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-5 shadow-xs" role="status" aria-live="polite">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" aria-hidden="true" />
          <p className="text-sm font-bold text-emerald-950">You're on the priority list!</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-emerald-800 font-normal">{message}</p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 text-xs font-semibold text-emerald-900 underline underline-offset-4 hover:text-emerald-700"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 max-w-lg" onSubmit={submitInterest}>
      <label className="sr-only" htmlFor="interest-email">Email address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="interest-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-h-12 flex-1 rounded-xl border border-slate-200/90 bg-white px-4 text-base sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066ff] focus:ring-4 focus:ring-blue-100"
          aria-describedby={state === 'error' ? 'interest-help interest-status' : 'interest-help'}
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0066ff] px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0056d6] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
        >
          {state === 'submitting' ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Saving spot...</span>
            </>
          ) : (
            <>
              <span>Keep me posted</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <div className="mt-4 flex items-start gap-2.5">
        <input
          id="interest-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0066ff] focus:ring-[#0066ff]"
        />
        <label htmlFor="interest-consent" className="text-xs leading-relaxed text-slate-500 font-normal">
          I’d like to receive product availability updates. See the{' '}
          <Link className="font-semibold text-slate-700 underline underline-offset-2 hover:text-[#0066ff]" to="/privacy">
            Privacy notice
          </Link>.
        </label>
      </div>
      {/* Honeypot field for bot protection */}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="interest-company">Company</label>
        <input
          id="interest-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>
      <p id="interest-help" className="mt-3 text-xs leading-relaxed text-slate-400">One email address. No account required.</p>
      {state === 'error' && (
        <p id="interest-status" className="mt-3 text-xs font-semibold text-red-600" role="alert">
          {message}
        </p>
      )}
    </form>
  );
};
