import type { MetadataRoute } from 'next';
import { EVENTS } from '@/lib/events';
import { PLACES } from '@/lib/places';
import { LEGAL_PAGES } from '@/lib/legal';

const BASE = process.env.SITE_URL || 'https://sicilia.ambientevita.it';
const LANGS = ['it', 'fr', 'en', 'de'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '', '/associazione', '/asino', '/convegno', '/archeologia', '/eventi', '/sostieni', '/contatti',
    ...Object.keys(PLACES).map(s => `/luoghi/${s}`),
    ...EVENTS.map(e => `/eventi/${e.id}`),
    ...Object.keys(LEGAL_PAGES).map(s => `/legal/${s}`),
  ];
  return paths.flatMap(p => LANGS.map(l => ({
    url: `${BASE}/${l}${p}`,
    lastModified: new Date(),
    changeFrequency: (p === '' || p === '/eventi' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: p === '' ? 1 : p.startsWith('/legal') ? 0.2 : 0.7,
    alternates: { languages: Object.fromEntries(LANGS.map(x => [x, `${BASE}/${x}${p}`])) },
  })));
}
