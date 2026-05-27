import type { Locale } from '@/dictionaries/types';

// Prepends the locale prefix to an internal path.
// Used by every component that renders an internal href.
//
// localized('/v4', 'de')       => '/de/v4'
// localized('v4', 'de')        => '/de/v4'
// localized('#kalender', 'de') => '#kalender'   (anchors pass through)
// localized('mailto:...', 'de')=> 'mailto:...'  (non-internal pass through)
// localized('http://...', 'de')=> 'http://...'  (absolute URLs pass through)
export function localized(path: string, locale: Locale): string {
  if (path.startsWith('#')) return path;
  if (path.startsWith('mailto:')) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}
