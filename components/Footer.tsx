import { Lang, t } from '@/lib/i18n';
export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <footer><div className="container">
      <p><strong>Ambiente e/è Vita Sicilia</strong> — {d.tagline}</p>
      <p>Pantelleria (TP) · <a href="mailto:sicilia@ambientevita.it">sicilia@ambientevita.it</a> · <a href="https://www.ambientevita.it">{d.footer.national}</a></p>
      <p>© {new Date().getFullYear()} Associazione Siciliana di Ambiente e/è Vita. {d.footer.rights}</p>
    </div></footer>
  );
}
