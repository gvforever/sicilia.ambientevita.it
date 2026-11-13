'use client';
import { useEffect, useRef, useState } from 'react';
import './slider.css';

export default function HeroSlideshow({ images, children, small }: { images: string[]; children: React.ReactNode; small?: boolean }) {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const n = images.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => setI(v => (v + 1) % n), 6500);
    return () => clearInterval(id);
  }, [n, i]);

  const down = (e: React.PointerEvent) => { start.current = e.clientX; };
  const move = (e: React.PointerEvent) => { if (start.current !== null) setDrag(e.clientX - start.current); };
  const up = () => {
    if (start.current === null) return;
    if (drag < -50) go(i + 1); else if (drag > 50) go(i - 1);
    start.current = null; setDrag(0);
  };

  return (
    <div className={`hs ${small ? 'hs-small' : ''}`}>
      <div className="hs-viewport" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}>
        <div className="hs-track" style={{ transform: `translateX(calc(${-i * 100}% + ${drag}px))`, transition: start.current === null ? undefined : 'none' }}>
          {images.map(src => <div key={src} className="hs-slide" style={{ backgroundImage: `url("${src}")` }} />)}
        </div>
      </div>
      <div className="hs-shade" />
      <div className="container hs-inner">{children}</div>
      {n > 1 && <>
        <button className="hs-arrow hs-prev" onClick={() => go(i - 1)} aria-label="Precedente">‹</button>
        <button className="hs-arrow hs-next" onClick={() => go(i + 1)} aria-label="Successiva">›</button>
        <div className="hs-bars">{images.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`${k + 1}`} />)}</div>
      </>}
    </div>
  );
}
