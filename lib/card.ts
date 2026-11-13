import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { sql } from '@/lib/db';

export const siteUrl = () => process.env.SITE_URL || 'https://sicilia.ambientevita.it';
export const cardNumber = (s: any) => `AEV-SIC-${new Date(s.created_at).getFullYear()}-${String(s.id).padStart(5, '0')}`;
export const provEnd = (s: any) => new Date(new Date(s.created_at).getTime() + 7 * 86400000);
export const finalEnd = (s: any) => { const d = new Date(s.paid_at || Date.now()); d.setFullYear(d.getFullYear() + 1); return d; };
export const TYPE_IT: Record<string, string> = { ordinario: 'Socio ordinario', benemerito: 'Socio benemerito', gold: 'Socio Gold', socio: 'Socio' };

export async function ensureCardCols() {
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS payment_note TEXT`;
  await sql`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS card_sent_at TIMESTAMPTZ`;
}

export async function buildCardPdf(s: any, kind: 'prov' | 'final'): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([340, 215]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const green = rgb(0.31, 0.42, 0.23), sea = rgb(0.05, 0.29, 0.35), white = rgb(1, 1, 1);
  page.drawRectangle({ x: 0, y: 0, width: 340, height: 215, color: kind === 'final' ? sea : green });
  page.drawRectangle({ x: 0, y: 0, width: 340, height: 6, color: rgb(0.73, 0.52, 0.24) });
  const t = (x: string, X: number, Y: number, size = 10, f = font) => page.drawText(x, { x: X, y: Y, size, font: f, color: white });
  t('AmbienteVita Sicilia', 20, 180, 16, bold);
  t(kind === 'final' ? 'TESSERA DI SOCIO' : 'TESSERA PROVVISORIA', 20, 162, 9, bold);
  t(`${s.last_name} ${s.first_name}`.toUpperCase(), 20, 118, 15, bold);
  t(TYPE_IT[s.membership] || 'Socio', 20, 100, 11);
  t(`N. ${cardNumber(s)}`, 20, 70, 10, bold);
  const end = kind === 'final' ? finalEnd(s) : provEnd(s);
  t(`Valida fino al ${end.toLocaleDateString('it-IT')}`, 20, 54, 10);
  if (kind === 'prov') t('Valida solo se il bonifico arriva entro 7 giorni', 20, 22, 8);
  else t('Il Presidente regionale — Giuseppe Sechi', 20, 22, 8);
  return pdf.save();
}
