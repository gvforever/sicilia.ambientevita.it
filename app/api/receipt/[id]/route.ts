import { sql } from '@/lib/db';
import { signId, buildReceiptPdf } from '@/lib/receipt';
export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const k = new URL(req.url).searchParams.get('k');
  if (!id || k !== signId(id)) return new Response('Not found', { status: 404 });
  const [s] = await sql`SELECT * FROM subscriptions WHERE id = ${id} AND wants_receipt = true`;
  if (!s) return new Response('Not found', { status: 404 });
  const pdf = await buildReceiptPdf(s);
  return new Response(Buffer.from(pdf), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${s.receipt_number}.pdf"` } });
}
