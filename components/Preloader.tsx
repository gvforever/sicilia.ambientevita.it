'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [phase, setPhase] = useState<'show' | 'out' | 'gone'>('show');
  useEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try { seen = !!sessionStorage.getItem('av-pre'); sessionStorage.setItem('av-pre', '1'); } catch {}
    if (seen) { root.classList.add('pre-seen'); setPhase('gone'); return; }
    root.classList.add('pre-lock');
    const a = setTimeout(() => setPhase('out'), 1400);
    const b = setTimeout(() => { setPhase('gone'); root.classList.remove('pre-lock'); root.classList.add('pre-seen'); }, 2300);
    return () => { clearTimeout(a); clearTimeout(b); root.classList.remove('pre-lock'); };
  }, []);
  if (phase === 'gone') return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('av-pre'))document.documentElement.classList.add('pre-seen')}catch(e){}" }} />
      <div className={`preloader ${phase === 'out' ? 'out' : ''}`} aria-hidden="true">
        <div className="pre-inner">
          <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" alt="" />
          <div className="pre-title">AmbienteVita</div>
          <div className="pre-sub">Sicilia</div>
          <span className="pre-line" />
        </div>
      </div>
    </>
  );
}
