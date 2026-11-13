import ContentPage from '@/components/ContentPage';
import { Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';
export const generateMetadata = ({ params }: { params: { lang: Lang } }) => pageMeta('asino', params.lang);
export default function Page({ params }: { params: { lang: Lang } }) { return <ContentPage slug="asino" lang={params.lang} />; }
