import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { requireAdmin, fmt } from '@/lib/admin';
import AdminShell from '@/components/AdminShell';

export const dynamic = 'force-dynamic';

export default async function Messaggi() {
  requireAdmin();
  await ensureTables();
  const rows = await sql`SELECT * FROM contacts ORDER BY created_at DESC LIMIT 300`;
  async function toggle(fd: FormData) {
    'use server';
    requireAdmin();
    await sql`UPDATE contacts SET status = ${fd.get('status') === 'letto' ? 'letto' : 'nuovo'} WHERE id = ${Number(fd.get('id'))}`;
    redirect('/admin/messaggi');
  }
  return (
    <AdminShell>
      <h1>Messages ({rows.length})</h1>
      {rows.length === 0 && <p>Aucun message pour l’instant.</p>}
      {rows.map((c: any) => (
        <div key={c.id} className="adm-card">
          <p style={{ margin: 0 }}><span className={`tag ${c.status}`}>{c.status === 'nuovo' ? 'Nouveau' : 'Lu'}</span> · {fmt(c.created_at)} · {(c.lang || '').toUpperCase()}</p>
          <h3 style={{ margin: '10px 0 4px' }}>{c.subject || 'Sans objet'}</h3>
          <p style={{ margin: 0 }}><strong>{c.first_name} {c.last_name}</strong> · <a href={`mailto:${c.email}?subject=${encodeURIComponent('Re: ' + (c.subject || 'AmbienteVita Sicilia'))}`}>{c.email}</a>{c.phone ? ` · ${c.phone}` : ''}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{c.message}</p>
          <form action={toggle} style={{ display: 'inline' }}>
            <input type="hidden" name="id" value={c.id} />
            <input type="hidden" name="status" value={c.status === 'nuovo' ? 'letto' : 'nuovo'} />
            <button className="btn" style={{ border: '1px solid #d9d1bf' }}>{c.status === 'nuovo' ? 'Marquer comme lu' : 'Marquer comme non lu'}</button>
          </form>
          <a className="btn green" style={{ marginLeft: 8 }} href={`mailto:${c.email}?subject=${encodeURIComponent('Re: ' + (c.subject || 'AmbienteVita Sicilia'))}`}>Répondre</a>
        </div>
      ))}
    </AdminShell>
  );
}
