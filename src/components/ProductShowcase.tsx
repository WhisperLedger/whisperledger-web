import React, { useState, useEffect } from 'react';
import { Bell, Home, Mic, Plus, UsersRound, RefreshCw, Check } from 'lucide-react';

type SpaceTab = 'daily' | 'household' | 'recovery';

const TABS: SpaceTab[] = ['daily', 'household', 'recovery'];

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SpaceTab>('daily');
  const [isPaused, setIsPaused] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [is12Hour, setIs12Hour] = useState(false);

  const getLiveTime = (use12Hour: boolean) => {
    const now = new Date();
    if (use12Hour) {
      return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState(() => getLiveTime(false));

  // Keep phone status clock synced to live local time
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getLiveTime(is12Hour));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [is12Hour]);

  // Automatic rotation between the 3 core spaces every 4.5 seconds (pauses on user hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const nextIndex = (TABS.indexOf(prevTab) + 1) % TABS.length;
        return TABS[nextIndex];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="product-showcase"
      aria-label="WhisperLedger product preview"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="product-orb product-orb-lilac" aria-hidden="true" />
      <div className="product-orb product-orb-mint" aria-hidden="true" />

      {/* Interactive Top Space Switcher with Auto-Cycle */}
      <div className="product-showcase-controls" role="tablist" aria-label="WhisperLedger spaces">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'daily'}
          onClick={() => {
            setActiveTab('daily');
          }}
          className={activeTab === 'daily' ? 'is-selected' : ''}
          title="Daily expense & SMS review tracker"
        >
          Daily tracker
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'household'}
          onClick={() => {
            setActiveTab('household');
          }}
          className={activeTab === 'household' ? 'is-selected' : ''}
          title="Shared household & flat splits"
        >
          Household space
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'recovery'}
          onClick={() => {
            setActiveTab('recovery');
          }}
          className={activeTab === 'recovery' ? 'is-selected' : ''}
          title="Money due back & refunds recovery"
        >
          Money recovery
        </button>
      </div>

      {/* Floating Interactive Badge 1: Quick Capture */}
      <aside
        className={`product-float product-float-capture cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
          activeTab === 'daily' ? 'ring-2 ring-blue-500/40 shadow-lg' : 'opacity-85'
        }`}
        onClick={() => setActiveTab('daily')}
        title="Switch to Daily Tracker"
      >
        <span className="product-float-icon product-float-icon-lilac">
          <Mic size={15} />
        </span>
        <div>
          <p>Quick capture</p>
          <strong>Say it as it happened</strong>
        </div>
      </aside>

      {/* Phone Mockup Container */}
      <div className="product-phone">
        <div className="product-phone-speaker" />
        <div className="product-screen">
          {/* Live Status Bar Clock (Interactive 12h/24h toggle) */}
          <div
            className="product-status cursor-pointer select-none transition hover:opacity-75"
            onClick={() => setIs12Hour(!is12Hour)}
            title="Live device clock (Click to toggle 12h/24h format)"
          >
            <span className="font-semibold tracking-tight">{currentTime}</span>
            <span className="text-[7px] tracking-widest opacity-80">5G ● ● ●</span>
          </div>

          {/* Tab 1: Daily Tracker */}
          {activeTab === 'daily' && (
            <div key="daily" className="flex flex-col h-full animate-premium-in">
              <div className="product-greeting">
                <div>
                  <p>Good day, Alex</p>
                  <strong>Daily tracker</strong>
                </div>
                <span><Bell size={11} aria-hidden="true" /></span>
              </div>

              <div className="product-space-switch">
                <button type="button" className="is-active" onClick={() => setActiveTab('daily')}>Personal</button>
                <button type="button" onClick={() => setActiveTab('household')}><Home size={9} aria-hidden="true" /> Flat</button>
              </div>

              <section className="product-balance">
                <p>Total spent</p>
                <h2>₹1,830</h2>
                <div>
                  <span>Today · 16 October</span>
                  <strong>3 items</strong>
                </div>
              </section>

              <button
                type="button"
                onClick={() => setActiveTab('recovery')}
                className="product-recovery w-full text-left transition hover:bg-emerald-100/60"
                title="View Money Recovery"
              >
                <div>
                  <p>Money due back</p>
                  <strong>₹1,450 expected back</strong>
                </div>
                <span>›</span>
              </button>

              <CalendarStrip />

              <section className="product-activity" aria-label="Transactions preview">
                <div className="product-section-heading">
                  <p>Transactions</p>
                  <span>Today</span>
                </div>
                <Transaction initial="C" name="Café breakfast" detail="Food · 9:18 AM" amount="−₹280" tone="coffee" />
                <Transaction initial="U" name="Uber to office" detail="Travel · Auto-captured" amount="−₹480" tone="ride" />
              </section>

              <section className="product-review">
                <div>
                  <p>{reviewed ? 'Approved & Logged' : 'Capture to review'}</p>
                  <strong>{reviewed ? 'Added to personal ledger' : 'Uber · ₹480'}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setReviewed(!reviewed)}
                  className={`product-review-action transition active:scale-95 ${reviewed ? '!bg-emerald-600' : '!bg-[#0066ff]'}`}
                >
                  {reviewed ? 'Done ✓' : 'Review'}
                </button>
              </section>
            </div>
          )}

          {/* Tab 2: Household Space */}
          {activeTab === 'household' && (
            <div key="household" className="flex flex-col h-full animate-premium-in">
              <div className="product-greeting">
                <div>
                  <p>Flat 402 Ledger</p>
                  <strong>Household space</strong>
                </div>
                <span><UsersRound size={11} aria-hidden="true" /></span>
              </div>

              <div className="product-space-switch">
                <button type="button" onClick={() => setActiveTab('daily')}>Personal</button>
                <button type="button" className="is-active" onClick={() => setActiveTab('household')}><Home size={9} aria-hidden="true" /> Flat</button>
              </div>

              <section className="product-balance !bg-[#101827]">
                <p>Your flat balance</p>
                <h2 className="!text-emerald-400">+₹1,400</h2>
                <div>
                  <span>You are owed back</span>
                  <strong>3 flatmates active</strong>
                </div>
              </section>

              <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[8px] flex items-center justify-between">
                <span className="font-semibold text-slate-600">October total</span>
                <span className="font-bold text-slate-900">₹24,800 spent</span>
              </div>

              <section className="product-activity mt-2" aria-label="Shared bills">
                <div className="product-section-heading">
                  <p>Shared expenses</p>
                  <span className="text-emerald-600 font-bold">Split clear</span>
                </div>
                <Transaction initial="R" name="Rohan · Groceries" detail="₹1,200 · Split 3 ways" amount="You: ₹400" tone="coffee" />
                <Transaction initial="P" name="Priya · Fiber Wi-Fi" detail="₹999 · Split 3 ways" amount="You: ₹333" tone="ride" />
              </section>

              <section className="product-review !bg-emerald-50 !border-emerald-200">
                <div>
                  <p className="!text-emerald-800">Pending settlement</p>
                  <strong className="!text-emerald-950">Rohan owes you ₹600</strong>
                </div>
                <span className="product-review-action !bg-emerald-600 cursor-default">Settle</span>
              </section>
            </div>
          )}

          {/* Tab 3: Money Recovery */}
          {activeTab === 'recovery' && (
            <div key="recovery" className="flex flex-col h-full animate-premium-in">
              <div className="product-greeting">
                <div>
                  <p>Refunds &amp; Returns</p>
                  <strong>Money recovery</strong>
                </div>
                <span><RefreshCw size={11} aria-hidden="true" /></span>
              </div>

              <div className="product-space-switch">
                <button type="button" className="is-active">Pending (2)</button>
                <button type="button" className="opacity-70">Settled (1)</button>
              </div>

              <section className="product-balance !bg-gradient-to-br !from-amber-500 !to-amber-600">
                <p>Expected back to bank</p>
                <h2>₹1,450</h2>
                <div>
                  <span>2 orders pending</span>
                  <strong>₹450 received</strong>
                </div>
              </section>

              <div className="mt-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-[8px] flex items-center justify-between">
                <span className="font-semibold text-amber-800">Next credit due</span>
                <span className="font-bold text-amber-950">Amazon · Tomorrow</span>
              </div>

              <section className="product-activity mt-2" aria-label="Pending refunds">
                <div className="product-section-heading">
                  <p>Pending trackers</p>
                  <span className="text-amber-600 font-bold">1-day due</span>
                </div>
                <Transaction initial="A" name="Amazon Order Return" detail="Shoes · Expected Tomorrow" amount="₹1,000" tone="coffee" />
                <Transaction initial="S" name="Swiggy Cancellation" detail="Auto refund · Axis Bank" amount="₹450" tone="ride" />
              </section>

              <section className="product-review !bg-amber-50 !border-amber-200">
                <div>
                  <p className="!text-amber-800">Refund alert</p>
                  <strong className="!text-amber-950">Amazon ₹1,000 due soon</strong>
                </div>
                <span className="product-review-action !bg-amber-600 cursor-default">Follow</span>
              </section>
            </div>
          )}

          <div className="product-add-expense" aria-hidden="true"><Plus size={12} /></div>
          <nav className="product-tabbar" aria-label="App navigation preview">
            <button type="button" className={activeTab === 'daily' ? '!text-[#0066ff]' : ''} onClick={() => setActiveTab('daily')}>⌂<i>Personal</i></button>
            <button type="button" className={activeTab === 'household' ? '!text-[#0066ff]' : ''} onClick={() => setActiveTab('household')}>◫<i>Household</i></button>
            <button type="button" className={activeTab === 'recovery' ? '!text-[#0066ff]' : ''} onClick={() => setActiveTab('recovery')}>◌<i>Recovery</i></button>
          </nav>
        </div>
      </div>

      {/* Floating Interactive Badge 2: Household Space */}
      <aside
        className={`product-float product-float-split cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
          activeTab === 'household' ? 'ring-2 ring-emerald-500/40 shadow-lg' : 'opacity-85'
        }`}
        onClick={() => setActiveTab('household')}
        title="Switch to Household Space"
      >
        <span className="product-float-icon product-float-icon-mint">
          <UsersRound size={15} />
        </span>
        <div>
          <p>Household space</p>
          <strong>Keep the shared picture clear</strong>
        </div>
      </aside>

      {/* Floating Interactive Badge 3: Money Recovery */}
      <aside
        className={`product-float product-float-refund cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
          activeTab === 'recovery' ? 'ring-2 ring-amber-500/40 shadow-lg' : 'opacity-85'
        }`}
        onClick={() => setActiveTab('recovery')}
        title="Switch to Money Recovery"
      >
        <span className="product-float-icon product-float-icon-peach">₹</span>
        <div>
          <p>Pending refund</p>
          <strong>₹1,450 · 2 days left</strong>
        </div>
      </aside>
    </div>
  );
};

const CalendarStrip: React.FC = () => (
  <div className="product-days" aria-hidden="true">
    <span><i>Su</i>12</span>
    <span><i>Mo</i>13</span>
    <span><i>Tu</i>14</span>
    <span className="is-today"><i>We</i>15</span>
    <span><i>Th</i>16</span>
  </div>
);

const Transaction: React.FC<{ initial: string; name: string; detail: string; amount: string; tone: 'coffee' | 'ride' }> = ({
  initial,
  name,
  detail,
  amount,
  tone,
}) => (
  <div className="product-transaction">
    <span className={`product-merchant product-merchant-${tone}`}>{initial}</span>
    <div>
      <strong>{name}</strong>
      <p>{detail}</p>
    </div>
    <b>{amount}</b>
  </div>
);
