import React, { useState } from 'react';
import { Bell, CheckCircle2, Home, Mic, Plus, UsersRound } from 'lucide-react';

type ProductMode = 'personal' | 'household' | 'recovery';

const modes: Array<{ id: ProductMode; label: string }> = [
  { id: 'personal', label: 'Daily Tracker' },
  { id: 'household', label: 'Household Space' },
  { id: 'recovery', label: 'Money Recovery' },
];

/** Interactive marketing rendition of WhisperLedger's three real product spaces. */
export const ProductShowcase: React.FC = () => {
  const [mode, setMode] = useState<ProductMode>('personal');
  const [reviewed, setReviewed] = useState(false);
  const isPersonal = mode === 'personal';
  const isHousehold = mode === 'household';

  const view = isPersonal
    ? { title: 'Daily Tracker', totalLabel: 'Total spent', amount: '₹1,830', date: 'Today · 16 October', count: '4 items' }
    : isHousehold
      ? { title: 'Household Ledger', totalLabel: 'Total flat spend this month', amount: '₹18,600', date: 'Maple House · October', count: '12 spends' }
      : { title: 'Money Recovery', totalLabel: 'Expected back', amount: '₹1,450', date: '2 open recovery cases', count: '1 due soon' };

  return (
    <div className="product-showcase animate-premium-in" aria-label="Interactive WhisperLedger app preview">
      <div className="product-orb product-orb-lilac" aria-hidden="true" />
      <div className="product-orb product-orb-mint" aria-hidden="true" />
      <div className="product-showcase-controls" role="tablist" aria-label="WhisperLedger product spaces">
        {modes.map((item) => <button key={item.id} role="tab" aria-selected={mode === item.id} className={mode === item.id ? 'is-selected' : ''} onClick={() => setMode(item.id)}>{item.label}</button>)}
      </div>
      <aside className="product-float product-float-capture"><span className="product-float-icon product-float-icon-lilac"><Mic size={15} /></span><div><p>Quick capture</p><strong>Voice note ready</strong></div></aside>
      <div className="product-phone"><div className="product-phone-speaker" /><div className="product-screen">
        <div className="product-status"><span>9:41</span><span>● ● ●</span></div>
        <div className="product-greeting"><div><p>Good day, Alex</p><strong>{view.title}</strong></div><span><Bell size={11} /></span></div>
        <div className="product-space-switch"><span className={isPersonal ? 'is-active' : ''}>Personal</span><span className={isHousehold ? 'is-active' : ''}><Home size={9} /> Flat</span></div>
        <section className="product-balance"><p>{view.totalLabel}</p><h3>{view.amount}</h3><div><span>{view.date}</span><strong>{view.count}</strong></div></section>
        {isPersonal && <><div className="product-recovery"><div><p>Money Recovery</p><strong>₹1,450 expected back</strong></div><span>›</span></div><CalendarStrip /><TransactionList items={[['C', 'Café breakfast', 'Food · 9:18 AM', '−₹280', 'coffee'], ['U', 'Uber', 'Travel · Captured', '−₹480', 'ride']]} /><div className={`product-review ${reviewed ? 'is-reviewed' : ''}`}><div><p>{reviewed ? 'Saved to your ledger' : 'Capture to review'}</p><strong>Uber · ₹480</strong></div><button onClick={() => setReviewed(true)} disabled={reviewed}>{reviewed ? <CheckCircle2 size={15} /> : 'Review'}</button></div></>}
        {isHousehold && <><div className="product-household-status"><div><p>You get back in total</p><strong>₹2,420</strong></div><button>Settle up</button></div><TransactionList items={[['G', 'Monthly groceries', 'Aarav paid · your share ₹1,400', '₹4,200', 'ride'], ['R', 'Rent', 'Shared with 3 flatmates', '₹12,000', 'coffee']]} /><div className="product-review"><div><p>Pending split request</p><strong>Groceries · ₹1,400</strong></div><button>Accept</button></div></>}
        {mode === 'recovery' && <><div className="product-recovery-status"><span>1</span><div><p>Action needed</p><strong>Refund expected tomorrow</strong></div></div><TransactionList items={[['S', 'Swiggy cancellation', 'Expected 16 October', '₹450', 'ride'], ['A', 'Amazon return', 'Expected 18 October', '₹1,000', 'coffee']]} /><div className="product-recovery-note"><p>Keep the original purchase, expected date and support notes together until the refund lands.</p></div></>}
        <div className="product-add-expense" aria-hidden="true"><Plus size={12} /></div>
        <nav className="product-tabbar"><span>⌂<i>Home</i></span><span>◫<i>History</i></span><span>◌<i>Profile</i></span></nav>
      </div></div>
      <aside className="product-float product-float-split"><span className="product-float-icon product-float-icon-mint"><UsersRound size={15} /></span><div><p>Household Space</p><strong>Split & settle together</strong></div></aside>
      <aside className="product-float product-float-refund"><span className="product-float-icon product-float-icon-peach">₹</span><div><p>Pending refund</p><strong>₹1,450 · 2 days left</strong></div></aside>
    </div>
  );
};

const CalendarStrip: React.FC = () => <div className="product-days" aria-hidden="true"><span><i>Su</i>12</span><span><i>Mo</i>13</span><span><i>Tu</i>14</span><span className="is-today"><i>We</i>15</span><span><i>Th</i>16</span></div>;

const TransactionList: React.FC<{ items: Array<[string, string, string, string, 'coffee' | 'ride']> }> = ({ items }) => <section className="product-activity"><div className="product-section-heading"><p>Transactions</p><span>Today</span></div>{items.map(([initial, title, subtitle, amount, tone]) => <div className="product-transaction" key={title}><span className={`product-merchant product-merchant-${tone}`}>{initial}</span><div><strong>{title}</strong><p>{subtitle}</p></div><b>{amount}</b></div>)}</section>;
