import { sql } from '@/lib/db';
let ready = false;

export async function ensureTables() {
  if (ready) return;
  await sql`CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    lang TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL,
    phone TEXT, address TEXT, tax_code TEXT,
    membership TEXT NOT NULL, membership_amount INTEGER NOT NULL DEFAULT 0,
    donation_amount INTEGER NOT NULL DEFAULT 0, total_amount INTEGER NOT NULL,
    wants_receipt BOOLEAN NOT NULL DEFAULT false, receipt_number TEXT UNIQUE,
    payment_status TEXT NOT NULL DEFAULT 'pending')`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS event_id TEXT`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS event_formula TEXT`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS birth_date DATE`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS birthday_ok BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS last_birthday_mail INTEGER`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS event_amount INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS participants INTEGER NOT NULL DEFAULT 1`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS already_member BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS admin_note TEXT`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS renewal_mails TEXT NOT NULL DEFAULT ''`;
  await sql`CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), lang TEXT,
    first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
    subject TEXT, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'nuovo')`;
  ready = true;
}
