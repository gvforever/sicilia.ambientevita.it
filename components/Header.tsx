import Link from 'next/link';
import { Lang, LANGS, FLAGS, t } from '@/lib/i18n';
import { EV_TXT } from '@/lib/events';

export default function Header({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <header><div className="container bar">
      <Link href={`/${lang}`} className="brand">
        <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" alt="Ambiente e/è Vita" />
        <div><strong>Ambiente e/è Vita Sicilia</strong><br /><small>{d.tagline}</small></div>
      </Link>
      <nav>
        <Link href={`/${lang}`}>{d.nav.home}</Link>
        <Link href={`/${lang}/associazione`}>{d.nav.association}</Link>
        <Link href={`/${lang}/asino`}>{d.nav.asino}</Link>
        <Link href={`/${lang}/convegno`}>{d.nav.convegno}</Link>
        <Link href={`/${lang}/archeologia`}>{d.nav.archeologia}</Link>
        <Link href={`/${lang}/eventi`}>{EV_TXT.nav[lang]}</Link>
        <Link href={`/${lang}/sostieni`} className="btn green">{d.nav.support}</Link>
      </nav>
      <div className="flags">
        {LANGS.map(l => <Link key={l} href={`/${l}`} className={l === lang ? 'active' : ''} aria-label={l}>{FLAGS[l]}</Link>)}
      </div>
    </div></header>
  );
}
