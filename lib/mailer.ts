import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const ADMIN_TO = () => (process.env.MAIL_TO || '').split(',').map(x => x.trim()).filter(Boolean);

export async function send(opts: { to: string | string[]; subject: string; text?: string; html?: string; replyTo?: string; attachments?: any[] }) {
  return resend.emails.send({ from: process.env.MAIL_FROM || 'AmbienteVita Sicilia <onboarding@resend.dev>', ...opts } as any);
}
