import Link from 'next/link';
import { Lang, t } from '@/lib/i18n';
import { HERO, IMG } from '@/lib/images';
import HeroSlideshow from '@/components/HeroSlideshow';
import Counter from '@/components/Counter';
import SicilyMap from '@/components/SicilyMap';
import Preloader from '@/components/Preloader';
import { SICILIA, PROVS, PANTELLERIA } from '@/lib/province';
import { SPOTS } from '@/lib/spots';
import CtaButtons from '@/components/CtaButtons';

const d_ = (s: string) => ({ ['--d' as any]: s });
const FALL = 'linear-gradient(135deg, var(--caper), var(--sea))';

export default function Home({ params }: { params: { lang: Lang } }) {
  const L = params.lang, d = t(L).home;
  const ld = { '@context': 'https://schema.org', '@type': 'NGO', name: 'AmbienteVita Sicilia', url: `https://sicilia.ambientevita.it/${L}`, logo: 'https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp', parentOrganization: { '@type': 'Organization', name: 'AmbienteVita', url: 'https://www.ambientevita.it' }, areaServed: 'Sicilia' };
  return (<>
    <Preloader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <HeroSlideshow images={HERO}>
      <p className="eyebrow">Sicilia · Isole minori</p>
      <h1>{d.title}</h1>
      <p>{d.lead}</p>
      <p><Link className="btn" href={`/${L}/sostieni`}>{d.cta}</Link></p>
    </HeroSlideshow>

    <section><div className="container split">
      <div className="reveal">
        <p className="eyebrow">La nostra isola</p>
        <h2>{SICILIA.title}</h2>
        {SICILIA.text.map(p => <p key={p}>{p}</p>)}
        <p><Link href={`/${L}/natura`}>Scopri i 27 luoghi naturali da proteggere →</Link></p>
      </div>
      <div className="reveal" style={d_('.2s')}><blockquote className="quote">{d.president}</blockquote></div>
    </div></section>

    <section className="dark"><div className="container stats">
      <div className="reveal"><Counter to={30} suffix="+" /><span>anni di impegno</span></div>
      <div className="reveal" style={d_('.15s')}><Counter to={9} /><span>province</span></div>
      <div className="reveal" style={d_('.3s')}><Counter to={27} /><span>luoghi da proteggere</span></div>
    </div></section>

    <section className="sand"><div className="container">
      <h2 className="reveal">{d.provincesTitle}</h2>
      <p className="reveal">{d.provincesLead}</p>
      <SicilyMap title="La Sicilia e le sue isole" />
      <p className="choices" style={{ justifyContent: 'center', marginTop: 30 }}>{PROVS.map(p => <a key={p.slug} className="choice" href={`#prov-${p.slug}`}>{p.name}</a>)}</p>
    </div></section>

    {PROVS.map((p, n) => {
      const spots = SPOTS.filter(s => s.prov === p.name);
      return (
        <section key={p.slug} id={`prov-${p.slug}`} className={n % 2 ? 'sand' : ''} style={{ scrollMarginTop: 80 }}>
          <div className="container">
            <p className="eyebrow">Provincia di {p.name}</p>
            <h2 className="reveal">{p.title}</h2>
            <div className="split" style={{ alignItems: 'start' }}>
              <div className="reveal">
                {p.text.map(x => <p key={x}>{x}</p>)}
                {p.slug === 'trapani' && <div className="card" style={{ marginTop: 20 }}>
                  <h3 style={{ marginTop: 0 }}>{PANTELLERIA.title}</h3>
                  <p>{PANTELLERIA.text}</p>
                  <p><Link href={`/${L}/asino`}>L’asino di Pantelleria</Link> · <Link href={`/${L}/luoghi/lago-di-venere`}>Lago di Venere</Link> · <Link href={`/${L}/luoghi/arco-dell-elefante`}>Arco dell’Elefante</Link> · <Link href={`/${L}/archeologia`}>Archeologia</Link></p>
                </div>}
              </div>
              <div className="reveal" style={d_('.15s')}>
                {p.photos.map(ph => <figure key={ph.alt} style={{ margin: '0 0 14px', borderRadius: 18, overflow: 'hidden', aspectRatio: '16/10', background: `url("${ph.src}") center/cover, ${FALL}`, position: 'relative' }}><figcaption style={{ position: 'absolute', left: 14, bottom: 10, color: '#fff', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,.6)' }}>{ph.alt}</figcaption></figure>)}
                <div className="card"><strong>Natura da proteggere</strong>
                  <ul style={{ margin: '10px 0 0', paddingLeft: 18 }}>{spots.map(s => <li key={s.name}><Link href={`/${L}/natura#${p.slug}`}>{s.name}</Link></li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })}

    <section className="dark"><div className="container" style={{ textAlign: 'center' }}>
      <h2>Proteggiamo insieme la Sicilia</h2>
      <p>Diventa socio, partecipa a un evento o sostieni i nostri progetti.</p>
      <CtaButtons lang={L} dark />
    </div></section>
  </>);
}
