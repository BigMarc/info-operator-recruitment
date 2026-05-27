import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';

// Routes that bypass the i18n middleware entirely.
// Quiz funnels and the AGB legal page stay in their existing flat-route form.
const BYPASS_PATHS = ['/v1', '/v2', '/v3', '/quiz', '/agb'];

function detectLocale(req: NextRequest): Locale {
  const host = req.headers.get('host') || '';

  if (host.endsWith('buildforthem.de')) return 'de';
  if (host.endsWith('buildforthem.com')) return 'en';

  const firstSegment = req.nextUrl.pathname.split('/')[1];
  if (isValidLocale(firstSegment)) return firstSegment;

  return defaultLocale;
}

function pathHasLocalePrefix(pathname: string): boolean {
  const first = pathname.split('/')[1];
  return locales.includes(first as Locale);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (BYPASS_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const locale = detectLocale(req);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-locale', locale);

  if (pathHasLocalePrefix(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
