'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lang, t } from '@/lib/i18n';

const AMOUNTS = [10, 20, 50, 100, 200];
const FEES = { none: 0, ordinario: 10, benemerito: 200 } as const;
type Membership = keyof typeof FEES;
const DIAL = ['+39', '+33', '+41', '+49', '+43', '+32', '+34', '+44', '+1', '+216', '+356'];
const B = {
  it: { birth: 'Data di nascita (facoltativa)', bday: 'Accetto di ricevere gli auguri di compleanno', mobile: 'Cellulare', street: 'Indirizzo (via, numero)', zip: 'CAP', city: 'Città', country: 'Paese', tax: 'Codice fiscale (facoltativo)', cgu: 'Accetto le', cguLink: 'condizioni generali del sito e dell’associazione', cguErr: 'Devi accettare le condizioni generali.' },
  fr: { birth: 'Date de naissance (facultative)', bday: 'J’accepte de recevoir des vœux d’anniversaire', mobile: 'Portable', street: 'Adresse (rue, numéro)', zip: 'Code postal', city: 'Ville', country: 'Pays', tax: 'Code fiscal (facultatif)', cgu: 'J’accepte les', cguLink: 'conditions générales du site et de l’association', cguErr: 'Vous devez accepter les conditions générales.' },
  en: { birth: 'Date of birth (optional)', bday: 'I agree to receive birthday wishes', mobile: 'Mobile', street: 'Address (street, number)', zip: 'Postcode', city: 'City', country: 'Country', tax: 'Tax code (optional)', cgu: 'I accept the', cguLink: 'general terms of the website and the association', cguErr: 'You must accept the general terms.' },
  de: { birth: 'Geburtsdatum (optional)', bday: 'Ich möchte Geburtstagsgrüße erhalten', mobile: 'Handy', street: 'Adresse (Straße, Nr.)', zip: 'PLZ', city: 'Stadt', country: 'Land', tax: 'Steuernummer (optional)', cgu: 'Ich akzeptiere die', cguLink: 'AGB der Website und des Vereins', cguErr: 'Bitte akzeptieren Sie die AGB.' },
};

export default function DonationForm({ lang }: { lang: Lang }) {
  const d = t(lang).form;
  const x = B[lang];
  const router = useRouter();
  const [membership, setMembership] = useState<Membership>('none');
  const [donation, setDonation] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const total = FEES[membership] + donation;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) || '').trim();
    if (total <= 0 || !f.get('privacy')) { setError(d.error); return; }
    if (!f.get('cgu')) { setError(x.cguErr); return; }
    const address = `${g('street')}, ${g('zip')} ${g('city')}, ${g('country')}`;
    const phone = `${g('dial')} ${g('mobile')}`;
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/donate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang, membership, donation,
          firstName: g('firstName'), lastName: g('lastName'), email: g('email'), phone, address,
          taxCode: g('taxCode'), wantsReceipt: !!f.get('receipt'),
          birthDate: g('birthDate'), birthdayOk: !!f.get('birthdayOk'),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || d.error); setLoading(false); return; }
      router.push(`/${lang}/coordinate?id=${data.id}&k=${data.key}`);
    } catch { setError(d.error); setLoading(false); }
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
        <button type="button" className={`choice ${donation === 0 ? 'on' : ''}`} onClick={() => setDonation(0)}>{d.noDonation}</button>
        {AMOUNTS.map(a => <button type="button" key={a} className={`choice ${donation === a ? 'on' : ''}`} onClick={() => setDonation(a)}>{a} €</button>)}
      </div>
      <div className="row" style={{ marginTop: 24 }}>
        <input name="lastName" placeholder={`${d.lastName} *`} required />
        <input name="firstName" placeholder={`${d.firstName} *`} required />
      </div>
      <p><input name="email" type="email" placeholder={`${d.email} *`} required /></p>
      <div className="row" style={{ gridTemplateColumns: '110px 1fr' }}>
        <select name="dial" defaultValue="+39" aria-label="Prefisso">{DIAL.map(c => <option key={c}>{c}</option>)}</select>
        <input name="mobile" type="tel" inputMode="tel" placeholder={`${x.mobile} *`} required pattern="[0-9 ]{6,15}" />
      </div>
      <p><input name="street" placeholder={`${x.street} *`} required autoComplete="street-address" /></p>
      <div className="row">
        <input name="zip" placeholder={`${x.zip} *`} required autoComplete="postal-code" />
        <input name="city" placeholder={`${x.city} *`} required autoComplete="address-level2" />
      </div>
      <p><input name="country" placeholder={`${x.country} *`} defaultValue="Italia" required autoComplete="country-name" /></p>
      <p><input name="taxCode" placeholder={x.tax} /></p>
      <p><label style={{ fontSize: '.9rem', color: 'var(--muted)' }}>{x.birth}<input name="birthDate" type="date" /></label></p>
      <p><label><input type="checkbox" name="birthdayOk" style={{ width: 'auto' }} /> {x.bday}</label></p>
      <p><label><input type="checkbox" name="receipt" style={{ width: 'auto' }} /> {d.receipt}</label></p>
      <p><label><input type="checkbox" name="privacy" style={{ width: 'auto' }} /> {d.privacy} *</label></p>
      <p><label><input type="checkbox" name="cgu" required style={{ width: 'auto' }} /> {x.cgu} <a href={`/${lang}/legal/cgu`} target="_blank">{x.cguLink}</a> *</label></p>
      <h2 className="total">{d.total} : {total} €</h2>
      {error && <p style={{ color: '#b71c1c' }}>{error}</p>}
      <button className="btn green" disabled={loading}>{loading ? '…' : d.submit}</button>
    </form>
  );
}
