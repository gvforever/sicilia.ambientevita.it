import Link from 'next/link';
import { ANIMALI } from '@/lib/animali';
import CtaButtons from '@/components/CtaButtons';

export const metadata = { title: 'Gli animali da proteggere in Sicilia e in Italia — AmbienteVita', description: '21 animali simbolo della natura siciliana e italiana: dove vivono, come osservarli, come proteggerli.' };

export default function Animali({ params }: { params: { lang: string } }) {
  const l = params.lang;
  const block = (z: 'Sicilia' | 'Italia', title: string) => (
    <>
      <h2 style={{ marginTop: 50 }}>{title}</h2>
      <div className="grid">{ANIMALI.filter(a => a.zona === z).map(a => (
        <Link key={a.slug} href={`/${l}/animali/${a.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="eyebrow">{a.regioni.split(',')[0]}</span>
          <h3 style={{ margin: '6px 0' }}>{a.name}</h3>
          <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--muted)' }}>{a.latin}</p>
          <p>{a.text}</p>
        </Link>
      ))}</div>
    </>
  );
  return (
    <section style={{ paddingTop: 140 }}><div className="container">
      <p className="eyebrow">Natura</p>
      <h1>Gli animali da proteggere</h1>
      <p className="prose" style={{ margin: 0 }}>AmbienteVita osserva l’ambiente nella sua interezza e sostiene le azioni ecologiche su tutto il territorio italiano. Proteggere un animale significa proteggere il suo habitat: scopri anche <Link href={`/${l}/natura`}>i luoghi naturali della Sicilia</Link>.</p>
      {block('Sicilia', 'Gli animali della Sicilia')}
      {block('Italia', 'Gli animali d’Italia')}
      <CtaButtons lang={l} />
    </div></section>
  );
}
