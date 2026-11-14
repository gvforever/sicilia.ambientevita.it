import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { requireAdmin, fmt, TYPE } from '@/lib/admin';
import { ensureCardCols, buildCardPdf, finalEnd, provEnd, siteUrl, cardNumber } from '@/lib/card';
import { signId } from '@/lib/receipt';
import { send } from '@/lib/mailer';
import AdminShell from '@/components/AdminShell';

export const dynamic = 'force-dynamic';

async function validate(fd: FormData) {
  'use server';
  requireAdmin();
  const id = Number(fd.get('id'));
  if (!fd.get('paid')) return;
  const when = String(fd.get('when') || '') || new Date().toISOString();
  const note = String(fd.get('note') || '').slice(0, 500);
  await ensureCardCols();
  const [s] = await sql`UPDATE subscriptions SET payment_status = 'paid', paid_at = ${when}, payment_note = ${note} WHERE id = ${id} RETURNING *`;
  if (s && s.membership !== 'none') {
    const pdf = await buildCardPdf(s, 'final');
    const img = `${siteUrl()}/api/card/${s.id}?k=${signId(s.id)}&t=final`;
    await send({
      to: s.email,
      subject: 'La tua tessera di socio AmbienteVita Sicilia',
      html: `<p>Ciao ${s.first_name},</p><p>abbiamo ricevuto il tuo bonifico, grazie! Ecco la tua tessera di socio definitiva n. <b>${cardNumber(s)}</b>, valida fino al <b>${finalEnd(s).toLocaleDateString('it-IT')}</b>.</p><p>La trovi allegata in PDF e anche <a href="${img}">in formato immagine</a>.</p><p>Proteggiamo insieme l’ambiente.<br>AmbienteVita Sicilia</p>`,
      attachments: [{ filename: `tessera-${cardNumber(s)}.pdf`, content: Buffer.from(pdf) }],
    });
    await sql`UPDATE subscriptions SET card_sent_at = now() WHERE id = ${id}`;
  }
  revalidatePath('/admin/tessere');
}

export default async function Tessere() {
  requireAdmin();
  await ensureTables();
  await ensureCardCols();
  const rows = await sql`SELECT * FROM subscriptions ORDER BY created_at DESC`;
  const now = new Date();
  return (
    <AdminShell>
      <h1>Cartes de membre</h1>
      <p>Cochez « Virement reçu », ajoutez une note et la date, puis validez : le membre reçoit sa carte définitive annuelle (PDF et image) par e-mail.</p>
      <div className="tbl-wrap"><table className="tbl">
        <thead><tr><th>Date</th><th>Nom</th><th>Type</th><th>Total</th><th>Carte provisoire</th><th>Statut</th><th>Validation</th></tr></thead>
        <tbody>{rows.map((s: any) => {
          const paid = s.payment_status === 'paid';
          const expired = !paid && provEnd(s) < now;
          return (
            <tr key={s.id}>
              <td>{fmt(s.created_at)}</td>
              <td><a href={`/admin/persona/${s.id}`}>{s.last_name} {s.first_name}</a><br /><small>{s.email}</small></td>
              <td>{TYPE[s.membership] || s.membership}</td>
              <td>{s.total_amount} €</td>
              <td>{s.membership === 'none' ? '—' : expired ? <span className="tag pending">Expirée</span> : <span className="tag">jusqu’au {provEnd(s).toLocaleDateString('fr-FR')}</span>}</td>
              <td>{paid ? <span className="tag paid">Payé {fmt(s.paid_at)}{s.card_sent_at ? ' · carte envoyée' : ''}</span> : <span className="tag pending">En attente</span>}{s.payment_note ? <><br /><small>{s.payment_note}</small></> : null}</td>
              <td>{paid ? '✓' : (
                <form action={validate} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input type="hidden" name="id" value={s.id} />
                  <label style={{ whiteSpace: 'nowrap' }}><input type="checkbox" name="paid" required style={{ width: 'auto' }} /> Virement reçu</label>
                  <input type="datetime-local" name="when" style={{ width: 190 }} />
                  <input name="note" placeholder="Note du virement" style={{ width: 180 }} />
                  <button className="btn green" style={{ padding: '8px 14px' }}>Valider</button>
                </form>
              )}</td>
            </tr>
          );
        })}</tbody>
      </table></div>
    </AdminShell>
  );
}
