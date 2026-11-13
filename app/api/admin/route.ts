import { sql } from '@/lib/db';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('token') !== process.env.ADMIN_TOKEN) return new Response('Unauthorized', { status: 401 });
  const paid = Number(url.searchParams.get('paid'));
  if (paid) await sql`UPDATE subscriptions SET payment_status = 'paid' WHERE id = ${paid}`;
  const rows = await sql`SELECT * FROM subscriptions ORDER BY created_at DESC`;
  if (!rows.length) return new Response('Nessun dato', { status: 200 });
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [cols.join(';'), ...rows.map(r => cols.map(c => esc(r[c])).join(';'))].join('\n');
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="iscrizioni.csv"' } });
}
