import { PROVS } from '@/lib/province';
import { ANIMALI } from '@/lib/animali';
export type Item = { href: string; label: string };
export type Group = { label: string; href: string; items: Item[] };
export const NAV: Group[] = [
  { label: 'Associazione', href: '/associazione', items: [
    { href: '/associazione', label: 'Chi siamo' }, { href: '/regioni', label: 'I nostri responsabili' },
    { href: '/eventi', label: 'Eventi 2027-2028' },
    { href: '/sostieni', label: 'Diventa socio' }, { href: '/contatti', label: 'Contatti' } ] },
  { label: 'Sicilia', href: '/sicilia', items: [
    { href: '/sicilia', label: 'Storia e cultura' },
    ...PROVS.map(p => ({ href: `/#prov-${p.slug}`, label: p.name })) ] },
  { label: 'Pantelleria', href: '/asino', items: [
    { href: '/asino', label: 'L’asino di Pantelleria' }, { href: '/luoghi/lago-di-venere', label: 'Lago di Venere' },
    { href: '/luoghi/arco-dell-elefante', label: 'Arco dell’Elefante' }, { href: '/luoghi/coste-di-pantelleria', label: 'Le coste' },
    { href: '/archeologia', label: 'Archeologia' }, { href: '/convegno', label: 'Convegno 2000' } ] },
  { label: 'Natura', href: '/natura', items: [
    { href: '/natura', label: 'Luoghi naturali della Sicilia' }, { href: '/parchi', label: 'Parchi della Sicilia' }, { href: '/animali', label: 'Tutti gli animali' },
    ...ANIMALI.filter(a => ['lupo-appenninico', 'orso-bruno-marsicano', 'stambecco', 'aquila-di-bonelli', 'caretta-caretta', 'foca-monaca', 'fenicottero-rosa', 'gatto-selvatico'].includes(a.slug)).map(a => ({ href: `/animali/${a.slug}`, label: a.name })) ] },
];
