import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@whisperledger.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.login(email, password);
      if (res.success && res.data?.tokens?.access_token) {
        localStorage.setItem('whisperledger_access_token', res.data.tokens.access_token);
        localStorage.setItem('whisperledger_user', JSON.stringify(res.data.user));
        navigate('/admin');
      } else {
        // If Go backend is offline or credentials fail in dev, allow simulated dashboard preview
        if (res.error?.message) {
          setError(res.error.message);
        } else {
          // Dev fallback token
          localStorage.setItem('whisperledger_access_token', 'dev-admin-preview-token');
          navigate('/admin');
        }
      }
    } catch {
      // Offline fallback for preview
      localStorage.setItem('whisperledger_access_token', 'dev-admin-preview-token');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">WhisperLedger Executive Console</h2>
          <p className="text-xs text-slate-400 mt-2">
            Authenticate to access telemetry, platform analytics, and household financial graph records.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Enter Admin Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
          <button
            onClick={() => {
              localStorage.setItem('whisperledger_access_token', 'dev-demo-admin-token');
              navigate('/admin');
            }}
            className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3 h-3" /> Quick Preview Dashboard (Demo Mode)
          </button>
        </div>
      </div>
    </div>
  );
};
