import crypto from 'crypto';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const signId = (id: number) =>
  crypto.createHmac('sha256', process.env.ADMIN_TOKEN || 'dev').update(String(id)).digest('hex').slice(0, 24);

export const receiptNumber = (id: number, date: Date) =>
  `AEV-SIC-${date.getFullYear()}-${String(id).padStart(5, '0')}`;

export async function buildReceiptPdf(s: any): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const green = rgb(0.18, 0.49, 0.2);
  let y = 780;
  const line = (txt: string, f = font, size = 11, color = rgb(0.1, 0.1, 0.1)) => { page.drawText(txt, { x: 50, y, size, font: f, color }); y -= size + 8; };

  page.drawRectangle({ x: 0, y: 800, width: 595, height: 42, color: green });
  page.drawText('AmbienteVita Sicilia', { x: 50, y: 815, size: 16, font: bold, color: rgb(1, 1, 1) });

  line('RICEVUTA DI EROGAZIONE LIBERALE', bold, 15, green);
  line(`N. ${s.receipt_number}   —   Data: ${new Date(s.created_at).toLocaleDateString('it-IT')}`);
  y -= 10;
  line('Ente ricevente', bold);
  line('Associazione Siciliana di AmbienteVita');
  line('Ramo regionale di AmbienteVita ETS — C.F. 97119940589');
  line('Pantelleria (TP) — sicilia.ambientevita.it');
  y -= 10;
  line('Donatore', bold);
  line(`${s.first_name} ${s.last_name}`);
  if (s.tax_code) line(`Codice fiscale: ${s.tax_code}`);
  if (s.address) line(s.address);
  line(s.email);
  y -= 10;
  line('Dettaglio', bold);
  if (s.membership_amount) line(`Quota associativa (${s.membership}): ${s.membership_amount},00 EUR`);
  if (s.donation_amount) line(`Erogazione liberale: ${s.donation_amount},00 EUR`);
  line(`Totale: ${s.total_amount},00 EUR`, bold, 13);
  line('Modalità di pagamento: bonifico bancario');
  y -= 14;
  const legal = [
    'Erogazione liberale effettuata a favore di Ente del Terzo Settore, detraibile o deducibile',
    'ai sensi dell’art. 83 del D.Lgs. 117/2017 nei limiti di legge. Le quote associative non',
    'sono di norma detraibili. Ricevuta valida solo a ricezione del bonifico.',
  ];
  legal.forEach(l => line(l, font, 9, rgb(0.35, 0.35, 0.35)));
  y -= 30;
  line('Il Presidente regionale — Giuseppe Sechi', font, 11);
  return pdf.save();
}
