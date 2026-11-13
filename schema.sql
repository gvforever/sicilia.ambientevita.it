CREATE TABLE IF NOT EXISTS subscriptions (
  id            SERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  lang          TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  address       TEXT,
  tax_code      TEXT,
  membership    TEXT NOT NULL CHECK (membership IN ('none','ordinario','benemerito')),
  membership_amount INTEGER NOT NULL DEFAULT 0,
  donation_amount   INTEGER NOT NULL DEFAULT 0,
  total_amount      INTEGER NOT NULL,
  wants_receipt BOOLEAN NOT NULL DEFAULT false,
  receipt_number TEXT UNIQUE,
  payment_status TEXT NOT NULL DEFAULT 'pending'
);
