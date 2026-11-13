'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lang, t } from '@/lib/i18n';

const AMOUNTS = [10, 20, 50, 100, 200, 500, 1000];
const FEES = { none: 0, ordinario: 10, benemerito: 200 } as const;
type Membership = keyof typeof FEES;

export default function DonationForm({ lang }: { lang: Lang }) {
  const d = t(lang).form;
  const router = useRouter();
  const [membership, setMembership] = useState<Membership>('none');
  const [donation, setDonation] = useState(0);
  const [custom, setCustom] = useState('');
  // Réservation d'un événement : /sostieni?evento=ID&importo=PRIX
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('importo')) setCustom(q.get('importo')!);
  }, []);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const donationValue = custom ? Math.max(0, Math.round(Number(custom))) : donation;
  const total = FEES[membership] + donationValue;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (total <= 0 || !f.get('privacy')) { setError(d.error); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/donate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang, membership, donation: donationValue,
        firstName: f.get('firstName'), lastName: f.get('lastName'), email: f.get('email'),
        phone: f.get('phone'), address: f.get('address'), taxCode: f.get('taxCode'),
        wantsReceipt: !!f.get('receipt'),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || d.error); return; }
    router.push(`/${lang}/coordinate?id=${data.id}&k=${data.key}`);
  }

  return (
    <form onSubmit={submit}>
      <h3>{d.membership}</h3>
      <div className="choices">
        {(Object.keys(FEES) as Membership[]).map(m => (
          <button type="button" key={m} className={`choice ${membership === m ? 'on' : ''}`} onClick={() => setMembership(m)}>{d[m]}</button>
        ))}
      </div>

      <h3>{d.donation}</h3>
      <div className="choices">
        <button type="button" className={`choice ${donation === 0 && !custom ? 'on' : ''}`} onClick={() => { setDonation(0); setCustom(''); }}>{d.noDonation}</button>
        {AMOUNTS.map(a => (
          <button type="button" key={a} className={`choice ${donation === a && !custom ? 'on' : ''}`} onClick={() => { setDonation(a); setCustom(''); }}>{a} €</button>
        ))}
      </div>
      <p><input type="number" min="1" placeholder={d.custom} value={custom} onChange={e => setCustom(e.target.value)} /></p>

      <div className="row">
        <input name="firstName" placeholder={`${d.firstName} *`} required />
        <input name="lastName" placeholder={`${d.lastName} *`} required />
        <input name="email" type="email" placeholder={`${d.email} *`} required />
        <input name="phone" placeholder={d.phone} />
      </div>
      <p><input name="address" placeholder={d.address} /></p>
      <p><input name="taxCode" placeholder={d.taxCode} /></p>

      <p><label><input type="checkbox" name="receipt" style={{ width: 'auto' }} /> {d.receipt}</label></p>
      <p><label><input type="checkbox" name="privacy" style={{ width: 'auto' }} /> {d.privacy} *</label></p>

      <h2>{d.total} : {total} €</h2>
      {error && <p style={{ color: '#b71c1c' }}>{error}</p>}
      <button className="btn green" disabled={loading}>{loading ? '…' : d.submit}</button>
    </form>
  );
}
