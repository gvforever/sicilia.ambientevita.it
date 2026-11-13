import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ANIMALI, findAnimale } from '@/lib/animali';
import CtaButtons from '@/components/CtaButtons';

export function generateStaticParams() { return ANIMALI.map(a => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = findAnimale(params.slug);
  return a ? { title: `${a.name} (${a.latin}) — AmbienteVita`, description: a.text } : {};
}

export default function Scheda({ params }: { params: { lang: string; slug: string } }) {
  const a = findAnimale(params.slug); if (!a) notFound();
  const l = params.lang;
  const altri = ANIMALI.filter(x => x.zona === a.zona && x.slug !== a.slug).slice(0, 4);
  return (
    <section style={{ paddingTop: 140 }}><div className="container prose">
      <p className="eyebrow"><Link href={`/${l}/animali`}>Animali</Link> · {a.zona}</p>
      <h1 style={{ marginBottom: 4 }}>{a.name}</h1>
      <p style={{ fontStyle: 'italic', color: 'var(--muted)', marginTop: 0 }}>{a.latin}</p>
      <p style={{ fontSize: '1.15rem' }}>{a.text}</p>
      <div className="facts">
        <div><span>Regioni</span>{a.regioni}</div>
        <div><span>Dove osservarlo</span>{a.dove}</div>
        <div><span>Tutela</span>{a.tutela}</div>
      </div>
      <h2>Come osservarlo</h2>
      <p>Osserva sempre a distanza, in silenzio, senza lasciare cibo né disturbare nidi e tane. I periodi migliori sono l’alba e il tramonto, con un binocolo e la guida dei parchi.</p>
      <h2>L’impegno di AmbienteVita</h2>
      <p>AmbienteVita osserva l’ambiente nella sua interezza e sostiene le azioni ecologiche su tutto il territorio italiano: tutela degli habitat, educazione nelle scuole e collaborazione con i parchi. <Link href={`/${l}/eventi`}>Partecipa ai nostri eventi</Link> o <Link href={`/${l}/sostieni`}>diventa socio</Link>.</p>
      <h2>Altri animali</h2>
      <p className="choices">{altri.map(x => <Link key={x.slug} className="choice" href={`/${l}/animali/${x.slug}`}>{x.name}</Link>)}</p>
      <CtaButtons lang={l} />
    </div></section>
  );
}
