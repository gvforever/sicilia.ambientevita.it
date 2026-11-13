import { Lang, t, BANK } from '@/lib/i18n';
import { sql } from '@/lib/db';
import { signId } from '@/lib/receipt';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function Coordinate({ params, searchParams }: { params: { lang: Lang }; searchParams: { id?: string; k?: string } }) {
  const d = t(params.lang).bank;
  const id = Number(searchParams.id);
  const valid = id && searchParams.k === signId(id);
  const rows = valid ? await sql`SELECT * FROM subscriptions WHERE id = ${id}` : [];
  const s = rows[0];

  return (
    <section><div className="container prose">
      <h1>{d.title}</h1>
      <p>{d.lead}</p>
      <div className="card">
        <p><strong>{d.holder} :</strong> {BANK.holder}</p>
        <p><strong>IBAN :</strong> {BANK.iban}</p>
        <p><strong>BIC :</strong> {BANK.bic}</p>
        <p><strong>Banca :</strong> {BANK.bank}</p>
        {s && <>
          <p><strong>{d.amount} :</strong> {s.total_amount} €</p>
          <p><strong>{d.reason} :</strong> AEV-SICILIA-{s.id} {s.last_name}</p>
        </>}
      </div>
      {s?.wants_receipt && <>
        <p><a className="btn green" href={`/api/receipt/${s.id}?k=${searchParams.k}`}>{d.receipt}</a></p>
        <p style={{ color: 'var(--muted)' }}>{d.note}</p>
      </>}
    </div></section>
  );
}
