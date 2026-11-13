import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PARCHI, findParco } from '@/lib/parchi';
import { findAnimale } from '@/lib/animali';
import CtaButtons from '@/components/CtaButtons';

export function generateStaticParams() { return PARCHI.map(p => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = findParco(params.slug);
  return p ? { title: `${p.name} — AmbienteVita Sicilia`, description: p.intro } : {};
}

export default function ParcoPage({ params }: { params: { lang: string; slug: string } }) {
  const p = findParco(params.slug); if (!p) notFound();
  const l = params.lang;
  const altri = PARCHI.filter(x => x.slug !== p.slug);
  return (
    <section style={{ paddingTop: 140 }}><div className="container prose">
      <p className="eyebrow"><Link href={`/${l}/parchi`}>Parchi</Link> · {p.tipo}</p>
      <h1>{p.name}</h1>
      <p style={{ fontSize: '1.15rem' }}>{p.intro}</p>
      <div className="facts">
        <div><span>Tipo</span>{p.tipo}</div>
        <div><span>Provincia</span>{p.prov}</div>
      </div>
      <h2>Il paesaggio</h2><p>{p.paesaggio}</p>
      <h2>La flora</h2><p>{p.flora}</p>
      <h2>La fauna</h2><p>{p.fauna}</p>
      {p.animali.length > 0 && <p className="choices">{p.animali.map(s => { const a = findAnimale(s); return a ? <Link key={s} className="choice" href={`/${l}/animali/${s}`}>{a.name}</Link> : null; })}</p>}
      <h2>Cosa fare</h2>
      <ul>{p.fare.map(f => <li key={f}>{f}</li>)}</ul>
      <h2>Visitare con rispetto</h2><p>{p.consigli}</p>
      <h2>L’impegno di AmbienteVita</h2>
      <p>AmbienteVita osserva l’ambiente nella sua interezza e sostiene le azioni ecologiche su tutto il territorio italiano. Nei parchi siciliani promuoviamo la conoscenza, l’educazione ambientale e il rispetto di chi li abita. {p.link && <Link href={`/${l}${p.link}`}>Scopri la nostra storia a Pantelleria →</Link>}</p>
      <p><Link href={`/${l}/natura`}>Vedi tutti i luoghi naturali della Sicilia →</Link></p>
      <h2>Altri parchi</h2>
      <p className="choices">{altri.map(x => <Link key={x.slug} className="choice" href={`/${l}/parchi/${x.slug}`}>{x.name.replace(/^Parco (Nazionale dell’Isola di |Fluviale dell’|dell’|delle |dei )/, '')}</Link>)}</p>
      <CtaButtons lang={l} />
    </div></section>
  );
}
