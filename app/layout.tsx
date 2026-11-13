import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--font-serif' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = { title: 'AmbienteVita Sicilia', description: "Ramo siciliano dell'associazione Ambiente e/è Vita ETS" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="it" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
