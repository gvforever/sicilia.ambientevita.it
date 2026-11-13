import { sql } from '@/lib/db';
import { ensureTables } from '@/lib/schema';
import { send } from '@/lib/mailer';

export const SITE = process.env.SITE_URL || 'https://sicilia.ambientevita.it';
export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as any)[c]);

// Modèle d'e-mail : bandeau dégradé vert, gros chiffre facultatif, contenu
export function shell(inner: string, big?: { value: string; label?: string }) {
  return `<!doctype html><html><body style="margin:0;background:#f3efe6;padding:24px 12px">
  <div style="max-width:580px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e6dfd0">
    <div style="background:linear-gradient(135deg,#1e3a29,#4e6b3a 45%,#0e4a5a);color:#ffffff;padding:34px 28px;text-align:center">
      <img src="https://www.ambientevita.it/images/Logo_Ambiente_e_Vita.webp" width="56" height="56" alt="" style="border-radius:50%;background:#fff;padding:5px">
      <div style="font-family:Georgia,serif;font-size:30px;margin-top:10px">AmbienteVita</div>
      <div style="font-family:Arial,sans-serif;letter-spacing:6px;font-size:11px">SICILIA</div>
      ${big ? `<div style="font-family:Georgia,serif;font-size:64px;line-height:1;margin-top:22px">${esc(big.value)}</div>${big.label ? `<div style="font-family:Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:.85;margin-top:6px">${esc(big.label)}</div>` : ''}` : ''}
    </div>
    <div style="padding:28px;font-family:Arial,sans-serif;color:#23221f;font-size:15px;line-height:1.65">${inner}</div>
    <div style="padding:16px 28px;background:#faf8f3;font-family:Arial,sans-serif;font-size:12px;color:#6b675e;text-align:center">AmbienteVita Sicilia · Pantelleria (TP) · <a href="${SITE}" style="color:#0e4a5a">sicilia.ambientevita.it</a></div>
  </div></body></html>`;
}
export const button = (href: string, label: string) => `<p style="text-align:center;margin:26px 0"><a href="${href}" style="background:#4e6b3a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:bold;display:inline-block">${esc(label)}</a></p>`;

function romeParts(d: Date = new Date()) {
  const [y, m, day] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d).split('-').map(Number);
  return { y, m, d: day };
}

/* ---------- Anniversaires ---------- */
const BDAY: Record<string, { subject: string; hi: string; body: string; sign: string; big: string }> = {
  it: { subject: 'Buon compleanno da AmbienteVita Sicilia! 🎂', hi: 'Ciao', body: 'tutta l’associazione AmbienteVita Sicilia ti augura un felicissimo compleanno. Grazie di cuore per il tuo sostegno a Pantelleria e alla Sicilia.', sign: 'Con affetto, AmbienteVita Sicilia', big: 'Auguri!' },
  fr: { subject: 'Joyeux anniversaire de la part d’AmbienteVita Sicilia ! 🎂', hi: 'Bonjour', body: 'toute l’association AmbienteVita Sicilia vous souhaite un très joyeux anniversaire. Merci de tout cœur pour votre soutien à Pantelleria et à la Sicile.', sign: 'Avec toute notre amitié, AmbienteVita Sicilia', big: 'Joyeux anniversaire' },
  en: { subject: 'Happy birthday from AmbienteVita Sicilia! 🎂', hi: 'Hello', body: 'everyone at AmbienteVita Sicilia wishes you a very happy birthday. Thank you so much for supporting Pantelleria and Sicily.', sign: 'With warm wishes, AmbienteVita Sicilia', big: 'Happy birthday' },
  de: { subject: 'Alles Gute zum Geburtstag von AmbienteVita Sicilia! 🎂', hi: 'Hallo', body: 'der ganze Verein AmbienteVita Sicilia wünscht Ihnen alles Gute zum Geburtstag. Herzlichen Dank für Ihre Unterstützung für Pantelleria und Sizilien.', sign: 'Herzliche Grüße, AmbienteVita Sicilia', big: 'Alles Gute' },
};

export async function runBirthdays() {
  await ensureTables();
  const { y, m, d } = romeParts();
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const feb28 = m === 2 && d === 28 && !leap;
  const rows = await sql`SELECT DISTINCT ON (lower(email)) id, email, first_name, lang FROM subscriptions
    WHERE birthday_ok AND birth_date IS NOT NULL
      AND (last_birthday_mail IS NULL OR last_birthday_mail < ${y})
      AND ((EXTRACT(MONTH FROM birth_date) = ${m} AND EXTRACT(DAY FROM birth_date) = ${d})
        OR (${feb28}::boolean AND EXTRACT(MONTH FROM birth_date) = 2 AND EXTRACT(DAY FROM birth_date) = 29))
    ORDER BY lower(email), created_at DESC`;
  let sent = 0;
  for (const r of rows as any[]) {
    const t = BDAY[r.lang] || BDAY.it;
    try {
      await send({ to: r.email, subject: t.subject, html: shell(`<p>${t.hi} ${esc(r.first_name)},</p><p>${t.body}</p><p>${t.sign}</p>`, { value: '🎂', label: t.big }) });
      await sql`UPDATE subscriptions SET last_birthday_mail = ${y} WHERE lower(email) = lower(${r.email})`;
      sent++;
    } catch (e) { console.error('birthday mail error', r.email, e); }
  }
  return { found: rows.length, sent };
}

/* ---------- Renouvellement de l'adhésion ---------- */
const RENEW: Record<string, { left: Record<number, string>; label: string; subject: (n: string) => string; hi: string; thanks: string; ask: (n: string) => string; cta: string; sign: string }> = {
  it: { left: { 60: '60 giorni', 30: '1 mese', 15: '15 giorni' }, label: 'al rinnovo della tua adesione', subject: n => `Ancora ${n} alla scadenza della tua adesione ad AmbienteVita Sicilia`, hi: 'Ciao', thanks: 'grazie per l’anno trascorso insieme! Il tuo sostegno ha dato vita ai progetti dell’associazione a Pantelleria e in tutta la Sicilia.', ask: n => `La tua adesione scade tra ${n}. Se lo desideri, puoi rinnovarla in un minuto: saremmo davvero felici di continuare questo cammino con te.`, cta: 'Rinnovo la mia adesione', sign: 'Grazie in anticipo per la tua fiducia, proteggiamo insieme l’ambiente.' },
  fr: { left: { 60: '60 jours', 30: '1 mois', 15: '15 jours' }, label: 'avant le renouvellement de votre adhésion', subject: n => `Plus que ${n} avant l’échéance de votre adhésion à AmbienteVita Sicilia`, hi: 'Bonjour', thanks: 'merci pour cette année passée ensemble ! Votre soutien a fait vivre les projets de l’association à Pantelleria et dans toute la Sicile.', ask: n => `Votre adhésion arrive à échéance dans ${n}. Si vous le souhaitez, vous pouvez la renouveler en une minute : nous serions vraiment heureux de poursuivre ce chemin avec vous.`, cta: 'Je renouvelle mon adhésion', sign: 'Merci d’avance pour votre confiance, protégeons ensemble l’environnement.' },
  en: { left: { 60: '60 days', 30: '1 month', 15: '15 days' }, label: 'until your membership renewal', subject: n => `${n} left before your AmbienteVita Sicilia membership expires`, hi: 'Hello', thanks: 'thank you for the year we have spent together! Your support has brought the association’s projects to life in Pantelleria and across Sicily.', ask: n => `Your membership expires in ${n}. If you wish, you can renew it in a minute: we would be truly happy to continue this journey with you.`, cta: 'Renew my membership', sign: 'Thank you in advance for your trust, let’s protect the environment together.' },
  de: { left: { 60: '60 Tage', 30: '1 Monat', 15: '15 Tage' }, label: 'bis zur Verlängerung Ihrer Mitgliedschaft', subject: n => `Noch ${n} bis zum Ablauf Ihrer Mitgliedschaft bei AmbienteVita Sicilia`, hi: 'Hallo', thanks: 'danke für das gemeinsame Jahr! Ihre Unterstützung hat die Projekte des Vereins auf Pantelleria und in ganz Sizilien lebendig gemacht.', ask: n => `Ihre Mitgliedschaft läuft in ${n} ab. Wenn Sie möchten, können Sie sie in einer Minute verlängern: Wir würden uns sehr freuen, diesen Weg mit Ihnen fortzusetzen.`, cta: 'Mitgliedschaft verlängern', sign: 'Vielen Dank im Voraus für Ihr Vertrauen – schützen wir gemeinsam die Umwelt.' },
};

export async function runRenewals() {
  await ensureTables();
  const now = romeParts();
  const today = Date.UTC(now.y, now.m - 1, now.d);
  // dernière adhésion payée de chaque personne
  const rows = await sql`SELECT DISTINCT ON (lower(email)) id, email, first_name, lang, created_at, renewal_mails
    FROM subscriptions WHERE membership_amount > 0 AND payment_status = 'paid'
    ORDER BY lower(email), created_at DESC`;
  let sent = 0;
  for (const r of rows as any[]) {
    const c = romeParts(new Date(r.created_at));
    const anniv = Date.UTC(c.y + 1, c.m - 1, c.d); // échéance : un an après l'adhésion
    const days = Math.round((anniv - today) / 86400000);
    if (![60, 30, 15].includes(days)) continue;
    const key = `${c.y + 1}-${days}`;
    if ((r.renewal_mails || '').split(',').includes(key)) continue;
    const t = RENEW[r.lang] || RENEW.it;
    const n = t.left[days];
    const lang = ['it', 'fr', 'en', 'de'].includes(r.lang) ? r.lang : 'it';
    const inner = `<p>${t.hi} ${esc(r.first_name)},</p><p>${t.thanks}</p><p>${t.ask(n)}</p>${button(`${SITE}/${lang}/sostieni`, t.cta)}<p style="font-style:italic;color:#4e6b3a">${t.sign}</p>`;
    try {
      await send({ to: r.email, subject: t.subject(n), html: shell(inner, { value: n, label: t.label }) });
      await sql`UPDATE subscriptions SET renewal_mails = concat_ws(',', NULLIF(renewal_mails, ''), ${key}::text) WHERE id = ${r.id}`;
      sent++;
    } catch (e) { console.error('renewal mail error', r.email, e); }
  }
  return { checked: rows.length, sent };
}
