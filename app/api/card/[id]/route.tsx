import { ImageResponse } from 'next/og';
import { sql } from '@/lib/db';
import { signId } from '@/lib/receipt';
import { cardNumber, provEnd, finalEnd, TYPE_IT, ensureCardCols } from '@/lib/card';

export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = new URL(req.url);
  const id = Number(params.id);
  if (!id || url.searchParams.get('k') !== signId(id)) return new Response('Not found', { status: 404 });
  await ensureCardCols();
  const [s] = await sql`SELECT * FROM subscriptions WHERE id = ${id}`;
  if (!s) return new Response('Not found', { status: 404 });
  const final = url.searchParams.get('t') === 'final' && s.payment_status === 'paid';
  const end = final ? finalEnd(s) : provEnd(s);
  const expired = !final && end < new Date() && s.payment_status !== 'paid';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 50, color: '#fff', background: final ? 'linear-gradient(135deg,#0e4a5a,#1d1c1a)' : 'linear-gradient(135deg,#4e6b3a,#0e4a5a)', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 44, fontWeight: 700 }}>AmbienteVita Sicilia</div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: '#e3b768' }}>{final ? 'TESSERA DI SOCIO' : 'TESSERA PROVVISORIA'}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 46, fontWeight: 700 }}>{`${s.last_name} ${s.first_name}`.toUpperCase()}</div>
          <div style={{ fontSize: 26 }}>{TYPE_IT[s.membership] || 'Socio'}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24 }}>
          <div>{`N. ${cardNumber(s)}`}</div>
          <div>{expired ? 'SCADUTA' : `Valida fino al ${end.toLocaleDateString('it-IT')}`}</div>
        </div>
      </div>
    ),
    { width: 1012, height: 638 }
  );
}
