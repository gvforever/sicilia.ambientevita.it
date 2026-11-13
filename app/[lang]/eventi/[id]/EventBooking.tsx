'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lang } from '@/lib/i18n';
import { findEvent, formulas, quote } from '@/lib/eventPricing';

const T = {
  it: { formula: 'Formula', people: 'Partecipanti', member: 'Sono già socio/a (la quota di 10 € non viene richiesta)', don: 'Vuoi aggiungere una donazione?', no: 'No', first: 'Nome', last: 'Cognome', email: 'E-mail', phone: 'Telefono', birth: 'Data di nascita (facoltativa)', bday: 'Accetto di ricevere gli auguri di compleanno', receipt: 'Desidero la ricevuta fiscale', cf: 'Codice fiscale', addr: 'Indirizzo completo', privacy: 'Accetto il trattamento dei dati (GDPR)', part: 'Partecipazione', quota: 'Quota associativa', gift: 'Donazione', total: 'Totale', go: 'Prenota e procedi al pagamento', err: 'Compila i campi obbligatori e accetta il trattamento dei dati.' },
  fr: { formula: 'Formule', people: 'Participants', member: 'Je suis déjà membre (la cotisation de 10 € n’est pas demandée)', don: 'Ajouter un don ?', no: 'Non', first: 'Prénom', last: 'Nom', email: 'E-mail', phone: 'Téléphone', birth: 'Date de naissance (facultative)', bday: 'J’accepte de recevoir des vœux d’anniversaire', receipt: 'Je veux un reçu fiscal', cf: 'Code fiscal', addr: 'Adresse complète', privacy: 'J’accepte le traitement de mes données (RGPD)', part: 'Participation', quota: 'Cotisation', gift: 'Don', total: 'Total', go: 'Réserver et passer au paiement', err: 'Remplissez les champs obligatoires et acceptez le traitement des données.' },
  en: { formula: 'Package', people: 'Guests', member: 'I am already a member (the €10 fee is not charged)', don: 'Add a donation?', no: 'No', first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone', birth: 'Date of birth (optional)', bday: 'I agree to receive birthday wishes', receipt: 'I want a tax receipt', cf: 'Tax code', addr: 'Full address', privacy: 'I accept the processing of my data (GDPR)', part: 'Event', quota: 'Membership fee', gift: 'Donation', total: 'Total', go: 'Book and continue to payment', err: 'Fill in the required fields and accept data processing.' },
  de: { formula: 'Paket', people: 'Teilnehmer', member: 'Ich bin bereits Mitglied (der Beitrag von 10 € entfällt)', don: 'Eine Spende hinzufügen?', no: 'Nein', first: 'Vorname', last: 'Nachname', email: 'E-Mail', phone: 'Telefon', birth: 'Geburtsdatum (optional)', bday: 'Ich möchte Geburtstagsgrüße erhalten', receipt: 'Ich möchte eine Spendenquittung', cf: 'Steuernummer', addr: 'Vollständige Adresse', privacy: 'Ich akzeptiere die Datenverarbeitung (DSGVO)', part: 'Teilnahme', quota: 'Mitgliedsbeitrag', gift: 'Spende', total: 'Summe', go: 'Buchen und zur Zahlung', err: 'Bitte Pflichtfelder ausfüllen und der Datenverarbeitung zustimmen.' },
};
const DONS = [0, 10, 20, 50, 100];

export default function EventBooking({ lang, eventId }: { lang: Lang; eventId: string }) {
  const t = T[lang];
  const router = useRouter();
  const e = findEvent(eventId)!;
  const list = formulas(e);
  const [formula, setFormula] = useState(list[0].key);
  const [people, setPeople] = useState(1);
  const [member, setMember] = useState(false);
  const [don, setDon] = useState(0);
  const [receipt, setReceipt] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { const f = new URLSearchParams(window.location.search).get('f'); if (f && list.some(x => x.key === f)) setFormula(f); }, []);
  const q = quote(e, formula, people, member, don);

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (!f.get('privacy')) { setError(t.err); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/donate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang, eventId, formula, participants: people, alreadyMember: member, donation: don,
          firstName: f.get('firstName'), lastName: f.get('lastName'), email: f.get('email'), phone: f.get('phone'),
          birthDate: f.get('birthDate'), birthdayOk: !!f.get('birthdayOk'),
          address: f.get('address') || '', taxCode: f.get('taxCode') || '', wantsReceipt: receipt,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.err);
      router.push(`/${lang}/coordinate?id=${data.id}&k=${data.key}`);
    } catch (err: any) { setError(err.message || t.err); setLoading(false); }
  }

  return (
    <form onSubmit={submit}>
      {list.length > 1 && (<>
        <h3>{t.formula}</h3>
        <div className="choices">{list.map(x => <button type="button" key={x.key} className={`choice ${formula === x.key ? 'on' : ''}`} onClick={() => setFormula(x.key)}>{x.label} · {x.price} €</button>)}</div>
      </>)}
      <h3>{t.people}</h3>
      <select value={people} onChange={ev => setPeople(Number(ev.target.value))}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}</select>
      {!e.vip && <p><label><input type="checkbox" style={{ width: 'auto' }} checked={member} onChange={ev => setMember(ev.target.checked)} /> {t.member}</label></p>}

      <h3>{t.don}</h3>
      <div className="choices">{DONS.map(a => <button type="button" key={a} className={`choice ${don === a ? 'on' : ''}`} onClick={() => setDon(a)}>{a ? `${a} €` : t.no}</button>)}</div>

      <div className="row" style={{ marginTop: 24 }}>
        <input name="firstName" placeholder={`${t.first} *`} required />
        <input name="lastName" placeholder={`${t.last} *`} required />
        <input name="email" type="email" placeholder={`${t.email} *`} required />
        <input name="phone" placeholder={t.phone} />
      </div>
      <p><label style={{ fontSize: '.9rem', color: 'var(--muted)' }}>{t.birth}<input name="birthDate" type="date" /></label></p>
      <p><label><input type="checkbox" name="birthdayOk" style={{ width: 'auto' }} /> {t.bday}</label></p>
      <p><label><input type="checkbox" style={{ width: 'auto' }} checked={receipt} onChange={ev => setReceipt(ev.target.checked)} /> {t.receipt}</label></p>
      {receipt && <div className="row"><input name="taxCode" placeholder={t.cf} /><input name="address" placeholder={t.addr} /></div>}
      <p><label><input type="checkbox" name="privacy" style={{ width: 'auto' }} /> {t.privacy} *</label></p>

      <div className="book-sum">
        <p><span>{t.part} ({q.n} × {q.f.price - q.f.quota} €)</span><strong>{q.event} €</strong></p>
        <p><span>{t.quota}</span><strong>{q.membership} €</strong></p>
        {q.donation > 0 && <p><span>{t.gift}</span><strong>{q.donation} €</strong></p>}
        <p className="tot"><span>{t.total}</span><strong>{q.total} €</strong></p>
      </div>
      {error && <p style={{ color: '#b71c1c' }}>{error}</p>}
      <button className="btn green" disabled={loading}>{loading ? '…' : t.go}</button>
    </form>
  );
}
