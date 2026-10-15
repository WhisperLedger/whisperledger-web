import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const publicApiBaseUrl = import.meta.env.VITE_PUBLIC_API_URL || import.meta.env.VITE_API_URL || 'https://whisperledger-api-dozavowbya-el.a.run.app/api/v1';
const interestApiUrl = `${publicApiBaseUrl.replace(/\/$/, '')}/interest`;

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

    setState('submitting');
    setMessage('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch(interestApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent, company }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.error?.message || 'Unable to save your request right now.');
      }

      setState('success');
      setMessage('You’re on the list. We’ll email you when there is a meaningful availability update.');
      setEmail('');
      setConsent(false);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to save your request right now.');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5" role="status" aria-live="polite">
        <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-emerald-950">Thank you for your interest.</p>
        <p className="mt-1 text-sm leading-relaxed text-emerald-800">{message}</p>
      </div>
    );
  }

  return (
    <form className="mt-8 max-w-lg" onSubmit={submitInterest}>
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
          className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-base sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066ff] focus:ring-4 focus:ring-blue-100"
          aria-describedby={state === 'error' ? 'interest-help interest-status' : 'interest-help'}
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0066ff] px-5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#0056d6] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === 'submitting' ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <>Keep me posted <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
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
        <label htmlFor="interest-consent" className="text-xs leading-relaxed text-slate-500">
          I’d like to receive product availability updates. See the <Link className="font-semibold text-slate-700 underline underline-offset-2 hover:text-[#0066ff]" to="/privacy">Privacy notice</Link>.
        </label>
      </div>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="interest-company">Company</label>
        <input id="interest-company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
      </div>
      <p id="interest-help" className="mt-3 text-xs leading-relaxed text-slate-400">One email address. No account required.</p>
      {state === 'error' && <p id="interest-status" className="mt-3 text-xs font-medium text-red-600" role="alert">{message}</p>}
    </form>
  );
};
