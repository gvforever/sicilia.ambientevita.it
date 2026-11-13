import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLang, LANGS, Lang, t } from '@/lib/i18n';
import { IMG } from '@/lib/images';
import { SITE, alt } from '@/lib/seo';
import Header from '@/components/SiteHeader';
import Footer from '@/components/SiteFooter';
import CookieBar from '@/components/CookieBar';
import Effects from '@/components/Effects';

const OG_LOCALE: Record<Lang, string> = { it: 'it_IT', fr: 'fr_FR', en: 'en_GB', de: 'de_DE' };

export function generateStaticParams() { return LANGS.map(lang => ({ lang })); }

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const L = (isLang(params.lang) ? params.lang : 'it') as Lang;
  const d = t(L).home;
  return {
    metadataBase: new URL(SITE),
    title: { default: `AmbienteVita Sicilia — ${t(L).tagline}`, template: '%s | AmbienteVita Sicilia' },
    description: d.lead,
    alternates: alt(L, ''),
    openGraph: { siteName: 'AmbienteVita Sicilia', type: 'website', locale: OG_LOCALE[L], title: 'AmbienteVita Sicilia', description: d.lead, images: [IMG.venere] },
    twitter: { card: 'summary_large_image' },
    icons: { icon: 'https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp' },
  };
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  return (<><Effects /><Header lang={params.lang} /><main>{children}</main><Footer lang={params.lang} /><CookieBar lang={params.lang} /></>);
}
