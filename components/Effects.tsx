'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Effects() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    document.querySelectorAll('.reveal, .map').forEach(el => io.observe(el));
    const photos = Array.from(document.querySelectorAll<HTMLElement>('.photo img'));
    const onScroll = () => {
      const y = window.scrollY, last = Number(root.dataset.ly || 0);
      if (Math.abs(y - last) > 6) { root.dataset.hide = y > 140 && y > last ? '1' : '0'; root.dataset.ly = String(y); }
      photos.forEach(img => {
        const r = img.parentElement!.getBoundingClientRect();
        img.style.setProperty('--py', `${((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * -40}px`);
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); };
  }, [path]);
  return null;
}
