'use client';
import { useState } from 'react';
import { Lang } from '@/lib/i18n';
import { CONTACT_TXT } from '@/lib/legal';

export default function ContactForm({ lang }: { lang: Lang }) {
  const c = CONTACT_TXT[lang];
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get('privacy')) { setState('error'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, ...Object.fromEntries(f as any) }),
      setState(res.ok ? 'ok' : 'error');
    } catch { setState('error'); }
  }

  if (state === 'ok') return <div className="card"><h3>{c.thanks}</h3></div>;
  return (
    <form onSubmit={submit}>
      <div className="row">
        <input name="firstName" placeholder={`${c.firstName} *`} required />
        <input name="lastName" placeholder={`${c.lastName} *`} required />
        <input name="email" type="email" placeholder={`${c.email} *`} required />
        <input name="phone" placeholder={c.phone} />
      </div>
      <p><input name="subject" placeholder={c.subject} /></p>
      <p><textarea name="message" rows={7} placeholder={`${c.message} *`} required style={{ width: '100%', padding: '13px 15px', border: '1px solid #d9d1bf', borderRadius: 12, font: 'inherit' }} /></p>
      <input name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999 }} aria-hidden="true" />
      <p><label><input type="checkbox" name="privacy" style={{ width: 'auto' }} /> {c.privacy} *</label></p>
      {state === 'error' && <p style={{ color: '#b71c1c' }}>{c.error}</p>}
      <button className="btn green" disabled={state === 'sending'}>{state === 'sending' ? '…' : c.send}</button>
    </form>
  );
}
