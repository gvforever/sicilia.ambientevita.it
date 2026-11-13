import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { signId, receiptNumber, buildReceiptPdf } from '@/lib/receipt';
import { sendMails } from '@/lib/mail';
import { findEvent, quote } from '@/lib/eventPricing';

export const runtime = 'nodejs';
const FEES: Record<string, number> = { none: 0, ordinario: 10, benemerito: 200 };
const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const validDate = (v: string) => (/^\d{4}-\d{2}-\d{2}$/.test(v) && v > '1900-01-01' && v < new Date().toISOString().slice(0, 10) ? v : null);

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => null);
    if (!b) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    const firstName = clean(b.firstName), lastName = clean(b.lastName), email = clean(b.email);

    let membership = 'none', membershipAmount = 0, donation = 0, eventAmount = 0, participants = 1;
    let eventId: string | null = null, formula: string | null = null;
    const ev = b.eventId ? findEvent(String(b.eventId)) : undefined;
    if (ev) {
      const q = quote(ev, String(b.formula || ''), Number(b.participants), !!b.alreadyMember, Number(b.donation));
      membership = q.type; membershipAmount = q.membership; eventAmount = q.event; donation = q.donation;
      participants = q.n; eventId = ev.id; formula = q.f.key;
    } else {
      membership = b.membership in FEES ? b.membership : 'none';
      membershipAmount = FEES[membership];
      donation = Math.max(0, Math.min(100000, Math.round(Number(b.donation) || 0)));
    }
    const total = membershipAmount + donation + eventAmount;
    if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email) || total <= 0)
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
    const birth = validDate(clean(b.birthDate, 10));

    await ensureTables();
    const [row] = await sql`
      INSERT INTO subscriptions (lang, first_name, last_name, email, phone, address, tax_code,
        membership, membership_amount, donation_amount, event_amount, total_amount, wants_receipt,
        event_id, event_formula, participants, already_member, birth_date, birthday_ok)
      VALUES (${clean(b.lang, 2)}, ${firstName}, ${lastName}, ${email}, ${clean(b.phone, 40)}, ${clean(b.address, 400)},
        ${clean(b.taxCode, 32).toUpperCase()}, ${membership}, ${membershipAmount}, ${donation}, ${eventAmount}, ${total}, ${!!b.wantsReceipt},
        ${eventId}, ${formula}, ${participants}, ${!!b.alreadyMember}, ${birth}, ${!!b.birthdayOk && !!birth})
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
