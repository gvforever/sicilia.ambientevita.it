import Link from 'next/link';
import { PARCHI } from '@/lib/parchi';
import CtaButtons from '@/components/CtaButtons';

export const metadata = { title: 'I parchi della Sicilia — AmbienteVita Sicilia', description: 'Il parco nazionale di Pantelleria e i parchi regionali di Etna, Madonie, Nebrodi e Alcantara.' };

export default function Parchi({ params }: { params: { lang: string } }) {
  const l = params.lang;
  return (
    <section style={{ paddingTop: 140 }}><div className="container">
      <p className="eyebrow">Natura</p>
      <h1>I parchi della Sicilia</h1>
      <p className="prose" style={{ margin: 0 }}>Un parco nazionale e quattro grandi parchi regionali custodiscono vulcani, montagne, foreste e fiumi. Scopri anche <Link href={`/${l}/natura`}>i luoghi naturali</Link> e <Link href={`/${l}/animali`}>gli animali da proteggere</Link>.</p>
      <div className="grid" style={{ marginTop: 30 }}>{PARCHI.map(p => (
        <Link key={p.slug} href={`/${l}/parchi/${p.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="eyebrow">{p.tipo} · {p.prov}</span>
          <h3 style={{ margin: '6px 0' }}>{p.name}</h3>
          <p>{p.intro}</p>
          <strong style={{ color: 'var(--sea)' }}>Scopri il parco →</strong>
        </Link>
      ))}</div>
      <CtaButtons lang={l} />
    </div></section>
  );
}
