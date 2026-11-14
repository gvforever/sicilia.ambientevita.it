import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lang, LANGS } from '@/lib/i18n';
import { LEGAL_PAGES } from '@/lib/legal';

export function generateStaticParams() {
  return LANGS.flatMap(lang => Object.keys(LEGAL_PAGES).map(slug => ({ lang, slug })));
}

const REC: Record<Lang, { t: string; p: string }> = {
  it: { t: 'Riconoscimento dell’associazione', p: 'AmbienteVita Sicilia è il ramo regionale dell’associazione nazionale Ambiente e Vita, nata nel 1995 e riconosciuta dal Ministero dell’Ambiente e della Sicurezza Energetica come associazione di protezione ambientale ai sensi dell’art. 13 della legge 8 luglio 1986, n. 349 (D.M. n. 456 del 22 ottobre 2001, confermato con D.M. n. 375 del 28 dicembre 2017). Presidente regionale: Giuseppe Sechi, Pantelleria (TP).' },
  fr: { t: 'Reconnaissance de l’association', p: 'AmbienteVita Sicilia est la branche régionale de l’association nationale Ambiente e Vita, fondée en 1995 et reconnue par le ministère italien de l’Environnement et de la Sécurité énergétique comme association de protection de l’environnement, au titre de l’article 13 de la loi n° 349 du 8 juillet 1986 (décret n° 456 du 22 octobre 2001, confirmé par le décret n° 375 du 28 décembre 2017). Président régional : Giuseppe Sechi, Pantelleria (TP).' },
  en: { t: 'Recognition of the association', p: 'AmbienteVita Sicilia is the regional branch of the national association Ambiente e Vita, founded in 1995 and recognised by the Italian Ministry of the Environment and Energy Security as an environmental protection association under Article 13 of Law no. 349 of 8 July 1986 (Ministerial Decree no. 456 of 22 October 2001, confirmed by Decree no. 375 of 28 December 2017). Regional president: Giuseppe Sechi, Pantelleria (TP).' },
  de: { t: 'Anerkennung des Vereins', p: 'AmbienteVita Sicilia ist der regionale Zweig des nationalen Vereins Ambiente e Vita, gegründet 1995 und vom italienischen Ministerium für Umwelt und Energiesicherheit als Umweltschutzverband nach Art. 13 des Gesetzes Nr. 349 vom 8. Juli 1986 anerkannt (Dekret Nr. 456 vom 22. Oktober 2001, bestätigt durch Dekret Nr. 375 vom 28. Dezember 2017). Regionalpräsident: Giuseppe Sechi, Pantelleria (TP).' },
};

export default function Legal({ params }: { params: { lang: Lang; slug: string } }) {
  const page = LEGAL_PAGES[params.slug]?.[params.lang];
  if (!page) notFound();
  const rec = ['note-legali', 'cgu'].includes(params.slug) ? REC[params.lang] : null;
  return (
    <section style={{ paddingTop: 150 }}><div className="container prose">
      <h1>{page.title}</h1>
      {page.body.map((p, i) => <p key={i}>{p}</p>)}
      {rec && <>
        <h2>{rec.t}</h2>
        <p>{rec.p} <Link href={`/${params.lang}/regioni`}>→</Link> · <a href="https://www.ambientevita.it" target="_blank" rel="noopener">ambientevita.it</a></p>
      </>}
      <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{new Date().getFullYear()} — AmbienteVita Sicilia</p>
    </div></section>
  );
}
