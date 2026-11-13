import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { signId, receiptNumber, buildReceiptPdf } from '@/lib/receipt';
import { sendMails } from '@/lib/mail';

export const runtime = 'nodejs';
const FEES: Record<string, number> = { none: 0, ordinario: 10, benemerito: 200 };
const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    lang TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL,
    phone TEXT, address TEXT, tax_code TEXT,
    membership TEXT NOT NULL, membership_amount INTEGER NOT NULL DEFAULT 0,
    donation_amount INTEGER NOT NULL DEFAULT 0, total_amount INTEGER NOT NULL,
    wants_receipt BOOLEAN NOT NULL DEFAULT false, receipt_number TEXT UNIQUE,
    payment_status TEXT NOT NULL DEFAULT 'pending')`;
}

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => null);
    if (!b) return NextResponse.json({ error: 'Bad request' }, { status: 400 });

    const membership = b.membership in FEES ? b.membership : 'none';
    const fee = FEES[membership];
    const donation = Math.max(0, Math.min(100000, Math.round(Number(b.donation) || 0)));
    const total = fee + donation;
    const firstName = clean(b.firstName), lastName = clean(b.lastName), email = clean(b.email);
    if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email) || total <= 0)
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });

    await ensureTable();
    const [row] = await sql`
      INSERT INTO subscriptions (lang, first_name, last_name, email, address, tax_code,
        membership, membership_amount, donation_amount, total_amount, wants_receipt)
      VALUES (${clean(b.lang, 2)}, ${firstName}, ${lastName}, ${email}, ${clean(b.address, 400)},
        ${clean(b.taxCode, 32).toUpperCase()}, ${membership}, ${fee}, ${donation}, ${total}, ${!!b.wantsReceipt})
      RETURNING *`;

    let s = row;
    let pdf: Uint8Array | undefined;
    if (s.wants_receipt) {
      [s] = await sql`UPDATE subscriptions SET receipt_number = ${receiptNumber(s.id, new Date(s.created_at))} WHERE id = ${s.id} RETURNING *`;
      pdf = await buildReceiptPdf(s);
    }
    try { await sendMails(s, pdf); } catch (e) { console.error('mail error', e); }

    return NextResponse.json({ id: s.id, key: signId(s.id) });
  } catch (e) {
    console.error('donate error', e);
    return NextResponse.json({ error: 'Errore del server, riprova.' }, { status: 500 });
  }
}
