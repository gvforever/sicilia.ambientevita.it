import Link from 'next/link';
import { Lang, t, PROVINCES } from '@/lib/i18n';
import { HERO, IMG } from '@/lib/images';
import HeroSlideshow from '@/components/HeroSlideshow';
import Counter from '@/components/Counter';
import SicilyMap from '@/components/SicilyMap';

const X: Record<Lang, { stats: string[]; map: string; gallery: string[]; credit: string }> = {
  it: { stats: ['anni di impegno', 'province', 'isole minori'], map: 'La Sicilia e le sue isole', gallery: ['Lago di Venere', 'Arco dell’Elefante', 'Lago di Venere', 'Il mare di Pantelleria'], credit: 'Foto: Wikimedia Commons, licenze Creative Commons.' },
  fr: { stats: ['ans d’engagement', 'provinces', 'petites îles'], map: 'La Sicile et ses îles', gallery: ['Lac de Vénus', 'Arc de l’Éléphant', 'Lac de Vénus', 'La mer de Pantelleria'], credit: 'Photos : Wikimedia Commons, licences Creative Commons.' },
  en: { stats: ['years of commitment', 'provinces', 'minor islands'], map: 'Sicily and its islands', gallery: ['Lake of Venus', 'Elephant Arch', 'Lake of Venus', 'The sea of Pantelleria'], credit: 'Photos: Wikimedia Commons, Creative Commons licences.' },
  de: { stats: ['Jahre Engagement', 'Provinzen', 'kleine Inseln'], map: 'Sizilien und seine Inseln', gallery: ['Venussee', 'Elefantenbogen', 'Venussee', 'Das Meer von Pantelleria'], credit: 'Fotos: Wikimedia Commons, Creative-Commons-Lizenzen.' },
};
const d_ = (s: string) => ({ ['--d' as any]: s });

export default function Home({ params }: { params: { lang: Lang } }) {
  const L = params.lang, d = t(L).home, x = X[L];
  return (<>
    <HeroSlideshow images={HERO}>
      <p className="eyebrow reveal">Pantelleria · Sicilia</p>
      <h1 className="reveal" style={d_('.15s')}>{d.title}</h1>
      <p className="reveal" style={d_('.3s')}>{d.lead}</p>
      <p className="reveal" style={d_('.45s')}><Link className="btn" href={`/${L}/sostieni`}>{d.cta}</Link></p>
    </HeroSlideshow>

    <section><div className="container split">
      <div className="reveal"><p className="eyebrow">{d.presidentTitle}</p><blockquote className="quote">{d.president}</blockquote></div>
      <div className="photo reveal" style={d_('.2s')}><img src={IMG.elefante2} alt="Pantelleria" /></div>
    </div></section>

    <section className="dark"><div className="container stats">
      <div className="reveal"><Counter to={30} suffix="+" /><span>{x.stats[0]}</span></div>
      <div className="reveal" style={d_('.15s')}><Counter to={9} /><span>{x.stats[1]}</span></div>
      <div className="reveal" style={d_('.3s')}><Counter to={15} /><span>{x.stats[2]}</span></div>
    </div></section>

    <section className="sand"><div className="container">
      <h2 className="reveal">{d.provincesTitle}</h2>
      <p className="reveal">{d.provincesLead}</p>
      <SicilyMap title={x.map} />
      <div className="grid" style={{ marginTop: 40 }}>
        {PROVINCES.map((p, n) => <div key={p} className="card reveal" style={d_(`${n * 0.08}s`)}><strong>{p}</strong></div>)}
      </div>
    </div></section>

    <section><div className="container">
      <div className="gallery">
        {HERO.map((src, n) => <figure key={src} className="reveal" style={d_(`${n * 0.12}s`)}><img src={src} alt={x.gallery[n]} /><figcaption>{x.gallery[n]}</figcaption></figure>)}
      </div>
      <p className="credit">{x.credit}</p>
    </div></section>
  </>);
}
