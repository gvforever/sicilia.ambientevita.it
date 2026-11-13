'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lang } from '@/lib/i18n';
import { LEGAL_NAV } from '@/lib/legal';

export default function CookieBar({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem('av-cookie')) setShow(true); }, []);
  if (!show) return null;
  const L = LEGAL_NAV[lang];
  return (
    <div className="cookie-bar">
      <span>{L.cookie} <Link href={`/${lang}/legal/privacy`}>{L.privacy}</Link></span>
      <button className="btn" onClick={() => { localStorage.setItem('av-cookie', '1'); setShow(false); }}>OK</button>
    </div>
  );
}
