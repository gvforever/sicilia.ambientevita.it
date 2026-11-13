import type { MetadataRoute } from 'next';

const BASE = process.env.SITE_URL || 'https://sicilia.ambientevita.it';
const LANGS = ['it', 'fr', 'en', 'de'];
const PAGES = ['', '/associazione', '/asino', '/convegno', '/archeologia', '/eventi', '/sostieni'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(p => LANGS.map(l => ({
    url: `${BASE}/${l}${p}`,
    lastModified: new Date(),
    changeFrequency: p === '' || p === '/eventi' ? 'weekly' as const : 'monthly' as const,
    priority: p === '' ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(LANGS.map(x => [x, `${BASE}/${x}${p}`])) },
  })));
}
