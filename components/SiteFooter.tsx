import Link from 'next/link';
import { Lang, t } from '@/lib/i18n';
import Flags from '@/components/Flags';
import { LEGAL_NAV, CONTACT_EMAIL } from '@/lib/legal';
import { NAV } from '@/lib/nav';
import { SPOTS } from '@/lib/spots';
import '@/components/menu.css';

export default function SiteFooter({ lang }: { lang: Lang }) {
  const d = t(lang);
  const L = LEGAL_NAV[lang];
  const h = (x: string) => `/${lang}${x}`;
  return (
    <footer><div className="container">
      <div className="fgrid">
        <div>
          <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" alt="" style={{ height: 54, background: '#fff', borderRadius: '50%', padding: 4 }} />
          <p><strong>AmbienteVita Sicilia</strong><br />{d.tagline}</p>
          <p>Pantelleria (TP){CONTACT_EMAIL ? <> · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : null}</p>
          <p><Link className="btn" href={h('/sostieni')}>Diventa socio</Link></p>
          <p><Link href={h('/contatti')}>{L.contact}</Link> · <a href="https://www.ambientevita.it">{d.footer.national}</a></p>
        </div>
        {NAV.map(g => (
          <div key={g.label}>
            <h4>{g.label}</h4>
            {g.items.map(i => <Link key={i.href} href={h(i.href)}>{i.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="frec" style={{ marginTop: 36, padding: 22, border: '1px solid rgba(255,255,255,.15)', fontSize: '.9rem', lineHeight: 1.6 }}>
        <strong style={{ color: '#fff' }}>AmbienteVita Sicilia</strong> è il ramo regionale dell’associazione nazionale Ambiente e Vita, associazione di protezione ambientale riconosciuta dal Ministero dell’Ambiente e della Sicurezza Energetica, attiva su tutto il territorio nazionale con progetti di tutela, campagne di sensibilizzazione ed educazione ambientale. Presidente regionale: Giuseppe Sechi, Pantelleria (TP). <Link href={h('/regioni')}>AmbienteVita nelle regioni →</Link>
      </div>
      <div className="ftags">{SPOTS.map(s => <Link key={s.name} href={h(`/natura#${s.prov.toLowerCase()}`)}>{s.name}</Link>)}</div>
      <p className="legal-links">
        <Link href={h('/legal/cgu')}>{L.cgu}</Link> · <Link href={h('/legal/cgv')}>{L.cgv}</Link> · <Link href={h('/legal/note-legali')}>{L.legal}</Link> · <Link href={h('/legal/privacy')}>{L.privacy}</Link> · <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">{L.gdpr}</a>
      </p>
      <Flags lang={lang} className="flags flags-footer" />
      <p>© {new Date().getFullYear()} Associazione Siciliana AmbienteVita. {d.footer.rights}</p>
    </div></footer>
  );
}
