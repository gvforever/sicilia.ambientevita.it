import Link from 'next/link';
import { Lang } from '@/lib/i18n';
import { PROVS } from '@/lib/province';
import CtaButtons from '@/components/CtaButtons';

export const metadata = { title: 'Storia e cultura della Sicilia — AmbienteVita Sicilia', description: 'Tremila anni di storia, una lingua, mille tradizioni: la Sicilia raccontata da AmbienteVita Sicilia.' };

const ERE = [
  ['Sicani, Elimi e Siculi', 'I primi popoli dell’isola, prima del 1000 a.C. Agli Elimi si deve Erice, ai Siculi il nome stesso della Sicilia.'],
  ['Fenici e Greci', 'Mozia e Palermo sono fenicie; Siracusa, Agrigento e Selinunte diventano grandi città della Magna Grecia.'],
  ['Roma e Bisanzio', 'La Sicilia è il granaio di Roma. Ne restano la villa del Casale di Piazza Armerina e i suoi mosaici.'],
  ['Gli Arabi', 'Dall’827 portano agrumi, irrigazione, cotone e una nuova agricoltura. Pantelleria ne conserva i nomi e i giardini.'],
  ['I Normanni', 'Ruggero II crea un regno multiculturale: la cappella Palatina e Monreale fondono arte araba, bizantina e latina.'],
  ['Svevi, Angioini, Aragonesi', 'Federico II fa della corte di Palermo un centro di cultura; nasce la Scuola poetica siciliana.'],
  ['Il barocco', 'Dopo il terremoto del 1693 rinascono Noto, Ragusa, Modica e Catania, oggi patrimonio UNESCO.'],
  ['L’Unità e oggi', 'Dal 1860 la Sicilia è italiana; dal 1946 è una regione a statuto speciale.'],
];
const LINGUA = 'Il siciliano è una vera lingua romanza, con influenze greche, arabe, normanne e spagnole. Si divide in parlate occidentali, centrali e orientali; a Pantelleria il pantesco conserva molte parole arabe, e a San Fratello si parla ancora un dialetto gallo-italico.';
const TRADIZIONI = [
  ['Muretti a secco', 'Arte riconosciuta dall’UNESCO, disegna i paesaggi di Pantelleria, degli Iblei e delle Eolie.'],
  ['Vite ad alberello', 'La coltivazione bassa dello zibibbo di Pantelleria è il primo patrimonio agricolo UNESCO.'],
  ['Opera dei pupi', 'Il teatro delle marionette siciliane, patrimonio immateriale dell’umanità.'],
  ['Cucina', 'Arancine, caponata, cannoli, couscous trapanese e capperi di Pantelleria: una storia che si mangia.'],
];

export default function Sicilia({ params }: { params: { lang: Lang } }) {
  const l = params.lang;
  return (
    <section style={{ paddingTop: 140 }}><div className="container">
      <p className="eyebrow">Storia e cultura</p>
      <h1>Tremila anni di Sicilia</h1>
      <p className="prose" style={{ margin: 0 }}>Proteggere l’ambiente significa anche custodire la memoria dei popoli che lo hanno modellato. Scopri anche <Link href={`/${l}/natura`}>i luoghi naturali</Link>, <Link href={`/${l}/archeologia`}>l’archeologia di Pantelleria</Link> e <Link href={`/${l}/asino`}>l’asino pantesco</Link>.</p>
      <h2 style={{ marginTop: 50 }}>Le grandi epoche</h2>
      <div className="grid">{ERE.map(([t, x], n) => <div key={t} className="card"><span className="eyebrow">{n + 1}</span><h3 style={{ margin: '6px 0' }}>{t}</h3><p>{x}</p></div>)}</div>
      <h2 style={{ marginTop: 50 }}>La lingua siciliana</h2>
      <p className="prose" style={{ margin: 0 }}>{LINGUA}</p>
      <h2 style={{ marginTop: 50 }}>Tradizioni da custodire</h2>
      <div className="grid">{TRADIZIONI.map(([t, x]) => <div key={t} className="card"><h3 style={{ marginTop: 0 }}>{t}</h3><p>{x}</p></div>)}</div>
      <h2 style={{ marginTop: 50 }}>Le province</h2>
      <p className="choices">{PROVS.map(p => <Link key={p.slug} className="choice" href={`/${l}#prov-${p.slug}`}>{p.name}</Link>)}</p>
      <CtaButtons lang={l} />
    </div></section>
  );
}
