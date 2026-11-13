import { Lang, t, BANK } from '@/lib/i18n';
import { sql } from '@/lib/db';
import { signId } from '@/lib/receipt';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'RIB / IBAN', robots: { index: false, follow: false } };

const R = {
  it: { name: 'Nome', phone: 'Cellulare', addr: 'Indirizzo', end: 'Grazie in anticipo per la fiducia, proteggiamo insieme l’ambiente.' },
  fr: { name: 'Nom', phone: 'Portable', addr: 'Adresse', end: 'Merci d’avance pour votre confiance, protégeons ensemble l’environnement.' },
  en: { name: 'Name', phone: 'Mobile', addr: 'Address', end: 'Thank you in advance for your trust, let’s protect the environment together.' },
  de: { name: 'Name', phone: 'Handy', addr: 'Adresse', end: 'Vielen Dank im Voraus für Ihr Vertrauen, schützen wir gemeinsam die Umwelt.' },
};

export default async function Coordinate({ params, searchParams }: { params: { lang: Lang }; searchParams: { id?: string; k?: string } }) {
  const d = t(params.lang).bank;
  const r = R[params.lang];
  const id = Number(searchParams.id);
  const valid = id && searchParams.k === signId(id);
  const rows = valid ? await sql`SELECT * FROM subscriptions WHERE id = ${id}` : [];
  const s = rows[0];

  return (
    <section style={{ paddingTop: 140 }}><div className="container prose">
      <p className="eyebrow">{d.title}</p>
      <h1>RIB / IBAN</h1>
      <p>{d.lead}</p>
      <div className="card">
        <p><strong>{d.holder} :</strong> {BANK.holder}</p>
        <p><strong>IBAN :</strong> {BANK.iban}</p>
        <p><strong>BIC :</strong> {BANK.bic}</p>
        <p><strong>Banca :</strong> {BANK.bank}</p>
        {s && <>
          <p><strong>{d.amount} :</strong> {s.total_amount} €</p>
          <p><strong>{d.reason} :</strong> AmbienteVita {new Date(s.created_at).getFullYear()}-{s.id}</p>
        </>}
      </div>
      {s && <div className="book-sum">
        <p><span>{r.name}</span><span>{s.last_name} {s.first_name}</span></p>
        <p><span>E-mail</span><span>{s.email}</span></p>
        {s.phone && <p><span>{r.phone}</span><span>{s.phone}</span></p>}
        {s.address && <p><span>{r.addr}</span><span>{s.address}</span></p>}
      </div>}
      {s?.wants_receipt && <>
        <p><a className="btn green" href={`/api/receipt/${s.id}?k=${searchParams.k}`}>{d.receipt}</a></p>
        <p style={{ color: 'var(--muted)' }}>{d.note}</p>
      </>}
      <p className="quote" style={{ marginTop: 30 }}>{r.end}</p>
    </div></section>
  );
}
