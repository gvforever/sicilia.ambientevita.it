import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Lang, LANGS } from '@/lib/i18n';
import { PLACES, PLACE_TXT } from '@/lib/places';
import HeroSlideshow from '@/components/HeroSlideshow';

export function generateStaticParams() {
  return LANGS.flatMap(lang => Object.keys(PLACES).map(slug => ({ lang, slug })));
}

export function generateMetadata({ params }: { params: { lang: Lang; slug: string } }): Metadata {
  const p = PLACES[params.slug];
  if (!p) return {};
  return {
    title: p.name[params.lang], description: p.lead[params.lang],
    alternates: { canonical: `/${params.lang}/luoghi/${params.slug}`, languages: Object.fromEntries(LANGS.map(l => [l, `/${l}/luoghi/${params.slug}`])) },
    openGraph: { title: p.name[params.lang], description: p.lead[params.lang], images: [p.image] },
  };
}

export default function Luogo({ params }: { params: { lang: Lang; slug: string } }) {
  const p = PLACES[params.slug];
  if (!p) notFound();
  const L = params.lang;
  const [lat, lon] = p.gps;
  const ld = { '@context': 'https://schema.org', '@type': 'TouristAttraction', name: p.name[L], description: p.lead[L], image: p.image, geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lon }, address: { '@type': 'PostalAddress', addressLocality: 'Pantelleria', addressRegion: 'TP', addressCountry: 'IT' } };
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <HeroSlideshow images={[p.image]} small>
      <p className="eyebrow reveal">Pantelleria · Sicilia</p>
      <h1 className="reveal">{p.name[L]}</h1>
      <p className="reveal">{p.lead[L]}</p>
    </HeroSlideshow>
    <section><div className="container prose">
      {p.body[L].map((t, i) => <p key={i} className="reveal">{t}</p>)}
      <div className="facts">
        {p.facts[L].map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}
        <div><span>{PLACE_TXT.gps[L]}</span><strong>{lat.toFixed(3)}° N, {lon.toFixed(3)}° E</strong></div>
      </div>
      <p><a className="btn green" href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`} target="_blank" rel="noopener noreferrer">{PLACE_TXT.map[L]}</a></p>
      <p className="credit">{PLACE_TXT.credit[L]}</p>
      <p><Link href={`/${L}`}>{PLACE_TXT.back[L]}</Link></p>
    </div></section>
  </>);
}
