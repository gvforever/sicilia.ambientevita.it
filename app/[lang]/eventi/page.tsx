import Link from 'next/link';
import { Lang } from '@/lib/i18n';
import { EVENTS, EV_TXT, Ev } from '@/lib/events';
import { IMG } from '@/lib/images';
import HeroSlideshow from '@/components/HeroSlideshow';

const LOCALE = { it: 'it-IT', fr: 'fr-FR', en: 'en-GB', de: 'de-DE' };
const d_ = (s: string) => ({ ['--d' as any]: s });

export default function Eventi({ params }: { params: { lang: Lang } }) {
  const L = params.lang;
  const fmt = (e: Ev) => new Date(`${e.date}T${e.time}`).toLocaleDateString(LOCALE[L], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const book = (e: Ev, amount: number) => `/${L}/sostieni?evento=${e.id}&importo=${amount}`;
  const galas = EVENTS.filter(e => e.vip);

  return (<>
    <HeroSlideshow images={[IMG.venere2]} small>
      <h1 className="reveal">{EV_TXT.title[L]}</h1>
      <p className="reveal" style={d_('.2s')}>{EV_TXT.lead[L]}</p>
    </HeroSlideshow>

    <section className="dark"><div className="container">
      {galas.map(g => (
        <div key={g.id} className="reveal" style={{ border: '1px solid var(--ochre)', borderRadius: 24, padding: 40, marginBottom: 28, background: 'linear-gradient(135deg, #2a2723, #1d1c1a)' }}>
          <p className="eyebrow">★ Gold VIP · {fmt(g)} · {g.time}</p>
          <h2 style={{ color: '#fff' }}>{g.title}</h2>
          <p>{g.venue} — {g.city}</p>
          <p style={{ color: 'var(--venere)', fontWeight: 600 }}>{EV_TXT.vip[L]}</p>
          <p><Link className="btn" href={book(g, g.vip!.silver)}>Silver · {g.vip!.silver} €</Link>{' '}
             <Link className="btn green" href={book(g, g.vip!.gold)}>Gold · {g.vip!.gold} €</Link></p>
        </div>
      ))}
    </div></section>

    {['2027', '2028'].map(y => (
      <section key={y} className={y === '2028' ? 'sand' : ''}><div className="container">
        <h2 className="reveal">{y}</h2>
        <div className="grid">
          {EVENTS.filter(e => e.date.startsWith(y) && !e.vip).map((e, n) => (
            <div key={e.id} className="card reveal" style={d_(`${(n % 4) * 0.08}s`)}>
              <p className="eyebrow">{fmt(e)} · {e.time}</p>
              <h3 style={{ margin: '6px 0' }}>{e.title}</h3>
              <p style={{ margin: 0 }}><strong>{e.city}</strong><br />{e.venue}</p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', margin: '10px 0 0', color: 'var(--sea)' }}>{e.price} €</p>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: 0 }}>{EV_TXT.includes[L]} {e.quota} € + {e.extra} {e.price - e.quota} €</p>
              <Link className="btn green" href={book(e, e.price)}>{EV_TXT.book[L]}</Link>
            </div>
          ))}
        </div>
      </div></section>
    ))}
  </>);
}
