import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Lang, LANGS } from '@/lib/i18n';
import { EVENTS } from '@/lib/events';
import { findEvent } from '@/lib/eventPricing';
import { IMG } from '@/lib/images';
import HeroSlideshow from '@/components/HeroSlideshow';
import EventBooking from './EventBooking';

const LOCALE = { it: 'it-IT', fr: 'fr-FR', en: 'en-GB', de: 'de-DE' };

export function generateStaticParams() {
  return LANGS.flatMap(lang => EVENTS.map(e => ({ lang, id: e.id })));
}

export function generateMetadata({ params }: { params: { lang: Lang; id: string } }): Metadata {
  const e = findEvent(params.id);
  if (!e) return {};
  return { title: `${e.title} — ${e.city}`, description: `${e.date} · ${e.venue}, ${e.city}` };
}

export default function Prenota({ params }: { params: { lang: Lang; id: string } }) {
  const e = findEvent(params.id);
  if (!e) notFound();
  const when = new Date(`${e.date}T${e.time}`).toLocaleDateString(LOCALE[params.lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const ld = { '@context': 'https://schema.org', '@type': 'Event', name: e.title, startDate: `${e.date}T${e.time}:00+01:00`, eventStatus: 'https://schema.org/EventScheduled', location: { '@type': 'Place', name: e.venue, address: { '@type': 'PostalAddress', addressLocality: e.city, addressCountry: 'IT' } }, organizer: { '@type': 'Organization', name: 'AmbienteVita Sicilia', url: 'https://sicilia.ambientevita.it' }, offers: { '@type': 'Offer', price: e.price, priceCurrency: 'EUR' } };
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <HeroSlideshow images={[e.vip ? IMG.elefante : IMG.venere]} small>
      <p className="eyebrow reveal">{when} · {e.time}</p>
      <h1 className="reveal">{e.title}</h1>
      <p className="reveal">{e.venue} — {e.city}</p>
    </HeroSlideshow>
    <section><div className="container prose">
      <EventBooking lang={params.lang} eventId={e.id} />
    </div></section>
  </>);
}
