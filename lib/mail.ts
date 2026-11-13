import { Resend } from 'resend';
import { buildCardPdf, provEnd, siteUrl } from '@/lib/card';
import { signId } from '@/lib/receipt';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMails(s: any, pdf?: Uint8Array) {
  const summary = `${s.first_name} ${s.last_name} <${s.email}>\nAdesione: ${s.membership} (${s.membership_amount} €)\nDonazione: ${s.donation_amount} €\nTotale: ${s.total_amount} €\nRicevuta: ${s.wants_receipt ? s.receipt_number : 'no'}${s.event_id ? '\nEvento: ' + s.event_id + ' (' + (s.event_formula || '') + ')' : ''}${s.birth_date ? '\nNato/a il: ' + String(s.birth_date).slice(0, 10) : ''}`;
  const attachments: any[] = pdf ? [{ filename: `${s.receipt_number}.pdf`, content: Buffer.from(pdf) }] : [];
  const card = s.membership !== 'none' ? await buildCardPdf(s, 'prov') : null;
  const cardFiles = card ? [{ filename: `tessera-provvisoria-${s.id}.pdf`, content: Buffer.from(card) }] : [];
  const cardImg = card ? `\n\nLa tua tessera provvisoria è allegata in PDF, valida fino al ${provEnd(s).toLocaleDateString('it-IT')}. Versione immagine: ${siteUrl()}/api/card/${s.id}?k=${signId(s.id)}&t=prov\nSe il bonifico non arriva entro 7 giorni, la tessera non sarà più valida.` : '';

  await resend.emails.send({ from: process.env.MAIL_FROM!, to: (process.env.MAIL_TO || '').split(',').map(x => x.trim()).filter(Boolean), subject: `Nuova adesione/donazione #${s.id}`, text: summary, attachments });
  await resend.emails.send({
    from: process.env.MAIL_FROM!, to: s.email,
    subject: 'Grazie da AmbienteVita Sicilia',
    text: `Grazie ${s.first_name}!\n\n${summary}\n\nCompleta il bonifico indicando la causale AmbienteVita ${new Date(s.created_at).getFullYear()}-${s.id}.${cardImg}`,
    attachments: [...attachments, ...cardFiles],
  });
}
