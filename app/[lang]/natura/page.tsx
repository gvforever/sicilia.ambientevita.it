import Link from 'next/link';
import { Lang } from '@/lib/i18n';
import { SPOTS, PROV_SLUG } from '@/lib/spots';
import CtaButtons from '@/components/CtaButtons';

export const metadata = { title: 'I luoghi naturali della Sicilia da proteggere — AmbienteVita Sicilia', description: '27 luoghi naturali della Sicilia, provincia per provincia, da conoscere e proteggere.' };

export default function Natura({ params }: { params: { lang: Lang } }) {
  const l = params.lang;
  const provs = Object.keys(PROV_SLUG);
  return (
    <section style={{ paddingTop: 140 }}><div className="container">
      <p className="eyebrow">Natura da proteggere</p>
      <h1>I grandi luoghi naturali della Sicilia</h1>
      <p className="prose" style={{ margin: 0 }}>Dalle riserve costiere ai vulcani, ecco i luoghi che AmbienteVita Sicilia vuole far conoscere e proteggere, provincia per provincia. Scopri anche <Link href={`/${l}`}>la Sicilia sulla home</Link>, <Link href={`/${l}/asino`}>l’asino di Pantelleria</Link> e <Link href={`/${l}/eventi`}>i nostri eventi</Link>.</p>
      <p className="choices" style={{ margin: '24px 0' }}>{provs.map(p => <a key={p} className="choice" href={`#${PROV_SLUG[p]}`}>{p}</a>)}</p>
      {provs.map(p => (
        <div key={p} id={PROV_SLUG[p]} style={{ scrollMarginTop: 110 }}>
          <h2 style={{ marginTop: 40 }}>Provincia di {p}</h2>
          <div className="grid">
            {SPOTS.filter(s => s.prov === p).map(s => (
              <div key={s.name} className="card"><h3 style={{ marginTop: 0 }}>{s.name}</h3><p>{s.text}</p></div>
            ))}
          </div>
          <p><Link href={`/${l}#prov-${PROV_SLUG[p]}`}>Scopri la provincia di {p} →</Link></p>
        </div>
      ))}
      <CtaButtons lang={l} />
    </div></section>
  );
}
