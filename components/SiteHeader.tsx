'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Lang, t } from '@/lib/i18n';
import Flags from '@/components/Flags';
import { NAV } from '@/lib/nav';
import './menu.css';

export default function SiteHeader({ lang }: { lang: Lang }) {
  const d = t(lang);
  const path = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<number | null>(null);
  useEffect(() => { setOpen(false); setSub(null); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const h = (x: string) => `/${lang}${x}`;

  return (
    <header className={open ? 'open' : ''}>
      <div className="container bar">
        <Link href={`/${lang}`} className="brand">
          <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" alt="AmbienteVita Sicilia" />
          <div><strong>AmbienteVita Sicilia</strong><br /><small>{d.tagline}</small></div>
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><span /><span /><span /></button>
        <div className="menu">
          <nav className="mnav">
            <Link href={`/${lang}`}>{d.nav.home}</Link>
            {NAV.map((g, n) => (
              <div key={g.label} className={`dd ${sub === n ? 'show' : ''}`} onMouseEnter={() => setSub(n)} onMouseLeave={() => setSub(null)}>
                <button type="button" className="dd-btn" onClick={() => setSub(sub === n ? null : n)} aria-expanded={sub === n}>{g.label} <span aria-hidden>▾</span></button>
                <div className="dd-panel">{g.items.map(i => <Link key={i.href} href={h(i.href)}>{i.label}</Link>)}</div>
              </div>
            ))}
            <Link href={h('/sostieni')} className="btn green">{d.nav.support}</Link>
          </nav>
          <Flags lang={lang} className="flags flags-mobile" />
        </div>
      </div>
      <Flags lang={lang} className="flags flags-top" />
    </header>
  );
}
