import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LockKeyhole, ArrowLeft, ShieldAlert } from 'lucide-react';

interface AdminAccessGuardProps {
  children: React.ReactNode;
}

export const AdminAccessGuard: React.FC<AdminAccessGuardProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [keyError, setKeyError] = useState('');
  const [verifyingKey, setVerifyingKey] = useState(false);

  const verifyAccess = useCallback(async (keyOverride?: string) => {
    // 1. Check local session storage cache
    if (sessionStorage.getItem('wl_admin_authorized') === 'true') {
      setStatus('allowed');
      return;
    }

    // 2. Allow automatically in local development
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
      sessionStorage.setItem('wl_admin_authorized', 'true');
      setStatus('allowed');
      return;
    }

    // 3. Check for passkey in URL parameter or override
    const keyParam = keyOverride || searchParams.get('key') || '';

    try {
      const url = keyParam
        ? `/api/verify-admin-ip?key=${encodeURIComponent(keyParam)}`
        : '/api/verify-admin-ip';

      const response = await fetch(url);
      const data = await response.json().catch(() => null);

      if (response.ok && data?.allowed) {
        sessionStorage.setItem('wl_admin_authorized', 'true');
        setStatus('allowed');
        setShowKeyModal(false);
      } else {
        setStatus('denied');
      }
    } catch {
      setStatus('denied');
    }
  }, [searchParams]);

  useEffect(() => {
    verifyAccess();
  }, [verifyAccess]);

  // Hidden keyboard shortcut (Ctrl+Shift+A or Cmd+Shift+A) to open passkey modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowKeyModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleManualKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;

    setVerifyingKey(true);
    setKeyError('');

    try {
      const response = await fetch(`/api/verify-admin-ip?key=${encodeURIComponent(passkeyInput.trim())}`);
      const data = await response.json().catch(() => null);

      if (response.ok && data?.allowed) {
        sessionStorage.setItem('wl_admin_authorized', 'true');
        setStatus('allowed');
        setShowKeyModal(false);
      } else {
        setKeyError('Invalid admin passkey or access denied.');
      }
    } catch {
      setKeyError('Connection error. Please try again.');
    } finally {
      setVerifyingKey(false);
    }
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-400 flex flex-col items-center justify-center font-mono text-xs gap-3">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span>Verifying security clearance…</span>
      </div>
    );
  }

  // Cloaked: Show authentic 404 page for unauthorized visitors
  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-[#fbfcff] text-slate-800 flex flex-col items-center justify-center px-6 selection:bg-blue-600 selection:text-white">
        <div className="max-w-md w-full text-center">
          <span 
            onClick={() => setShowKeyModal(true)} 
            className="text-7xl font-extrabold text-slate-300 tracking-tight cursor-default select-none transition hover:text-slate-400"
            title="404"
          >
            404
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Page not found
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for. It may have moved or doesn’t exist.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#101827] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#263246] transition active:scale-98"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Link>
          </div>
        </div>

        {/* Secret Master Key Modal for Tanmay */}
        {showKeyModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <LockKeyhole className="w-5 h-5 text-blue-600" />
                <span>Admin Gateway Access</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Your IP is not currently on the whitelist. Enter your emergency admin passkey to unlock access.
              </p>

              <form onSubmit={handleManualKeySubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="admin-passkey" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Security Passkey
                  </label>
                  <input
                    id="admin-passkey"
                    type="password"
                    autoFocus
                    required
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter passkey…"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                  />
                  {keyError && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>{keyError}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(false)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verifyingKey}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition"
                  >
                    {verifyingKey ? 'Verifying…' : 'Authenticate'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};
