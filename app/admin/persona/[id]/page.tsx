import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { requireAdmin, fmt, iso, ageOf, daysToBirthday, TYPE } from '@/lib/admin';
import { signId } from '@/lib/receipt';
import { findEvent } from '@/lib/eventPricing';
import AdminShell from '@/components/AdminShell';

export const dynamic = 'force-dynamic';

export default async function Persona({ params }: { params: { id: string } }) {
  requireAdmin();
  await ensureTables();
  const id = Number(params.id);
  const [r] = id ? await sql`SELECT * FROM subscriptions WHERE id = ${id}` : [];
  if (!r) notFound();
  const history = await sql`SELECT * FROM subscriptions WHERE lower(email) = lower(${r.email}) ORDER BY created_at DESC`;
  const ev = r.event_id ? findEvent(r.event_id) : null;
  const age = ageOf(r.birth_date), days = daysToBirthday(r.birth_date);

  async function setStatus(fd: FormData) {
    'use server';
    requireAdmin();
    const status = fd.get('status') === 'paid' ? 'paid' : 'pending';
    await sql`UPDATE subscriptions SET payment_status = ${status} WHERE id = ${Number(fd.get('id'))}`;
    revalidatePath(`/admin/persona/${fd.get('id')}`);
    redirect(`/admin/persona/${fd.get('id')}`);
  }
  async function saveNote(fd: FormData) {
    'use server';
    requireAdmin();
    await sql`UPDATE subscriptions SET admin_note = ${String(fd.get('note') || '').slice(0, 4000)} WHERE id = ${Number(fd.get('id'))}`;
    redirect(`/admin/persona/${fd.get('id')}`);
  }

  return (
    <AdminShell>
      <p><Link href="/admin">← Retour à la liste</Link></p>
      <h1>{r.first_name} {r.last_name}</h1>
      <div className="adm-grid">
        <div>
          <div className="adm-card"><h3 style={{ marginTop: 0 }}>Profil</h3><dl>
            <dt>E-mail</dt><dd><a href={`mailto:${r.email}`}>{r.email}</a></dd>
            <dt>Téléphone</dt><dd>{r.phone || '—'}</dd>
            <dt>Adresse</dt><dd>{r.address || '—'}</dd>
            <dt>Code fiscal</dt><dd>{r.tax_code || '—'}</dd>
            <dt>Date de naissance</dt><dd>{r.birth_date ? `${iso(r.birth_date).split('-').reverse().join('/')} — ${age} ans` : '—'}</dd>
            <dt>Anniversaire</dt><dd>{days === null ? '—' : days === 0 ? '🎂 Aujourd’hui !' : `dans ${days} jours`}</dd>
            <dt>Vœux acceptés</dt><dd>{r.birthday_ok ? 'Oui' : 'Non'}</dd>
            <dt>Langue</dt><dd>{(r.lang || '').toUpperCase()}</dd>
          </dl></div>
          <div className="adm-card"><h3 style={{ marginTop: 0 }}>Inscription n° {r.id}</h3><dl>
            <dt>Date</dt><dd>{fmt(r.created_at)}</dd>
            <dt>Type</dt><dd>{TYPE[r.membership] || r.membership}</dd>
            {ev && <><dt>Événement</dt><dd>{ev.title} — {ev.city}, {ev.date} ({r.event_formula}, {r.participants} pers.)</dd></>}
            <dt>Cotisation</dt><dd>{r.membership_amount} €</dd>
            {r.event_amount > 0 && <><dt>Événement</dt><dd>{r.event_amount} €</dd></>}
            <dt>Don</dt><dd>{r.donation_amount} €</dd>
            <dt>Total</dt><dd><strong>{r.total_amount} €</strong></dd>
            <dt>Motif du virement</dt><dd>AmbienteVita {new Date(r.created_at).getFullYear()}-{r.id}</dd>
            <dt>Reçu fiscal</dt><dd>{r.wants_receipt ? <a href={`/api/receipt/${r.id}?k=${signId(r.id)}`}>{r.receipt_number} (PDF)</a> : 'Non demandé'}</dd>
          </dl></div>
        </div>
        <div>
          <div className="adm-card"><h3 style={{ marginTop: 0 }}>Paiement</h3>
            <p><span className={`tag ${r.payment_status}`}>{r.payment_status === 'paid' ? 'Payé' : 'En attente de virement'}</span></p>
            <form action={setStatus}>
              <input type="hidden" name="id" value={r.id} />
              <input type="hidden" name="status" value={r.payment_status === 'paid' ? 'pending' : 'paid'} />
              <button className="btn green">{r.payment_status === 'paid' ? 'Remettre en attente' : 'Marquer comme payé'}</button>
            </form>
          </div>
          <div className="adm-card"><h3 style={{ marginTop: 0 }}>Note interne</h3>
            <form action={saveNote}>
              <input type="hidden" name="id" value={r.id} />
              <textarea name="note" rows={5} defaultValue={r.admin_note || ''} style={{ width: '100%', padding: 12, border: '1px solid #d9d1bf', borderRadius: 12, font: 'inherit' }} />
              <button className="btn" style={{ marginTop: 10, border: '1px solid #d9d1bf' }}>Enregistrer</button>
            </form>
          </div>
          <div className="adm-card"><h3 style={{ marginTop: 0 }}>Historique ({history.length})</h3>
            {history.map((h: any) => <p key={h.id} style={{ margin: '6px 0' }}><Link href={`/admin/persona/${h.id}`}>n° {h.id}</Link> · {fmt(h.created_at)} · {TYPE[h.membership] || h.membership} · <strong>{h.total_amount} €</strong> <span className={`tag ${h.payment_status}`}>{h.payment_status === 'paid' ? 'Payé' : 'En attente'}</span></p>)}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
