import Link from 'next/link';
import type { Metadata } from 'next';
import { Lang, LANGS } from '@/lib/i18n';
import { EVENTS, EV_TXT, Ev } from '@/lib/events';
import { IMG } from '@/lib/images';
import HeroSlideshow from '@/components/HeroSlideshow';

const LOCALE = { it: 'it-IT', fr: 'fr-FR', en: 'en-GB', de: 'de-DE' };
const JOIN = { it: 'Partecipa', fr: 'Participer', en: 'Join', de: 'Teilnehmen' };
const d_ = (s: string) => ({ ['--d' as any]: s });

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return { title: EV_TXT.title[params.lang], description: EV_TXT.lead[params.lang], alternates: { canonical: `/${params.lang}/eventi`, languages: Object.fromEntries(LANGS.map(l => [l, `/${l}/eventi`])) } };
}

export default function Eventi({ params }: { params: { lang: Lang } }) {
  const L = params.lang;
  const fmt = (e: Ev) => new Date(`${e.date}T${e.time}`).toLocaleDateString(LOCALE[L], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const list = [...EVENTS].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  let year = '';

  return (<>
    <HeroSlideshow images={[IMG.venere2]} small>
      <h1 className="reveal">{EV_TXT.title[L]}</h1>
      <p className="reveal" style={d_('.2s')}>{EV_TXT.lead[L]}</p>
    </HeroSlideshow>

    <section><div className="container ev-grid">
      {list.flatMap((e, n) => {
        const out: JSX.Element[] = [];
        const y = e.date.slice(0, 4);
        if (y !== year) { year = y; out.push(<h2 key={'y' + y} className="ev-year reveal">{y}</h2>); }
        out.push(e.vip ? (
          <div key={e.id} className="ev-gala reveal">
            <p className="eyebrow">★ Gold VIP · {fmt(e)} · {e.time}</p>
            <h2>{e.title}</h2>
            <p>{e.venue} — {e.city}</p>
            <p className="vip">{EV_TXT.vip[L]}</p>
            <p><Link className="btn" href={`/${L}/eventi/${e.id}?f=silver`}>Silver · {e.vip.silver} €</Link><Link className="btn green" href={`/${L}/eventi/${e.id}?f=gold`}>Gold · {e.vip.gold} €</Link></p>
          </div>
        ) : (
          <div key={e.id} className="card ev-card reveal" style={d_(`${(n % 3) * 0.08}s`)}>
            <p className="eyebrow">{fmt(e)} · {e.time}</p>
            <h3 style={{ margin: '6px 0' }}>{e.title}</h3>
            <p style={{ margin: 0 }}><strong>{e.city}</strong><br />{e.venue}</p>
            <p className="ev-price">{e.price} €</p>
            <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: 0 }}>{EV_TXT.includes[L]} {e.quota} €</p>
            <Link className="btn green" href={`/${L}/eventi/${e.id}`}>{JOIN[L]}</Link>
          </div>
        ));
        return out;
      })}
    </div></section>
  </>);
}
