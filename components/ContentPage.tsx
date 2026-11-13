import Link from 'next/link';
import { Lang } from '@/lib/i18n';
import { PAGES } from '@/content/pages';
import HeroSlideshow from '@/components/HeroSlideshow';
import CtaButtons from '@/components/CtaButtons';

const NOTE: Record<Lang, string> = { it: '', fr: 'Texte original en italien', en: 'Original text in Italian', de: 'Originaltext auf Italienisch' };
const ASK = [
  ['Ti sta a cuore questo patrimonio?', '/sostieni', 'Partecipa alle nostre azioni'],
  ['Vuoi scoprirlo dal vivo?', '/eventi', 'Unisciti ai nostri eventi'],
  ['Ogni contributo conta.', '/sostieni', 'Fai una donazione'],
  ['Conosci gli altri luoghi da proteggere.', '/natura', 'I luoghi naturali della Sicilia'],
];

export default function ContentPage({ slug, lang }: { slug: keyof typeof PAGES; lang: Lang }) {
  const p = PAGES[slug];
  const body = p.body[lang] ?? p.body.it;
  const showNote = !p.body[lang] && lang !== 'it';
  let k = 0;
  return (<>
    <HeroSlideshow images={[p.image]} small>
      <h1>{p.title[lang]}</h1>
      <p>{p.intro[lang]}</p>
      <p><Link className="btn" href={`/${lang}/sostieni`}>Fai una donazione</Link></p>
    </HeroSlideshow>
    <section><div className="container prose">
      <p className="eyebrow">{p.author}</p>
      {showNote && <p><em>{NOTE[lang]}</em></p>}
      {body.split(/\n\s*\n/).map((para, i) => {
        const el = para.startsWith('## ')
          ? <h2 key={i} className="reveal">{para.slice(3)}</h2>
          : <p key={i} className="reveal">{para}</p>;
        if (i > 0 && i % 5 === 0) {
          const a = ASK[k++ % ASK.length];
          return [el, <p key={`a${i}`} className="card" style={{ borderLeft: '4px solid var(--caper)' }}>{a[0]} <Link href={`/${lang}${a[1]}`}><strong>{a[2]} →</strong></Link></p>];
        }
        return el;
      })}
      <CtaButtons lang={lang} />
    </div></section>
  </>);
}
