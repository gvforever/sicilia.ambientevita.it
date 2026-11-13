import { Lang, t } from '@/lib/i18n';
import DonationForm from './DonationForm';

export default function Sostieni({ params }: { params: { lang: Lang } }) {
  return (
    <section><div className="container prose">
      <h1>{t(params.lang).form.title}</h1>
      <DonationForm lang={params.lang} />
    </div></section>
  );
}
