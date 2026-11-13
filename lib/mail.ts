import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMails(s: any, pdf?: Uint8Array) {
  const summary = `${s.first_name} ${s.last_name} <${s.email}>\nAdesione: ${s.membership} (${s.membership_amount} €)\nDonazione: ${s.donation_amount} €\nTotale: ${s.total_amount} €\nRicevuta: ${s.wants_receipt ? s.receipt_number : 'no'}`;
  const attachments = pdf ? [{ filename: `${s.receipt_number}.pdf`, content: Buffer.from(pdf) }] : [];

  await resend.emails.send({ from: process.env.MAIL_FROM!, to: process.env.MAIL_TO!, subject: `Nuova adesione/donazione #${s.id}`, text: summary, attachments });
  await resend.emails.send({
    from: process.env.MAIL_FROM!, to: s.email,
    subject: 'Grazie da AmbienteVita Sicilia',
    text: `Grazie ${s.first_name}!\n\n${summary}\n\nCompleta il bonifico indicando la causale AEV-SICILIA-${s.id} ${s.last_name}.`,
    attachments,
  });
}
