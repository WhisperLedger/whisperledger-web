import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockKeyhole, ShieldCheck, UserRound, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem('whisperledger_access_token');
    if (token) {
      api.getMe().then((res) => {
        if (active && res.success && res.data) {
          const role = res.data.role;
          if (role === 'platform_admin' || role === 'admin' || role === 'household_admin') {
            navigate('/admin', { replace: true });
          }
        }
      }).catch(() => null);
    }
    return () => { active = false; };
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(email.trim(), password);
      if (res.success && res.data?.tokens?.access_token) {
        const user = res.data.user;
        if (user.role !== 'platform_admin' && user.role !== 'admin' && user.role !== 'household_admin') {
          setError('This account does not have platform administrator privileges.');
          setLoading(false);
          return;
        }

        localStorage.setItem('whisperledger_access_token', res.data.tokens.access_token);
        localStorage.setItem('whisperledger_admin_user', JSON.stringify(user));
        navigate('/admin', { replace: true });
      } else {
        setError(res.error?.message || 'Invalid administrator credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to WhisperLedger Cloud API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1117] text-slate-100 px-4 py-8 sm:px-6 sm:py-12 flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#161922] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start gap-3 border-b border-slate-800 pb-5">
          <img src="/assets/logo.png" alt="WhisperLedger" className="h-10 w-10 rounded-xl object-cover" />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">WhisperLedger</p>
            <h1 className="text-base font-bold text-white tracking-tight">Operations Console</h1>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Administrative gateway for user entitlements, notification broadcast dispatch, and Cloud Run telemetry inspection.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block text-xs font-medium text-slate-300">
              Administrator Email
            </label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@whisperledger.com"
                className="w-full rounded-lg border border-slate-800 bg-[#0f1117] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-xs font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-slate-800 bg-[#0f1117] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                required
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-rose-900/50 bg-rose-950/40 px-3 py-2 text-xs text-rose-300 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50 mt-5"
          >
            <ShieldCheck className="h-4 w-4" />
            {loading ? 'Authenticating with PostgreSQL…' : 'Sign In to Operations Console'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
          <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </Link>
          <span className="font-mono text-[10px] text-slate-500">Cloud Run • Neon DB</span>
        </div>
      </section>
    </main>
  );
};
