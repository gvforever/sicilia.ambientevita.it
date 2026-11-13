import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_COOKIE = 'av_admin';
export const adminHash = () => crypto.createHash('sha256').update('av:' + (process.env.ADMIN_TOKEN || '')).digest('hex');
export const isAdmin = () => !!process.env.ADMIN_TOKEN && cookies().get(ADMIN_COOKIE)?.value === adminHash();
export function requireAdmin() { if (!isAdmin()) redirect('/admin/login'); }

// Dates : accepte un texte AAAA-MM-JJ ou un objet Date
export function iso(d: any): string {
  if (!d) return '';
  if (typeof d === 'string') return d.slice(0, 10);
  const x = new Date(d);
  return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
export function ageOf(d: any): number | null {
  const s = iso(d); if (!s) return null;
  const [y, m, day] = s.split('-').map(Number); const n = new Date();
  let a = n.getFullYear() - y;
  if (n.getMonth() + 1 < m || (n.getMonth() + 1 === m && n.getDate() < day)) a--;
  return a;
}
export function daysToBirthday(d: any): number | null {
  const s = iso(d); if (!s) return null;
  const [, m, day] = s.split('-').map(Number); const n = new Date();
  const today = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  const next = new Date(n.getFullYear(), m - 1, day);
  if (next < today) next.setFullYear(next.getFullYear() + 1);
  return Math.round((next.getTime() - today.getTime()) / 86400000);
}
export const fmt = (d: any) => d ? new Date(d).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
export const TYPE: Record<string, string> = { none: 'Don', ordinario: 'Membre', benemerito: 'Bienfaiteur', gold: 'Gold', socio: 'Déjà membre' };
