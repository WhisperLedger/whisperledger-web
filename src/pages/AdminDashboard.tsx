import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Activity, ShieldCheck, LogOut, RefreshCw, 
  ExternalLink, Server, Database, Cpu, Clock, CheckCircle2,
  AlertTriangle, Search, Filter, HardDrive, BarChart3,
  Layers, ArrowUpRight
} from 'lucide-react';
import { api, type User, type AdminMetrics, type CloudTelemetry } from '../services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'telemetry' | 'users' | 'metrics' | 'control'>('telemetry');
  const [operator, setOperator] = useState<User | null>(null);
  const [accessState, setAccessState] = useState<'checking' | 'authorized'>('checking');

  // Live Data States
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [telemetry, setTelemetry] = useState<CloudTelemetry | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Status & Telemetry
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const loadData = useCallback(async () => {
    const t0 = performance.now();
    try {
      const [mRes, tRes, uRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getCloudTelemetry(),
        api.getAdminUsers(100, 0),
      ]);

      setPingMs(Math.round(performance.now() - t0));

      if (mRes.success && mRes.data) setMetrics(mRes.data);
      if (tRes.success && tRes.data) setTelemetry(tRes.data);
      if (uRes.success && uRes.data) setUsers(uRes.data);
    } catch (err) {
      console.error('Failed to fetch admin telemetry:', err);
      showToast('Error refreshing live telemetry from Cloud API.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem('whisperledger_access_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    api.getMe().then((res) => {
      if (!active) return;
      if (res.success && res.data) {
        const role = res.data.role;
        if (role !== 'platform_admin' && role !== 'admin' && role !== 'household_admin') {
          api.logout();
          navigate('/admin/login', { replace: true });
          return;
        }
        setOperator(res.data);
        setAccessState('authorized');
        loadData();
      } else {
        api.logout();
        navigate('/admin/login', { replace: true });
      }
    }).catch(() => {
      api.logout();
      navigate('/admin/login', { replace: true });
    });

    return () => { active = false; };
  }, [navigate, loadData]);

  const handleLogout = () => {
    api.logout();
    navigate('/admin/login', { replace: true });
  };

  const formatUptime = (seconds?: number) => {
    if (!seconds) return '0m';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m ${secs}s`;
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      u.full_name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.id?.toLowerCase().includes(term);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const maxVolume = telemetry?.daily_volumes?.reduce((max, d) => Math.max(max, d.amount), 1) || 1;

  if (accessState === 'checking') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 text-primary animate-spin" />
          <p className="text-sm font-medium text-slate-600">Verifying administrator credentials in PostgreSQL…</p>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-shell min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <img src="/assets/logo.png" alt="WhisperLedger" className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <h2 className="text-sm font-extrabold text-slate-950 leading-tight">
                Whisper<span className="text-blue-600">Ledger</span>
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                <Server className="w-2.5 h-2.5" /> POSTGRESQL CLOUD
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-3 mb-2">Operations Center</p>
            
            <button 
              onClick={() => setActiveTab('telemetry')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'telemetry' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Cloud Telemetry & Graphs</span>
            </button>

            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'users' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>PostgreSQL Users</span>
              {users.length > 0 && (
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === 'users' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {users.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'metrics' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Platform Scale & KPIs</span>
            </button>

            <button 
              onClick={() => setActiveTab('control')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'control' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>GCP & DB Shortcuts</span>
            </button>
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
              {operator?.full_name ? operator.full_name[0].toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{operator?.full_name || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 font-mono truncate">{operator?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 capitalize">
                {activeTab === 'telemetry' && 'Cloud Telemetry, Metrics & System Logs'}
                {activeTab === 'users' && 'PostgreSQL User Directory'}
                {activeTab === 'metrics' && 'Platform Performance & Outflow Scale'}
                {activeTab === 'control' && 'Infrastructure & External Console Shortcuts'}
              </h1>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud Run
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Service: <span className="font-mono text-slate-700 font-semibold">{telemetry?.service || 'whisperledger-api'}</span>
              {' • '}Revision: <span className="font-mono text-slate-700 font-semibold">{telemetry?.revision || 'whisperledger-api-00003-pjb'}</span>
              {pingMs !== null && ` • ${pingMs}ms latency`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsRefreshing(true);
                loadData();
              }}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing…' : 'Refresh Telemetry'}</span>
            </button>
          </div>
        </header>

        {/* Tab 1: Cloud Telemetry & Graphs */}
        {activeTab === 'telemetry' && (
          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Spending Volume Tracked</span>
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  ₹{(metrics?.total_volume_tracked || 0).toLocaleString('en-IN')}
                </p>
                <span className="text-[11px] text-emerald-600 font-medium">Persisted in PostgreSQL</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">PostgreSQL Users</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{metrics?.total_users || users.length || 0}</p>
                <span className="text-[11px] text-slate-500">{metrics?.active_users_7_days || 0} active in last 7 days</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Neon Database Pool</span>
                  <Database className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-2xl font-extrabold text-purple-600">
                  {telemetry?.db_pool_acquired ?? 0} active / {telemetry?.db_pool_idle ?? 0} idle
                </p>
                <span className="text-[11px] text-slate-500">Max connections: {telemetry?.db_pool_total ?? 10}</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Cloud Run Memory & Uptime</span>
                  <Cpu className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {(telemetry?.memory_alloc_mb || 0).toFixed(1)} MB
                </p>
                <span className="text-[11px] text-slate-500">
                  Sys: {(telemetry?.memory_sys_mb || 0).toFixed(1)} MB • Uptime: {formatUptime(telemetry?.uptime_seconds)}
                </span>
              </div>
            </div>

            {/* 14-Day Volume Interactive Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">14-Day Spending Volume Trend</h3>
                  <p className="text-xs text-slate-500">Daily ledger volume aggregates computed from PostgreSQL</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                  14-Day Historical Window
                </span>
              </div>

              {telemetry?.daily_volumes && telemetry.daily_volumes.length > 0 ? (
                <div className="h-56 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 overflow-x-auto">
                  {telemetry.daily_volumes.map((d, index) => {
                    const heightPercent = Math.max(12, Math.round((d.amount / maxVolume) * 100));
                    return (
                      <div key={index} className="flex-1 min-w-[48px] flex flex-col items-center gap-2 group relative">
                        {/* Hover Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap pointer-events-none z-20">
                          ₹{d.amount.toLocaleString('en-IN')} ({d.count} txns)
                        </div>
                        <div className="w-full flex items-end justify-center h-40">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[36px] bg-blue-500 hover:bg-blue-600 rounded-t-lg transition-all duration-300"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{d.date.slice(5)}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-44 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <BarChart3 className="w-8 h-8 text-slate-300" />
                  <p className="text-xs">No volume records logged in the last 14 days yet.</p>
                </div>
              )}
            </div>

            {/* Runtime & System Logs Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Infrastructure Spec Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs lg:col-span-1 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-600" /> Infrastructure Spec
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Service</span>
                    <span className="font-mono font-semibold text-slate-900">{telemetry?.service || 'whisperledger-api'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">GCP Region</span>
                    <span className="font-mono font-semibold text-slate-900">{telemetry?.region || 'asia-south1'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Active Revision</span>
                    <span className="font-mono font-semibold text-slate-900">{telemetry?.revision || 'whisperledger-api-00003-pjb'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Environment</span>
                    <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {telemetry?.environment || 'production'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Go Runtime</span>
                    <span className="font-mono font-semibold text-slate-900">{telemetry?.go_version || 'go1.26.9'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Neon Database Engine</span>
                    <span className="font-mono font-semibold text-slate-900">PostgreSQL 17 (Serverless)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Cloud Shortcuts</h4>
                  <div className="space-y-2">
                    <a
                      href={telemetry?.gcp_console_links?.cloud_run || 'https://console.cloud.google.com/run'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-blue-600" /> Cloud Run Console
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                    <a
                      href={telemetry?.gcp_console_links?.cloud_logging || 'https://console.cloud.google.com/logs'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-purple-600" /> Cloud Logs Explorer
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                    <a
                      href={telemetry?.gcp_console_links?.neon_console || 'https://console.neon.tech/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-emerald-600" /> Neon DB Console
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Real-time Operational Event Log Feed */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs lg:col-span-2 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">Live Operational System Log Stream</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PostgreSQL Audit Feed</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 max-h-[460px] pr-1">
                  {telemetry?.recent_logs && telemetry.recent_logs.length > 0 ? (
                    telemetry.recent_logs.map((log, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 text-xs space-y-1 transition"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                                log.level === 'ERROR'
                                  ? 'bg-rose-100 text-rose-700'
                                  : log.level === 'WARN'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {log.level}
                            </span>
                            <span className="text-[11px] font-bold text-slate-700 capitalize">[{log.source}]</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-800 font-mono text-[11px] leading-relaxed break-words">{log.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-slate-400 text-xs">No events logged yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PostgreSQL Users Directory */}
        {activeTab === 'users' && (
          <div className="p-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, or user ID…"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-900 outline-none focus:border-blue-600 transition"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none"
                  >
                    <option value="all">All Roles</option>
                    <option value="platform_admin">Platform Admin</option>
                    <option value="household_admin">Household Admin</option>
                    <option value="user">Regular User</option>
                  </select>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Showing {filteredUsers.length} of {users.length} PostgreSQL users
              </span>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">User</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Registered Date</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                                {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{user.full_name || 'Anonymous'}</p>
                                <p className="text-[11px] text-slate-500 font-mono">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                                user.role === 'platform_admin' || user.role === 'admin'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : user.role === 'household_admin'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-semibold ${
                                user.is_active ? 'text-emerald-600' : 'text-slate-400'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                              />
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No users matched your filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Platform Scale & KPIs */}
        {activeTab === 'metrics' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Volume Processed</span>
                <p className="text-3xl font-black text-slate-900">
                  ₹{(metrics?.total_volume_tracked || 0).toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-400">Aggregated across all personal and household ledgers</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expenses Logged</span>
                <p className="text-3xl font-black text-blue-600">
                  {metrics?.total_expenses_tracked || 0}
                </p>
                <p className="text-xs text-slate-400">Total expense records tracked in PostgreSQL</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Households Formed</span>
                <p className="text-3xl font-black text-purple-600">
                  {metrics?.total_households || 0}
                </p>
                <p className="text-xs text-slate-400">Multi-tenant group ledgers with pairwise debt calculation</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Platform Performance Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="font-semibold text-slate-700">Minimum-Cash-Flow Settler</span>
                  <p className="text-slate-500 leading-relaxed">
                    Graph debt minimization executes in O(N log N) time on the Go microservice using max/min balance heaps.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="font-semibold text-slate-700">Financial Detective Engine</span>
                  <p className="text-slate-500 leading-relaxed">
                    Audits money leaks, recurring phantom subscriptions, and calculate dynamic safe-to-spend limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: System Shortcuts & Operations */}
        {activeTab === 'control' && (
          <div className="p-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Direct Infrastructure Operations</h3>
              <p className="text-xs text-slate-500">
                Quickly access Google Cloud Run, Cloud Logging Explorer, Cloud Build, and Neon Serverless Database.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href="https://console.cloud.google.com/run/detail/asia-south1/whisperledger-api/metrics?project=whisperledger-94715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-blue-600" /> Cloud Run Metrics
                    </span>
                    <p className="text-[11px] text-slate-500">View CPU, memory, latency percentiles, and request counts.</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://console.cloud.google.com/logs/query?project=whisperledger-94715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-200 hover:border-purple-400 hover:shadow-sm transition flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 text-purple-600" /> Cloud Logging Explorer
                    </span>
                    <p className="text-[11px] text-slate-500">Real-time structured stdout/stderr streaming from Go microservice.</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://console.neon.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-emerald-600" /> Neon Database Console
                    </span>
                    <p className="text-[11px] text-slate-500">Inspect PostgreSQL branches, storage size, and active connection pools.</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://github.com/WhisperLedger/whisperledger-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-sm transition flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-slate-700" /> GitHub Repository
                    </span>
                    <p className="text-[11px] text-slate-500">View Go source code, database migrations, and CI/CD workflow status.</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* User Inspection Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">User Details (PostgreSQL)</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">User ID</span>
                <p className="font-mono text-[11px] text-slate-800 break-all">{selectedUser.id}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Full Name</span>
                <p className="font-semibold text-slate-900">{selectedUser.full_name || 'N/A'}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Email Address</span>
                <p className="font-mono text-slate-800">{selectedUser.email}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">System Role</span>
                <p className="font-semibold text-slate-900 capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Account Created</span>
                <p className="text-slate-700">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : 'N/A'}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
