'use client';
import { useEffect, useState } from 'react';

export default function HeroSlideshow({ images, children, small }: { images: string[]; children: React.ReactNode; small?: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setI(n => (n + 1) % images.length), 7000);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <div className={`hero ${small ? 'page-hero' : ''}`}>
      {images.map((src, n) => <div key={src} className={`slide ${n === i ? 'on' : ''}`} style={{ backgroundImage: `url("${src}")` }} />)}
      <div className="container inner">{children}</div>
      {!small && <span className="scroll-hint" />}
      {images.length > 1 && <div className="dots">{images.map((_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`${n + 1}`} />)}</div>}
    </div>
  );
}
