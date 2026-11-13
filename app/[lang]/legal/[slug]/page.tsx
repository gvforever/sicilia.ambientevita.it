import { notFound } from 'next/navigation';
import { Lang, LANGS } from '@/lib/i18n';
import { LEGAL_PAGES } from '@/lib/legal';

export function generateStaticParams() {
  return LANGS.flatMap(lang => Object.keys(LEGAL_PAGES).map(slug => ({ lang, slug })));
}

export default function Legal({ params }: { params: { lang: Lang; slug: string } }) {
  const page = LEGAL_PAGES[params.slug]?.[params.lang];
  if (!page) notFound();
  return (
    <section style={{ paddingTop: 150 }}><div className="container prose">
      <h1>{page.title}</h1>
      {page.body.map((p, i) => <p key={i}>{p}</p>)}
      <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{new Date().getFullYear()} — AmbienteVita Sicilia</p>
    </div></section>
  );
}
