import { EVENTS, Ev } from '@/lib/events';

export type Formula = { key: string; label: string; price: number; quota: number };

export function formulas(e: Ev): Formula[] {
  if (e.vip) return [
    { key: 'silver', label: 'Silver', price: e.vip.silver, quota: 100 },
    { key: 'gold', label: 'Gold', price: e.vip.gold, quota: 200 },
  ];
  return [{ key: 'standard', label: 'Standard', price: e.price, quota: e.quota }];
}

export const findEvent = (id: string) => EVENTS.find(e => e.id === id);

export function quote(e: Ev, formulaKey: string, participants: number, alreadyMember: boolean, donation: number) {
  const list = formulas(e);
  const f = list.find(x => x.key === formulaKey) || list[0];
  const n = Math.max(1, Math.min(10, Math.round(participants) || 1));
  const discount = alreadyMember && !e.vip ? f.quota : 0; // un socio non ripaga la quota di 10 €
  const membership = f.quota * n - discount;
  const event = (f.price - f.quota) * n;
  const don = Math.max(0, Math.min(100000, Math.round(donation) || 0));
  const type = e.vip ? (f.key === 'gold' ? 'gold' : 'benemerito') : alreadyMember && n === 1 ? 'socio' : 'ordinario';
  return { f, n, membership, event, donation: don, total: membership + event + don, type };
}
