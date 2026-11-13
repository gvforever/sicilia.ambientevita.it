import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { isAdmin } from '@/lib/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const ok = isAdmin() || (!!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN);
  if (!ok) return new Response('Unauthorized', { status: 401 });
  await ensureTables();
  const contacts = url.searchParams.get('t') === 'contacts';
  const rows = contacts ? await sql`SELECT * FROM contacts ORDER BY created_at DESC` : await sql`SELECT * FROM subscriptions ORDER BY created_at DESC`;
  if (!rows.length) return new Response('Nessun dato', { status: 200 });
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = '\uFEFF' + [cols.join(';'), ...rows.map((r: any) => cols.map(c => esc(r[c])).join(';'))].join('\n');
  const name = contacts ? 'messaggi' : 'iscrizioni';
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${name}-${new Date().toISOString().slice(0, 10)}.csv"` } });
}
