import Link from 'next/link';
import { Lang } from '@/lib/i18n';

export default function CtaButtons({ lang, dark }: { lang: string; dark?: boolean }) {
  const h = (x: string) => `/${lang}${x}`;
  return (
    <div className="cta-stack" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, margin: '44px auto', maxWidth: 380 }}>
      <Link className="btn green" style={{ width: '100%', textAlign: 'center' }} href={h('/sostieni')}>Fai una donazione</Link>
      <Link className="btn" style={{ width: '100%', textAlign: 'center', background: dark ? '#fff' : 'var(--sea)', color: dark ? 'var(--lava)' : '#fff' }} href={h('/sostieni')}>Partecipa alle nostre azioni</Link>
      <Link className="btn" style={{ width: '100%', textAlign: 'center', background: 'var(--ochre)', color: '#fff' }} href={h('/eventi')}>Unisciti ai nostri eventi</Link>
    </div>
  );
}
