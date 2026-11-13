import Link from 'next/link';
import CtaButtons from '@/components/CtaButtons';

export const metadata = { title: 'I nostri responsabili — AmbienteVita', description: 'La direzione nazionale e i responsabili regionali di Ambiente e Vita.' };

type P = { name: string; role: string; region?: string; city?: string; photo?: string; url?: string };
const NAZIONALE: P[] = [
  { name: 'Avv. Benigno D’Orazio', role: 'Presidente nazionale', city: 'Abruzzo' },
  { name: 'Fernando Ferrara', role: 'Segretario nazionale' },
  { name: 'Sonia Giglietti', role: 'Vicesegretaria nazionale' },
  { name: 'Ing. Caterina Melonio', role: 'Direzione nazionale' },
];
const REGIONALI: P[] = [
  { name: 'Giuseppe Sechi', role: 'Presidente regionale', region: 'Sicilia', city: 'Pantelleria (TP)' },
  { name: 'Annunziato Di Stefano', role: 'Presidente regionale', region: 'Calabria', city: 'Reggio Calabria' },
  { name: 'Dr. Patrizio Schiazza', role: 'Segretario regionale', region: 'Abruzzo' },
  { name: 'Dr. Primiano Schiavone', role: 'Segretario regionale', region: 'Puglia' },
  { name: 'Dr. Roberto Pastura', role: 'Segretario regionale', region: 'Umbria' },
  { name: 'Dr. Giuseppe Caredda', role: 'Segretario regionale', region: 'Sardegna', city: 'Cagliari', url: 'https://www.ambientevita-sardegna.it' },
  { name: 'Dr. Manlio Molinari', role: 'Responsabile', region: 'Emilia-Romagna' },
  { name: 'Oreste Sanalitro', role: 'Sezione comunale', region: 'Lazio', city: 'Terracina' },
];

const ini = (n: string) => n.replace(/^(Avv|Dr|Ing)\.\s*/, '').split(' ').map(w => w[0]).slice(0, 2).join('');

function Card({ p, big }: { p: P; big?: boolean }) {
  const s = big ? 120 : 84;
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      {p.photo
        ? <img src={p.photo} alt={p.name} style={{ width: s, height: s, borderRadius: '50%', objectFit: 'cover' }} />
        : <div aria-hidden style={{ width: s, height: s, borderRadius: '50%', margin: '0 auto', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, var(--caper), var(--sea))', color: '#fff', fontFamily: 'var(--serif)', fontSize: s / 2.6 }}>{ini(p.name)}</div>}
      <h3 style={{ margin: '14px 0 4px' }}>{p.name}</h3>
      <p style={{ margin: 0, color: 'var(--ochre)', fontWeight: 600 }}>{p.role}{p.region ? ` — ${p.region}` : ''}</p>
      {p.city && <p style={{ margin: '4px 0 0', color: 'var(--muted)' }}>{p.city}</p>}
      {p.url && <p style={{ margin: '6px 0 0' }}><a href={p.url} target="_blank" rel="noopener">Sito regionale →</a></p>}
    </div>
  );
}

export default function Regioni({ params }: { params: { lang: string } }) {
  const l = params.lang;
  return (
    <section style={{ paddingTop: 140 }}><div className="container">
      <p className="eyebrow">La nostra squadra</p>
      <h1>I responsabili di Ambiente e Vita</h1>
      <p className="prose" style={{ margin: 0 }}>Nata nel 1995, Ambiente e Vita è un’associazione di protezione ambientale riconosciuta dal Ministero dell’Ambiente ai sensi dell’art. 13 della legge 349/1986, presente in tutta Italia. Maggiori informazioni sul <a href="https://www.ambientevita.it" target="_blank" rel="noopener">sito nazionale</a>.</p>
      <h2 style={{ marginTop: 50 }}>Direzione nazionale</h2>
      <div className="grid">{NAZIONALE.map((p, n) => <Card key={p.name} p={p} big={n === 0} />)}</div>
      <h2 style={{ marginTop: 50 }}>Responsabili regionali</h2>
      <div className="grid">{REGIONALI.map(p => <Card key={p.name} p={p} />)}</div>
      <p className="credit">Le altre regioni saranno aggiunte presto. I contatti dei responsabili sono disponibili su richiesta: <Link href={`/${l}/contatti`}>scrivici</Link>.</p>
      <CtaButtons lang={l} />
    </div></section>
  );
}
