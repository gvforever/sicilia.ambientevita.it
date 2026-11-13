import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { send, ADMIN_TO } from '@/lib/mailer';

export const runtime = 'nodejs';
const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => null);
    if (!b) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    if (b.website) return NextResponse.json({ ok: true }); // piège anti-robots
    const firstName = clean(b.firstName), lastName = clean(b.lastName), email = clean(b.email);
    const phone = clean(b.phone, 40), subject = clean(b.subject), message = clean(b.message, 5000);
    if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email) || !message)
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });

    await ensureTables();
    const [c] = await sql`INSERT INTO contacts (lang, first_name, last_name, email, phone, subject, message)
      VALUES (${clean(b.lang, 2)}, ${firstName}, ${lastName}, ${email}, ${phone}, ${subject}, ${message}) RETURNING id`;

    const text = `Nuovo messaggio dal sito (#${c.id})\n\nNome: ${firstName} ${lastName}\nE-mail: ${email}\nTelefono: ${phone || '-'}\nOggetto: ${subject || '-'}\nLingua: ${clean(b.lang, 2)}\n\n${message}`;
    try { await send({ to: ADMIN_TO(), subject: `Contatto #${c.id}: ${subject || 'messaggio dal sito'}`, text, replyTo: email }); }
    catch (e) { console.error('mail error', e); }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('contact error', e);
    return NextResponse.json({ error: 'Errore del server, riprova.' }, { status: 500 });
  }
}
