import { NextRequest, NextResponse } from 'next/server';
const LANGS = ['it', 'fr', 'en', 'de'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) return;
  if (LANGS.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const pref = (req.headers.get('accept-language') || 'it').slice(0, 2);
  const lang = LANGS.includes(pref) ? pref : 'it';
  return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
}
