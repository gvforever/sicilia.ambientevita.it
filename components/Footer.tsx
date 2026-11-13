import { Lang, t } from '@/lib/i18n';
export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <footer><div className="container">
      <p><strong>AmbienteVita Sicilia</strong> — {d.tagline}</p>
      <p>Pantelleria (TP) · <a href="mailto:sicilia@ambientevita.it">sicilia@ambientevita.it</a> · <a href="https://www.ambientevita.it">{d.footer.national}</a></p>
      <p>© {new Date().getFullYear()} Associazione Siciliana di AmbienteVita. {d.footer.rights}</p>
    </div></footer>
  );
}
