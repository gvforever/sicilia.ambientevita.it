'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Lang, LANGS, FLAGS, t } from '@/lib/i18n';
import { EV_TXT } from '@/lib/events';

export default function Header({ lang }: { lang: Lang }) {
  const d = t(lang);
  const path = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const links: [string, string][] = [
    ['', d.nav.home], ['/associazione', d.nav.association], ['/asino', d.nav.asino],
    ['/convegno', d.nav.convegno], ['/archeologia', d.nav.archeologia], ['/eventi', EV_TXT.nav[lang]],
  ];
  // Le drapeau garde la même page dans l'autre langue
  const switchTo = (l: Lang) => path.replace(/^\/(it|fr|en|de)(?=\/|$)/, `/${l}`);

  return (
    <header className={open ? 'open' : ''}><div className="container bar">
      <Link href={`/${lang}`} className="brand">
        <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" alt="Ambiente e/è Vita" />
        <div><strong>AmbienteVita Sicilia</strong><br /><small>{d.tagline}</small></div>
      </Link>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><span /><span /><span /></button>
      <div className="menu">
        <nav>
          {links.map(([href, label]) => <Link key={href} href={`/${lang}${href}`}>{label}</Link>)}
          <Link href={`/${lang}/sostieni`} className="btn green">{d.nav.support}</Link>
        </nav>
        <div className="flags">
          {LANGS.map(l => <Link key={l} href={switchTo(l)} className={l === lang ? 'active' : ''} aria-label={l}>{FLAGS[l]}</Link>)}
        </div>
      </div>
    </div></header>
  );
}
