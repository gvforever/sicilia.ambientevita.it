import type { Metadata } from 'next';
import { Lang, LANGS } from '@/lib/i18n';
import { PAGES } from '@/content/pages';

export const SITE = process.env.SITE_URL || 'https://sicilia.ambientevita.it';

export function alt(lang: Lang, path: string) {
  return { canonical: `/${lang}${path}`, languages: { ...Object.fromEntries(LANGS.map(l => [l, `/${l}${path}`])), 'x-default': `/it${path}` } };
}

export function pageMeta(slug: string, lang: Lang): Metadata {
  const p = PAGES[slug];
  return { title: p.title[lang], description: p.intro[lang], alternates: alt(lang, `/${slug}`), openGraph: { title: p.title[lang], description: p.intro[lang], images: [p.image] } };
}
