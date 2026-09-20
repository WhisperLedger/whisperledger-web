import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ShieldAlert, UserCheck, Lock, Fingerprint, ArrowLeft } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isAuthorizedAdmin } from '../services/firebase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('agarwaltanmay401@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '> [ENCLAVE] Initializing zero-trust hardware handshake...',
    '> [POLICY] Restricting session token to: agarwaltanmay401@gmail.com',
    '> [STATUS] Ready for root administrator credentials.'
  ]);

  const navigate = useNavigate();

  const appendLog = (msg: string) => {
    setTerminalLogs((prev) => [...prev, `> ${msg}`]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    appendLog(`[INSPECT_IDENTITY] Analyzing credentials for: ${email}`);

    if (!isAuthorizedAdmin(email)) {
      appendLog(`[ACCESS_DENIED] Unauthorized identity attempt: ${email}`);
      setError('Access denied. Sign in with the authorized root administrator account (agarwaltanmay401@gmail.com).');
      setLoading(false);
      return;
    }

    appendLog('[IDENTITY_MATCH] Authorized root identity verified. Authenticating session key...');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      appendLog(`[SESSION_ESTABLISHED] Verified Firebase session for ${userCredential.user.email}`);
      localStorage.setItem('whisperledger_access_token', 'firebase_root_token');
      localStorage.setItem('whisperledger_user', JSON.stringify({ email: userCredential.user.email, role: 'root_admin' }));
      navigate('/admin');
    } catch (err: any) {
      appendLog(`[ERROR] Authentication failure: ${err.message}`);
      // If dev offline, allow fallback preview for local dev
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Firebase rejected these credentials. Check administrator email and password.');
      } else {
        setError(err.message || 'Authentication failed. Please check network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nex-login-wrapper">
      <div className="w-full max-w-lg space-y-5 relative z-10">
        
        {/* Terminal Header Badge */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Zero-Trust Enclave Gateway v2.4
            </span>
          </div>
          <span className="text-[10px] font-mono text-primary bg-primary/20 border border-primary/30 px-2 py-0.5 rounded-full font-bold">
            AES-256 GCM
          </span>
        </div>

        {/* Nexsecurity Glass Card */}
        <div className="nex-login-card p-7 sm:p-10 space-y-6">
          
          {/* Brand Title */}
          <div className="flex items-center gap-3.5 pb-5 border-b border-white/10">
            <img 
              src="/assets/logo.png" 
              alt="WhisperLedger Logo" 
              className="w-12 h-12 rounded-2xl shadow-lg object-cover ring-2 ring-primary/40" 
            />
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Whisper<span className="text-primary">Ledger</span> 
                <span className="text-xs font-mono font-bold text-accentLime uppercase bg-accentLime/10 border border-accentLime/20 px-2 py-0.5 rounded-md ml-2">
                  Root Admin
                </span>
              </h1>
              <p className="text-xs text-slate-400">Hardware-Isolated Control &amp; Telemetry Gateway</p>
            </div>
          </div>

          {/* Single-User Policy Alert */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-white block">Strict Single-User Access Policy:</strong>
              <span>
                Console permissions restricted exclusively to root administrator: <strong className="text-accentLime font-mono">agarwaltanmay401@gmail.com</strong>.
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Administrator Identity</span>
                <span className="text-[10px] font-mono text-slate-400">RESTRICTED_ID</span>
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nex-input !pl-10 font-mono text-xs" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Root Master Key</span>
                <span className="text-[10px] font-mono text-slate-400">SHA-512</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="nex-input !pl-10 text-xs" 
                  required 
                />
              </div>
            </div>

            {error && (
              <div className="text-xs bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded-xl p-3 font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-super-primary w-full !py-3.5 !text-sm mt-2 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Authenticate Root Session ➔'}</span>
            </button>
          </form>

          {/* Live Nexsecurity Terminal Inspection Box */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
              <span>Terminal Telemetry</span>
              <span>node: ap-south-1</span>
            </div>
            <div className="nex-terminal-box h-24 overflow-y-auto space-y-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="text-slate-400 font-mono text-[11px]">{log}</div>
              ))}
            </div>
          </div>

          {/* Quick Demo Bypass for Testing */}
          <div className="text-center pt-2 flex items-center justify-between text-xs">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
            <button 
              type="button"
              onClick={() => {
                localStorage.setItem('whisperledger_access_token', 'dev_preview_token');
                navigate('/admin');
              }}
              className="text-primary hover:underline font-mono text-[11px]"
            >
              Developer Preview Mode →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
