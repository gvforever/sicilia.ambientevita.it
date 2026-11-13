import Link from 'next/link';
import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { requireAdmin, fmt, daysToBirthday, ageOf, TYPE } from '@/lib/admin';
import { findEvent } from '@/lib/eventPricing';
import AdminShell from '@/components/AdminShell';

export const dynamic = 'force-dynamic';

export default async function Admin({ searchParams }: { searchParams: { q?: string; s?: string } }) {
  requireAdmin();
  await ensureTables();
  const q = (searchParams.q || '').trim(), s = searchParams.s || '', like = `%${q}%`;
  const rows = await sql`SELECT * FROM subscriptions
    WHERE (${q}::text = '' OR first_name ILIKE ${like} OR last_name ILIKE ${like} OR email ILIKE ${like})
      AND (${s}::text = '' OR payment_status = ${s})
    ORDER BY created_at DESC LIMIT 500`;
  const [k] = await sql`SELECT
    COALESCE(SUM(total_amount) FILTER (WHERE payment_status = 'paid'), 0)::int AS paid,
    COALESCE(SUM(total_amount) FILTER (WHERE payment_status <> 'paid'), 0)::int AS pending,
    COUNT(*)::int AS n, COUNT(DISTINCT lower(email))::int AS people,
    COUNT(*) FILTER (WHERE membership_amount > 0 AND date_part('year', created_at) = date_part('year', now()))::int AS members
    FROM subscriptions`;
  const [m] = await sql`SELECT COUNT(*) FILTER (WHERE status = 'nuovo')::int AS new FROM contacts`;
  const people = await sql`SELECT DISTINCT ON (lower(email)) id, first_name, last_name, birth_date FROM subscriptions WHERE birth_date IS NOT NULL ORDER BY lower(email), created_at DESC`;
  const soon = people.map((p: any) => ({ ...p, days: daysToBirthday(p.birth_date) as number })).filter(p => p.days <= 30).sort((a, b) => a.days - b.days);

  return (
    <AdminShell>
      <h1>Tableau de bord</h1>
      <div className="kpis">
        <div><span>Encaissé</span><strong>{k.paid} €</strong></div>
        <div><span>En attente de virement</span><strong>{k.pending} €</strong></div>
        <div><span>Inscriptions</span><strong>{k.n}</strong></div>
        <div><span>Personnes</span><strong>{k.people}</strong></div>
        <div><span>Membres cette année</span><strong>{k.members}</strong></div>
        <div><span>Nouveaux messages</span><strong><Link href="/admin/messaggi">{m.new}</Link></strong></div>
      </div>

      {soon.length > 0 && <div className="adm-card"><strong>🎂 Anniversaires dans les 30 jours :</strong> {soon.map(p => <span key={p.id}> <Link href={`/admin/persona/${p.id}`}>{p.first_name} {p.last_name}</Link> ({p.days === 0 ? 'aujourd’hui' : `dans ${p.days} j`}, {(ageOf(p.birth_date) ?? 0) + (p.days === 0 ? 0 : 1)} ans) ·</span>)}</div>}

      <form className="adm-filter">
        <input name="q" defaultValue={q} placeholder="Rechercher un nom ou un e-mail" />
        <select name="s" defaultValue={s}><option value="">Tous les statuts</option><option value="pending">En attente</option><option value="paid">Payé</option></select>
        <button className="btn green">Filtrer</button>
      </form>

      <div className="tbl-wrap"><table className="tbl">
        <thead><tr><th>N°</th><th>Date</th><th>Nom</th><th>E-mail</th><th>Type</th><th>Événement</th><th>Total</th><th>Statut</th><th></th></tr></thead>
        <tbody>
          {rows.map((r: any) => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{fmt(r.created_at)}</td>
              <td><strong>{r.first_name} {r.last_name}</strong></td><td>{r.email}</td>
              <td>{TYPE[r.membership] || r.membership}</td>
              <td>{r.event_id ? `${findEvent(r.event_id)?.city || ''} ${r.event_id} (${r.participants})` : ''}</td>
              <td><strong>{r.total_amount} €</strong></td>
              <td><span className={`tag ${r.payment_status}`}>{r.payment_status === 'paid' ? 'Payé' : 'En attente'}</span></td>
              <td><Link href={`/admin/persona/${r.id}`}>Fiche →</Link></td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={9}>Aucun résultat.</td></tr>}
        </tbody>
      </table></div>
    </AdminShell>
  );
}
