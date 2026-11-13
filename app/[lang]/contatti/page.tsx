import { Lang } from '@/lib/i18n';
import { CONTACT_TXT } from '@/lib/legal';
import ContactForm from './ContactForm';

export default function Contatti({ params }: { params: { lang: Lang } }) {
  const c = CONTACT_TXT[params.lang];
  return (
    <section style={{ paddingTop: 150 }}><div className="container prose">
      <p className="eyebrow">AmbienteVita Sicilia</p>
      <h1>{c.title}</h1>
      <p>{c.lead}</p>
      <ContactForm lang={params.lang} />
    </div></section>
  );
}
