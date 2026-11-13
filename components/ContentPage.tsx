import { Lang } from '@/lib/i18n';
import { PAGES } from '@/content/pages';
import HeroSlideshow from '@/components/HeroSlideshow';

const NOTE: Record<Lang, string> = { it: '', fr: 'Texte original en italien', en: 'Original text in Italian', de: 'Originaltext auf Italienisch' };

export default function ContentPage({ slug, lang }: { slug: keyof typeof PAGES; lang: Lang }) {
  const p = PAGES[slug];
  const body = p.body[lang] ?? p.body.it;
  const showNote = !p.body[lang] && lang !== 'it';
  return (<>
    <HeroSlideshow images={[p.image]} small>
      <h1 className="reveal">{p.title[lang]}</h1>
      <p className="reveal" style={{ ['--d' as any]: '.2s' }}>{p.intro[lang]}</p>
    </HeroSlideshow>
    <section><div className="container prose">
      <p className="eyebrow">{p.author}</p>
      {showNote && <p><em>{NOTE[lang]}</em></p>}
      {body.split(/\n\s*\n/).map((para, i) =>
        para.startsWith('## ')
          ? <h2 key={i} className="reveal">{para.slice(3)}</h2>
          : <p key={i} className="reveal">{para}</p>
      )}
    </div></section>
  </>);
}
