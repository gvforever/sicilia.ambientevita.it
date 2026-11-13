import ContentPage from '@/components/ContentPage';
import { Lang } from '@/lib/i18n';
export default function Page({ params }: { params: { lang: Lang } }) { return <ContentPage slug="archeologia" lang={params.lang} />; }
