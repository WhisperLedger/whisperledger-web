import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Activity, LogOut, RefreshCw, Crown, Bell, Send, 
  ExternalLink, Server, Database, Cpu, Clock, CheckCircle2,
  AlertTriangle, Search, Filter, HardDrive, BarChart3,
  Layers, ArrowUpRight, ShieldCheck, Smartphone, Check, X,
  Copy, Shield, DollarSign, Sliders, Info
} from 'lucide-react';
import { 
  api, type User, type AdminMetrics, type CloudTelemetry, type BroadcastNotification 
} from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'notifications' | 'telemetry' | 'costs'>('users');
  const [operator, setOperator] = useState<User | null>(null);
  const [accessState, setAccessState] = useState<'checking' | 'authorized'>('checking');

  // Live Data States
  const [users, setUsers] = useState<User[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [telemetry, setTelemetry] = useState<CloudTelemetry | null>(null);
  const [broadcasts, setBroadcasts] = useState<BroadcastNotification[]>([]);

  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Inspector State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectPlan, setInspectPlan] = useState<'pro' | 'starter_free'>('starter_free');
  const [inspectStatus, setInspectStatus] = useState<'active' | 'suspended' | 'flagged'>('active');
  const [savingUser, setSavingUser] = useState(false);

  // Notification Composer States
  const [notifTitle, setNotifTitle] = useState('System Maintenance Notice: Database Optimization');
  const [notifBody, setNotifBody] = useState('WhisperLedger services will undergo scheduled database maintenance. No transaction data will be impacted.');
  const [notifImageUrl, setNotifImageUrl] = useState('');
  const [notifAudience, setNotifAudience] = useState<'all' | 'pro_only' | 'single_user'>('all');
  const [notifType, setNotifType] = useState('system');
  const [specificUid, setSpecificUid] = useState('');
  const [sendingNotification, setSendingNotification] = useState(false);

  // UI States
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const loadData = useCallback(async () => {
    const t0 = performance.now();
    try {
      const [mRes, tRes, uRes, bRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getCloudTelemetry(),
        api.getAdminUsers(100, 0),
        api.getBroadcastNotifications(20),
      ]);

      setPingMs(Math.round(performance.now() - t0));

      if (mRes.success && mRes.data) setMetrics(mRes.data);
      if (tRes.success && tRes.data) setTelemetry(tRes.data);
      if (uRes.success && uRes.data) setUsers(uRes.data);
      if (bRes.success && bRes.data) setBroadcasts(bRes.data);
    } catch (err) {
      console.error('Failed to fetch admin operations data:', err);
      showToast('Error syncing telemetry from Cloud API.');
    } finally {
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

  const openInspector = (user: User) => {
    setSelectedUser(user);
    setInspectPlan(user.plan || 'starter_free');
    setInspectStatus(user.status || 'active');
    setInspectorOpen(true);
  };

  const handleSaveUserChanges = async () => {
    if (!selectedUser) return;
    setSavingUser(true);
    try {
      const res = await api.updateUserSubscription(selectedUser.id, inspectPlan, inspectStatus);
      if (res.success) {
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, plan: inspectPlan, status: inspectStatus } : u));
        setInspectorOpen(false);
        showToast(`Saved subscription state for ${selectedUser.full_name || 'user'}.`);
      } else {
        showToast(res.error?.message || 'Could not update user subscription.');
      }
    } catch {
      showToast('Failed to connect to backend server.');
    } finally {
      setSavingUser(false);
    }
  };

  const handleQuickTogglePlan = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const nextPlan = user.plan === 'pro' ? 'starter_free' : 'pro';
    try {
      const res = await api.updateUserSubscription(userId, nextPlan, user.status || 'active');
      if (res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, plan: nextPlan } : u));
        showToast(`Updated ${user.full_name}'s tier to ${nextPlan === 'pro' ? 'Pro' : 'Starter Free'}`);
      }
    } catch {
      showToast('Error updating plan in database.');
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifBody.trim()) {
      showToast('Please provide both notification title and message body.');
      return;
    }
    if (notifAudience === 'single_user' && !specificUid.trim()) {
      showToast('Please enter the target User UUID for single user delivery.');
      return;
    }

    setSendingNotification(true);
    try {
      const deliveredCount = notifAudience === 'all' 
        ? users.length 
        : (notifAudience === 'pro_only' ? users.filter(u => u.plan === 'pro').length : 1);

      const res = await api.sendBroadcastNotification({
        app_name: 'WhisperLedger',
        title: notifTitle.trim(),
        body: notifBody.trim(),
        image_url: notifImageUrl.trim() || undefined,
        target: notifAudience,
        target_user_id: notifAudience === 'single_user' ? specificUid.trim() : null,
        type: notifType,
        delivered_count: deliveredCount,
      });

      if (res.success && res.data) {
        setBroadcasts([res.data, ...broadcasts]);
        showToast(`Notification broadcast dispatched to ${deliveredCount} recipient devices.`);
      } else {
        showToast(res.error?.message || 'Failed to dispatch broadcast.');
      }
    } catch {
      showToast('Error transmitting notification to Cloud API.');
    } finally {
      setSendingNotification(false);
    }
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
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchesPlan = planFilter === 'all' || u.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalUsers = users.length;
  const proUsers = users.filter(u => u.plan === 'pro').length;
  const maxVolume = telemetry?.daily_volumes?.reduce((max, d) => Math.max(max, d.amount), 1) || 1;

  if (accessState === 'checking') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-5 h-5 text-slate-600 animate-spin" />
          <p className="text-xs font-medium text-slate-500 font-mono">Authenticating Operator Session…</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f1117] text-slate-100">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white text-xs font-medium px-4 py-3 rounded-lg shadow-2xl border border-slate-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#161922] border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand & Console Title */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <img src="/assets/logo.png" alt="WhisperLedger" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">WhisperLedger</h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Operations Console</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 px-3 mb-2">Management</p>
            
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'users' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Accounts</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {users.length}
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'notifications' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Push Dispatcher</span>
              {broadcasts.length > 0 && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {broadcasts.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('telemetry')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'telemetry' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Cloud Telemetry</span>
            </button>

            <button 
              onClick={() => setActiveTab('costs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'costs' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>GCP Cost Guardrails</span>
            </button>
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-md bg-blue-950 text-blue-400 border border-blue-800 font-bold flex items-center justify-center text-xs">
              {operator?.full_name ? operator.full_name[0].toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{operator?.full_name || 'Admin'}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{operator?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </aside>

      {/* Main Operations Body */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0f1117]">
        {/* Top Header Bar */}
        <header className="bg-[#161922] border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-sm font-semibold text-white">
                {activeTab === 'users' && 'User Accounts & Entitlements'}
                {activeTab === 'notifications' && 'Push Notification Broadcast Center'}
                {activeTab === 'telemetry' && 'Database Pool & Runtime Telemetry'}
                {activeTab === 'costs' && 'GCP Scaling & Cost Protection Safeguards'}
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span>Region: <strong className="text-slate-300 font-mono">asia-south1</strong></span>
                <span>•</span>
                <span>Container: <strong className="text-slate-300 font-mono">{telemetry?.revision || 'whisperledger-api-00005-s7c'}</strong></span>
                {pingMs !== null && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-400 font-mono">{pingMs}ms latency</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsRefreshing(true);
                loadData();
              }}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing…' : 'Sync Telemetry'}</span>
            </button>
          </div>
        </header>

        {/* TAB 1: User Accounts & Subscriptions */}
        {activeTab === 'users' && (
          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Total Users</span>
                <p className="text-xl font-bold text-white mt-1">{totalUsers}</p>
                <span className="text-[10px] text-slate-500 font-mono">Registered accounts</span>
              </div>
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Pro Tier Subscribers</span>
                <p className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-1.5">
                  <Crown className="w-4 h-4" /> {proUsers}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Unlimited features</span>
              </div>
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Active Accounts</span>
                <p className="text-xl font-bold text-emerald-400 mt-1">
                  {users.filter(u => u.status === 'active').length}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Good standing</span>
              </div>
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Suspended / Flagged</span>
                <p className="text-xl font-bold text-rose-400 mt-1">
                  {users.filter(u => u.status === 'flagged' || u.status === 'suspended').length}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Requires review</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-[#161922] p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Filter by name, email or UUID…"
                    className="w-full bg-[#0f1117] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-slate-600 transition"
                  />
                </div>
                <select
                  value={planFilter}
                  onChange={(e) => {
                    setPlanFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-[#0f1117] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                >
                  <option value="all">All Plans</option>
                  <option value="pro">Pro Only</option>
                  <option value="starter_free">Starter Free Only</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-[#0f1117] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>

              <span className="text-xs text-slate-400">
                Showing {paginatedUsers.length} of {filteredUsers.length} records
              </span>
            </div>

            {/* Table */}
            <div className="bg-[#161922] rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#12141c] border-b border-slate-800 text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">UUID</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Subscription</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Push Device</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/30 transition">
                          <td className="py-3 px-4 font-sans">
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                                {u.full_name ? u.full_name[0].toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="font-medium text-white">{u.full_name || 'Anonymous'}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <button
                              onClick={() => copyToClipboard(u.id)}
                              className="hover:text-white flex items-center gap-1 group text-left"
                              title="Click to copy UUID"
                            >
                              <span>{u.id.slice(0, 8)}…</span>
                              <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] text-slate-300 capitalize">{u.role}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                              u.plan === 'pro'
                                ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {u.plan === 'pro' && <Crown className="w-2.5 h-2.5" />}
                              {u.plan === 'pro' ? 'Pro' : 'Starter Free'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-sans">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                              u.status === 'active'
                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                                : u.status === 'flagged'
                                ? 'bg-amber-950/40 text-amber-400 border border-amber-800/40'
                                : 'bg-rose-950/40 text-rose-400 border border-rose-800/40'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-sans text-slate-400">
                            {u.push_ready ? (
                              <span className="text-emerald-400 text-[10px]">Registered</span>
                            ) : (
                              <span className="text-slate-500 text-[10px]">No token</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 font-sans">
                            <button
                              onClick={() => handleQuickTogglePlan(u.id)}
                              className="text-[10px] text-slate-300 hover:text-white hover:underline"
                            >
                              {u.plan === 'pro' ? 'Set Free' : 'Set Pro'}
                            </button>
                            <button
                              onClick={() => openInspector(u)}
                              className="px-2 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-white rounded transition"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                          No users matched the search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Page {currentPage} of {totalPages}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Push Notifications Dispatcher */}
        {activeTab === 'notifications' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notification Composer */}
              <div className="bg-[#161922] p-5 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Broadcast Dispatch Composer</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Push notifications to WhisperLedger Android client devices.</p>
                </div>

                <form onSubmit={handleSendNotification} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Notification Category</label>
                    <select
                      value={notifType}
                      onChange={(e) => setNotifType(e.target.value)}
                      className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                    >
                      <option value="system">System Notification</option>
                      <option value="security">Security Alert</option>
                      <option value="update">Feature Update</option>
                      <option value="promo">Product Communication</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target Audience</label>
                    <select
                      value={notifAudience}
                      onChange={(e) => setNotifAudience(e.target.value as any)}
                      className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                    >
                      <option value="all">All Registered Devices ({users.length} accounts)</option>
                      <option value="pro_only">Pro Tier Subscribers Only ({users.filter(u => u.plan === 'pro').length} accounts)</option>
                      <option value="single_user">Specific User UUID</option>
                    </select>
                  </div>

                  {notifAudience === 'single_user' && (
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Target User UUID</label>
                      <input
                        type="text"
                        value={specificUid}
                        onChange={(e) => setSpecificUid(e.target.value)}
                        placeholder="e.g. 72e91e48-3957-512c-807d-336d951aad85"
                        className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white font-mono placeholder-slate-500 outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Message Title</label>
                    <input
                      type="text"
                      value={notifTitle}
                      onChange={(e) => setNotifTitle(e.target.value)}
                      placeholder="e.g. Scheduled Service Maintenance Window"
                      className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Message Body</label>
                    <textarea
                      rows={4}
                      value={notifBody}
                      onChange={(e) => setNotifBody(e.target.value)}
                      placeholder="Enter operational notice or update details…"
                      className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Banner Image URL (Optional)</label>
                    <input
                      type="text"
                      value={notifImageUrl}
                      onChange={(e) => setNotifImageUrl(e.target.value)}
                      placeholder="https://…"
                      className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white font-mono placeholder-slate-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sendingNotification}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 mt-4"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sendingNotification ? 'Transmitting…' : 'Transmit Broadcast'}</span>
                  </button>
                </form>
              </div>

              {/* Delivery History */}
              <div className="bg-[#161922] p-5 rounded-xl border border-slate-800 lg:col-span-2 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Broadcast Transmission Log</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Historical dispatches recorded in PostgreSQL.</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                    {broadcasts.length} recorded
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[500px]">
                  {broadcasts.length > 0 ? (
                    broadcasts.map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-lg border border-slate-800 bg-[#0f1117] space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-mono bg-blue-950 text-blue-400 border border-blue-800">
                              {b.type}
                            </span>
                            <span className="font-semibold text-white">{b.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(b.sent_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">{b.body}</p>
                        <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                          <span>Target: <strong className="text-slate-200">{b.target}</strong></span>
                          <span>Delivered: <strong className="text-slate-200">{b.delivered_count} accounts</strong></span>
                          <span className="text-emerald-400 font-medium">Status: {b.dispatch_status}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No notifications have been dispatched yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Cloud Telemetry & Graphs */}
        {activeTab === 'telemetry' && (
          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Total Tracked Volume</span>
                <p className="text-xl font-bold text-white mt-1">
                  ₹{(metrics?.total_volume_tracked || 0).toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">102 ledger transactions</span>
              </div>
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Neon PostgreSQL Pool</span>
                <p className="text-xl font-bold text-purple-400 mt-1 font-mono">
                  {telemetry?.db_pool_acquired ?? 0} active / {telemetry?.db_pool_idle ?? 0} idle
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Max conns: {telemetry?.db_pool_total ?? 10}</span>
              </div>
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Container Memory</span>
                <p className="text-xl font-bold text-white mt-1 font-mono">
                  {(telemetry?.memory_alloc_mb || 0).toFixed(1)} MB
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Allocated of 512 MB</span>
              </div>
              <div className="bg-[#161922] p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">Service Uptime</span>
                <p className="text-xl font-bold text-white mt-1 font-mono">
                  {formatUptime(telemetry?.uptime_seconds)}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Go {telemetry?.go_version || '1.26'}</span>
              </div>
            </div>

            {/* 14-Day Spending Volume Histogram */}
            <div className="bg-[#161922] p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">14-Day Spending Volume Distribution</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Aggregated ledger velocity from PostgreSQL.</p>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                  14-Day Window
                </span>
              </div>

              {telemetry?.daily_volumes && telemetry.daily_volumes.length > 0 ? (
                <div className="h-48 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-800 overflow-x-auto">
                  {telemetry.daily_volumes.map((d, index) => {
                    const heightPercent = Math.max(15, Math.round((d.amount / maxVolume) * 100));
                    return (
                      <div key={index} className="flex-1 min-w-[50px] flex flex-col items-center gap-2 group relative">
                        <div className="opacity-0 group-hover:opacity-100 transition absolute -top-10 bg-slate-800 text-white text-[10px] font-mono py-1 px-2 rounded shadow-lg whitespace-nowrap pointer-events-none z-20">
                          ₹{d.amount.toLocaleString('en-IN')} ({d.count} txns)
                        </div>
                        <div className="w-full flex items-end justify-center h-36">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[32px] bg-blue-500/80 hover:bg-blue-400 rounded-t transition"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{d.date.slice(5)}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-36 flex flex-col items-center justify-center text-slate-500 gap-2">
                  <BarChart3 className="w-6 h-6 text-slate-600" />
                  <p className="text-xs">No volume records logged in the last 14 days yet.</p>
                </div>
              )}
            </div>

            {/* Structured System Events Feed */}
            <div className="bg-[#161922] p-5 rounded-xl border border-slate-800 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-semibold text-white">Operational Event Audit Stream</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">PostgreSQL Stream</span>
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 font-mono text-[11px]">
                {telemetry?.recent_logs && telemetry.recent_logs.length > 0 ? (
                  telemetry.recent_logs.map((log, index) => (
                    <div
                      key={index}
                      className="p-2.5 rounded border border-slate-800 bg-[#0f1117] space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px]">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.2 rounded font-bold ${
                              log.level === 'ERROR'
                                ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                : log.level === 'WARN'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {log.level}
                          </span>
                          <span className="text-slate-400 uppercase">[{log.source}]</span>
                        </div>
                        <span className="text-slate-500">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-normal break-words">{log.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-slate-500 text-xs">No recent log events.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GCP Cost Control & Guardrails */}
        {activeTab === 'costs' && (
          <div className="p-6 space-y-6">
            <div className="bg-[#161922] p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-semibold text-white">GCP Cloud Run Cost & Auto-Scale Guardrails</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Controlled resource consumption to eliminate unexpected cloud billing.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Scale to Zero */}
                <div className="p-4 rounded-lg border border-slate-800 bg-[#0f1117] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" /> Scale-to-Zero Architecture
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      ACTIVE (Min: 0)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cloud Run automatically scales instances down to <strong>zero</strong> during idle periods. Zero CPU/RAM charges accrue when no active requests are being served.
                  </p>
                </div>

                {/* Instance Max Ceiling */}
                <div className="p-4 rounded-lg border border-slate-800 bg-[#0f1117] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-400" /> Maximum Instance Ceiling
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      MAX 2 CONTAINERS
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Prevents runaway horizontal scaling during traffic spikes or denial-of-service attempts by setting a hard limit of 2 concurrent container instances.
                  </p>
                </div>

                {/* Database Connection Pooling */}
                <div className="p-4 rounded-lg border border-slate-800 bg-[#0f1117] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-400" /> Database Connection Pooling
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                      PGX POOL: 10 MAX
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Neon PostgreSQL connection limits are strictly managed with `MaxConns = 10`, `MinConns = 1`, and `MaxConnLifetime = 30m` to prevent connection exhaustion.
                  </p>
                </div>

                {/* Background Polling Guard */}
                <div className="p-4 rounded-lg border border-slate-800 bg-[#0f1117] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" /> Background Polling Policy
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                      MANUAL SYNC
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Continuous background intervals are disabled. Telemetry and metrics are only pulled upon dashboard load or explicit operator request to eliminate unnecessary billable invocations.
                  </p>
                </div>
              </div>

              {/* Direct GCP Console Links */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs font-medium text-slate-400 mb-3">Direct Infrastructure Consoles:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://console.cloud.google.com/run/detail/asia-south1/whisperledger-api/metrics?project=whisperledger-94715"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-[#0f1117] text-xs text-slate-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>GCP Cloud Run Metrics</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <a
                    href="https://console.cloud.google.com/logs/query?project=whisperledger-94715"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-[#0f1117] text-xs text-slate-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>GCP Cloud Logging</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <a
                    href="https://console.neon.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-[#0f1117] text-xs text-slate-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>Neon Database Console</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* User Inspector Modal / Drawer */}
      {selectedUser && inspectorOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#161922] rounded-xl max-w-md w-full border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-white">Account Entitlements & Status</h3>
              <button
                onClick={() => setInspectorOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono">User UUID</span>
                <p className="font-mono text-[11px] text-slate-200 break-all">{selectedUser.id}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono">Full Name</span>
                <p className="font-semibold text-white">{selectedUser.full_name || 'N/A'}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono">Email Address</span>
                <p className="font-mono text-slate-300">{selectedUser.email}</p>
              </div>

              {/* Subscription Tier Form */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Subscription Tier</label>
                  <select
                    value={inspectPlan}
                    onChange={(e) => setInspectPlan(e.target.value as any)}
                    className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="starter_free">Starter Free</option>
                    <option value="pro">Pro (Unlimited Household & Statutory Recovery)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Account Standing</label>
                  <select
                    value={inspectStatus}
                    onChange={(e) => setInspectStatus(e.target.value as any)}
                    className="w-full bg-[#0f1117] border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="active">Active (Normal Access)</option>
                    <option value="flagged">Flagged (Under Audit)</option>
                    <option value="suspended">Suspended (Access Revoked)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setInspectorOpen(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUserChanges}
                disabled={savingUser}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
              >
                {savingUser ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
