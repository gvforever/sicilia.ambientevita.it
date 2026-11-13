import { notFound } from 'next/navigation';
import { isLang, LANGS } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';

export function generateStaticParams() { return LANGS.map(lang => ({ lang })); }

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  return (<><Effects /><Header lang={params.lang} /><main>{children}</main><Footer lang={params.lang} /></>);
}
