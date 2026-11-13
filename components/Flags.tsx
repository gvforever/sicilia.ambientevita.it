'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang, LANGS } from '@/lib/i18n';
import './flags-3d.css';

const CODE: Record<Lang, string> = { it: 'it', fr: 'fr', en: 'gb', de: 'de' };
const NAME: Record<Lang, string> = { it: 'Italiano', fr: 'Français', en: 'English', de: 'Deutsch' };

export default function Flags({ lang, className = 'flags' }: { lang: Lang; className?: string }) {
  const path = usePathname() || `/${lang}`;
  const to = (l: Lang) => path.replace(/^\/(it|fr|en|de)(?=\/|$)/, `/${l}`);
  return (
    <div className={className}>
      {LANGS.map(l => (
        <Link key={l} href={to(l)} className={l === lang ? 'active' : ''} aria-label={NAME[l]} title={NAME[l]}>
          <img className="flag-img" src={`https://flagcdn.com/w80/${CODE[l]}.png`} alt={NAME[l]} width={28} height={19} />
        </Link>
      ))}
    </div>
  );
}
