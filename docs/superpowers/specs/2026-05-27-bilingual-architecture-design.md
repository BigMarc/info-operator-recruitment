# Bilingual Architecture — BuildForThem (DE + EN)

**Date:** 2026-05-27
**Author:** Marc Schultheiss (with Claude)
**Status:** Approved design — ready for implementation plan
**Scope:** Convert the BuildForThem site from German-only into a bilingual site served on two domains: `buildforthem.de` (German) and `buildforthem.com` (English). Touches the homepage, `/v4`, `/v4/success`, and legal pages.

---

## 1. Goal

Serve a coherent German experience on `buildforthem.de` and a coherent English experience on `buildforthem.com` from the same Next.js codebase, with shared component design and per-locale content. Users on either domain can switch languages via a header toggle (which hops domains). SEO is handled via `hreflang` so each locale ranks on its own domain.

**Out of scope:** translating the experimental quiz funnels (`/v1`, `/v2`, `/v3`, `/quiz`). They stay English-only — they target a different audience and a different testing program.

---

## 2. Inputs and constraints

### 2.1 Confirmed decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Scope | Homepage + `/v4` + `/v4/success` + legal (privacy/terms/disclosure) |
| Quizzes (`/v1`, `/v2`, `/v3`, `/quiz`) | Stay English-only — explicitly out of scope |
| English copy source | Draft fresh from the German source, preserving Propaganda-Playbook framing and "Growth Partner Methode" as the vehicle name |
| Architecture | Hybrid — shared components + per-locale dictionaries + `[locale]` route segment + middleware |
| Language switcher | Yes — small DE/EN toggle in header |
| URL slugs | Same in both languages (e.g., `/v4/success` not localized to `/v4/erfolg`). YAGNI for localized slugs. |
| Domain routing | `.de` → German, `.com` → English. Strict by domain (no Accept-Language detection). |

### 2.2 Locked technical context

- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS (no token changes)
- Framer Motion 11
- Vercel hosting (single project, two domains pointing at it)
- No new runtime dependencies — implementation uses Next.js built-in `middleware.ts` and dynamic route segments
- No DB, no API — purely static + middleware

### 2.3 Brand CI (unchanged from homepage redesign)

Black `#000000` + accent gold `#FFB200` + Inter font. Already configured in `tailwind.config.ts`.

---

## 3. Architecture

### 3.1 Directory structure

**Before** (post-homepage-redesign):

```
app/
  layout.tsx                    # html lang="de" hardcoded
  page.tsx                      # German homepage
  v4/page.tsx                   # English /v4
  v4/success/page.tsx           # German thank-you
  privacy/page.tsx
  terms/page.tsx
  disclosure/page.tsx
  v1/, v2/, v3/, quiz/          # English (OUT OF SCOPE)
  globals.css
components/                     # All German hardcoded copy
```

**After:**

```
app/
  layout.tsx                    # Root layout (no html/lang — moved into [locale])
  [locale]/
    layout.tsx                  # Sets <html lang>, hreflang, locale-aware <Metadata>
    page.tsx                    # Homepage — loads dict, threads to components
    v4/page.tsx                 # Free training page (rewritten for both locales)
    v4/success/page.tsx         # Thank-you page
    privacy/page.tsx
    terms/page.tsx
    disclosure/page.tsx
    not-found.tsx               # Locale-aware 404
  v1/, v2/, v3/, quiz/          # UNCHANGED (out of scope)
  globals.css
middleware.ts                   # NEW — domain/path → locale routing
dictionaries/
  types.ts                      # `Dictionary` interface (single source of truth)
  de.ts                         # German strings
  en.ts                         # English strings
  index.ts                      # `getDictionary(locale)` + locale constants
components/                     # Each section now accepts a `dict` prop
public/, ...                    # Unchanged
```

### 3.2 Routing

**Internal URL shape:** `/{locale}/{path}` where `locale ∈ {de, en}`. The `[locale]` dynamic segment captures the locale.

**Production public URLs (post-middleware):**
- `buildforthem.de/v4/success` — middleware rewrites internally to `/de/v4/success`
- `buildforthem.com/v4/success` — middleware rewrites internally to `/en/v4/success`
- The user-visible URL never shows `/de` or `/en` on production domains

**Dev URLs:** `localhost:3000/de/v4/success` or `localhost:3000/en/v4/success` (locale visible — easier for local testing)

**Same slugs in both locales.** This is a deliberate simplification. Localized slugs (`/datenschutz` vs `/privacy`) would require per-route slug maps and more complex middleware. Marketing pages tolerate English-looking URLs in the German experience — the content language is what matters to users and to Google.

### 3.3 Middleware

`middleware.ts` runs before every page request:

```
1. Read req.headers.get('host')
2. Strip port for localhost comparison
3. Determine locale:
   - host endsWith 'buildforthem.de'  →  'de'
   - host endsWith 'buildforthem.com' →  'en'
   - host startsWith 'localhost' or '127.0.0.1':
       if URL pathname already starts with /de or /en → respect it
       else → default to 'de'
   - default → 'de'
4. If pathname doesn't start with /{locale}/ → rewrite URL to add it
   (NextResponse.rewrite, NOT redirect — keeps public URL clean)
5. Skip middleware for: /_next/*, /api/*, static assets, favicon, /v1, /v2, /v3, /quiz
```

The matcher config in `middleware.ts` explicitly excludes the quiz routes so they keep working as-is.

### 3.4 Dictionary system

**`dictionaries/types.ts`** — single source of truth for what content exists:

```ts
export type Locale = 'de' | 'en';

export interface NavDict {
  methode: string;
  stories: string;
  faq: string;
  cta: string;
  switchLanguageLabel: string; // "EN" when current is de, "DE" when current is en
}

export interface HeroDict {
  tag: string;
  headlineLine1: string;
  headlineAccent: string;    // "5.000–20.000 €"
  headlineLine3: string;
  sub: string;
  guaranteeBar: string;      // contains the price+90-day promise
  videoTitle: string;
  videoSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string; sub: string; highlight?: boolean }[];
}

export interface ProblemDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  sub: string;
  cards: { icon: string; title: string; body: string }[];  // exactly 3
}

// ... similarly for ReframeDict, MethodDict, TrainerDict, TestimonialsDict,
//     LadderDict, GuaranteeDict, FAQDict, CalendarDict, FooterDict,
//     V4Dict, SuccessDict, LegalDict, MetaDict

export interface Dictionary {
  meta: MetaDict;
  nav: NavDict;
  hero: HeroDict;
  problem: ProblemDict;
  reframe: ReframeDict;
  method: MethodDict;
  trainer: TrainerDict;
  testimonials: TestimonialsDict;
  ladder: LadderDict;
  guarantee: GuaranteeDict;
  faq: FAQDict;
  calendar: CalendarDict;
  footer: FooterDict;
  v4: V4Dict;
  success: SuccessDict;
  legal: LegalDict;
}
```

**`dictionaries/de.ts`** — current German strings extracted from the existing components, typed as `Dictionary`.

**`dictionaries/en.ts`** — English mirror, drafted as part of implementation. Same shape, same keys, English content. The TypeScript compiler enforces parity: if `de.ts` adds a key, `en.ts` must too (otherwise build fails).

**`dictionaries/index.ts`:**

```ts
import type { Dictionary, Locale } from './types';
import de from './de';
import en from './en';

export const locales: Locale[] = ['de', 'en'];
export const defaultLocale: Locale = 'de';
export type { Dictionary, Locale };

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isValidLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'de' ? 'en' : 'de';
}
```

### 3.5 Component refactor pattern

Every section component changes its signature from "no props, hardcoded copy" to "accepts a typed `dict` prop, content from prop".

**Example — `components/Hero.tsx`:**

Before:
```tsx
export default function Hero() {
  return <h1>Gehalt ist die langsame Spur.</h1>;
}
```

After:
```tsx
import type { HeroDict, Locale } from '@/dictionaries/types';

interface HeroProps {
  dict: HeroDict;
  locale: Locale;  // for locale-aware hrefs (e.g., to /v4)
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <h1>
      {dict.headlineLine1}
      {' '}
      <span className="...">{dict.headlineAccent}</span>
      <br />
      {dict.headlineLine3}
    </h1>
  );
}
```

Every component that contains an `href` for an internal link must accept `locale` so it can build `/v4` → `/${locale}/v4`. Wait — given middleware rewrites, plain `/v4` works for the user-facing URL on production. But in dev (path-prefix mode), plain `/v4` would 404. So we route via `locale`-aware helper:

```ts
// utils/route.ts
export function localized(path: string, locale: Locale): string {
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}
```

All internal links in components use `localized('/v4', locale)` → produces `/de/v4` in dev (works directly) and `/de/v4` in prod (middleware doesn't interfere with already-prefixed URLs).

### 3.6 Page composition

**`app/[locale]/layout.tsx`** — sets per-locale HTML/meta:

```tsx
import type { Metadata } from 'next';
import { getDictionary, isValidLocale, locales, type Locale } from '@/dictionaries';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
      locale: params.locale === 'de' ? 'de_DE' : 'en_US',
    },
    alternates: {
      languages: {
        'de': 'https://buildforthem.de',
        'en': 'https://buildforthem.com',
        'x-default': 'https://buildforthem.de',
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    // notFound() would be cleaner — explicit 404
    throw new Error(`Invalid locale: ${params.locale}`);
  }
  return (
    <html lang={params.locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

**`app/layout.tsx`** (root) becomes a pass-through — must exist for App Router but contains no html/body since those move to `[locale]/layout.tsx`. (Next.js 14 supports nested root layouts when there's a dynamic segment with `generateStaticParams`.)

Actually, App Router requires a single root `<html>`. The cleanest pattern: keep `app/layout.tsx` as the root with `<html>` + `<body>`, and use `[locale]/layout.tsx` for the `lang` attribute via a side-channel. But Next.js doesn't allow `lang` to be set from a nested layout. **Resolution:** put everything in `app/[locale]/layout.tsx` and delete `app/layout.tsx`. The middleware ensures every request resolves to a locale-prefixed path, so there's always a `[locale]` layout match. The root `app/layout.tsx` is not needed when every page lives under `[locale]`.

(Verify during implementation — if Next.js complains, fall back to setting `lang` client-side in a `useEffect` from a `<Html>` component, or use the `metadata` API's `metadataBase` for a more limited setup.)

**`app/[locale]/page.tsx`:**

```tsx
import { getDictionary, type Locale } from '@/dictionaries';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemAgitation from '@/components/ProblemAgitation';
// ... etc
import Footer from '@/components/Footer';

export default function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = getDictionary(locale);
  return (
    <main className="min-h-screen">
      <Header dict={dict.nav} locale={locale} />
      <Hero dict={dict.hero} locale={locale} />
      <ProblemAgitation dict={dict.problem} />
      <Reframe dict={dict.reframe} />
      <Method dict={dict.method} />
      <Trainer dict={dict.trainer} locale={locale} />
      <Testimonials dict={dict.testimonials} />
      <ValueLadder dict={dict.ladder} locale={locale} />
      <GuaranteeScarcity dict={dict.guarantee} />
      <FAQ dict={dict.faq} />
      <CalendarEmbed dict={dict.calendar} />
      <Footer dict={dict.footer} locale={locale} />
    </main>
  );
}
```

### 3.7 Language switcher (Header)

Header.tsx renders a small DE/EN toggle pill. It links directly to the *other* domain in production and to the path-prefixed URL in development:

```tsx
function languageSwitchHref(currentLocale: Locale): string {
  const other = otherLocale(currentLocale);
  if (typeof window === 'undefined') {
    // SSR: render production-safe URL by default
    return other === 'de' ? 'https://buildforthem.de' : 'https://buildforthem.com';
  }
  const hostname = window.location.hostname;
  if (hostname.endsWith('buildforthem.de') || hostname.endsWith('buildforthem.com')) {
    return other === 'de' ? 'https://buildforthem.de' : 'https://buildforthem.com';
  }
  // Dev fallback
  return `/${other}`;
}
```

The switcher always points to the *root* of the other domain (not the equivalent translated page). This is intentional — translating routes 1:1 is YAGNI and most users land on `/` anyway. Future improvement: route equivalence map.

UI: small uppercase pill next to the existing CTA in the header nav. Shows the *other* language (e.g., on `.de` it shows "EN", on `.com` it shows "DE").

### 3.8 What does NOT get translated

| Item | Reason |
|---|---|
| Google Calendar embed `src` | The calendar widget is a single Google appointment URL. Future improvement: separate calendars per locale or use `&hl=en` parameter. For now, identical embed on both locales. Both versions of the page note the call is in German (or English) in surrounding copy. |
| `info@tgn-media.com` | Same support inbox |
| `/marc-schultheiss.jpg` | Same photo |
| "BuildForThem" wordmark | Brand name |
| Scarcity counter (`7/10`, `14 Tagen`) | Manually maintained — copy these into both dict files; update both when reality changes |
| `tailwind.config.ts`, `globals.css` | Locale-agnostic |

### 3.9 Vercel and DNS

**Vercel project settings:**
1. Open the project in Vercel dashboard
2. Settings → Domains
3. Add `buildforthem.de` — Vercel shows DNS instructions
4. Add `buildforthem.com` — same
5. Vercel auto-provisions SSL certificates for both (Let's Encrypt)
6. No environment variables required

**DNS (at the domain registrar — e.g., GoDaddy, Cloudflare, Namecheap):**
- For each domain, either:
  - **Apex (`buildforthem.de`, `buildforthem.com`):** A record → `76.76.21.21` (Vercel anycast IP)
  - **www subdomain:** CNAME → `cname.vercel-dns.com`
- Vercel's domain-add UI displays the exact values to use; follow that
- Recommended: redirect `www.buildforthem.de` → `buildforthem.de` (configurable in Vercel domain settings)

**GitHub:** no changes. Same repo, same `main` branch. Vercel's existing auto-deploy continues to deploy to both domains from the same commits.

### 3.10 SEO

Per-locale meta tags from `generateMetadata` in `app/[locale]/layout.tsx` (see 3.6). Plus hreflang `<link rel="alternate">` tags so Google ranks each domain in its target language.

**`app/[locale]/sitemap.ts`** (optional but recommended) generates a sitemap listing every translated route on both domains.

### 3.11 `/v4` translation strategy

Current `/v4` is in English with heavy promotional copy that doesn't match the new homepage voice. The redesign:

1. **Restructure `/v4` to match homepage tone.** The video unlock and 4-step framework stay, but the headline, sub, and surrounding copy get rewritten to match the Propaganda-Playbook framing.
2. **Both DE and EN drafted fresh.** The English version isn't the "old `/v4`" — it's a new translation of the new German version. This gives both locales a coherent feel.
3. **Same inline-video-unlock behavior preserved.** No new email-capture form (that's a separate scope).
4. **`/v4/success`** already exists in German (just shipped). I draft the English mirror; both move into `[locale]/v4/success/`.

### 3.12 Legal pages (`/privacy`, `/terms`, `/disclosure`)

These pages already exist (English). Move them under `[locale]` and load text from a `legal` section in the dictionary. German equivalents:
- `/privacy` → `Datenschutzerklärung` (German title) / `Privacy Policy` (English title) — same URL slug
- `/terms` → `Allgemeine Geschäftsbedingungen (AGB)` / `Terms of Service`
- `/disclosure` → `Impressum` / `Disclosure`

The dict will hold full legal text per locale. I draft German legal text from the existing English; the user verifies with a lawyer before publishing. **Mark this as a manual user task in the implementation plan.**

---

## 4. Data flow

```
Request:
  buildforthem.de/v4/success
            │
            ▼
  ┌──────────────────────┐
  │  middleware.ts        │
  │  detects locale='de'  │
  │  rewrites to          │
  │  /de/v4/success       │
  │  (internal only)      │
  └──────────────────────┘
            │
            ▼
  Next.js routes to:
  app/[locale]/v4/success/page.tsx
            │
            ▼
  page.tsx calls getDictionary('de')
            │
            ▼
  dict.success passed to <SuccessPage>
            │
            ▼
  Renders German content
```

User sees: clean URL `buildforthem.de/v4/success`, fully German content, German meta, `<html lang="de">`, hreflang link to `buildforthem.com`.

---

## 5. Migration / file mapping

| Current file | New file | Action |
|---|---|---|
| `app/layout.tsx` | DELETE | Moved into `app/[locale]/layout.tsx` |
| `app/page.tsx` | `app/[locale]/page.tsx` | Move + refactor to load dict |
| `app/v4/page.tsx` | `app/[locale]/v4/page.tsx` | Move + refactor + rewrite copy |
| `app/v4/success/page.tsx` | `app/[locale]/v4/success/page.tsx` | Move + refactor |
| `app/privacy/page.tsx` | `app/[locale]/privacy/page.tsx` | Move + load legal dict |
| `app/terms/page.tsx` | `app/[locale]/terms/page.tsx` | Move + load legal dict |
| `app/disclosure/page.tsx` | `app/[locale]/disclosure/page.tsx` | Move + load legal dict |
| `app/not-found.tsx` | `app/[locale]/not-found.tsx` | Move + translate |
| `app/globals.css` | `app/globals.css` | Unchanged (imported by [locale]/layout.tsx) |
| `components/*.tsx` | `components/*.tsx` | Refactor each to accept `dict` prop |
| — | `middleware.ts` | NEW |
| — | `dictionaries/types.ts` | NEW |
| — | `dictionaries/de.ts` | NEW (port current strings) |
| — | `dictionaries/en.ts` | NEW (draft English) |
| — | `dictionaries/index.ts` | NEW |
| — | `i18n/config.ts` | OPTIONAL — small shared constants if helpful |
| — | `utils/route.ts` | NEW — `localized()` helper |

Quiz routes (`app/v1/`, `app/v2/`, `app/v3/`, `app/quiz/`) are not moved, not refactored, not touched.

---

## 6. Edge cases and decisions

| Case | Decision |
|---|---|
| User visits `buildforthem.de/en/foo` | Middleware respects the explicit `/en` prefix even on `.de` (dev compatibility). Production: this works but produces a German `<html lang>` if we don't carefully read the URL too. **Fix:** middleware sets locale strictly from URL prefix when present, falling back to domain otherwise. |
| User visits `buildforthem.com/de/foo` | Same — explicit prefix wins. |
| User visits `buildforthem.de/v1` (quiz) | Middleware matcher excludes `/v1`, `/v2`, `/v3`, `/quiz` — they bypass and serve as-is. |
| 404 on a locale page | `app/[locale]/not-found.tsx` renders a locale-appropriate 404 message. |
| Switching language preserves path? | NO — switcher always goes to the other domain's `/`. (YAGNI.) |
| User loads `/` directly (no locale) | Middleware adds the locale prefix based on domain. |
| Crawler hits `buildforthem.de/v4` | Middleware rewrites internally to `/de/v4`. Page renders German. hreflang links Google to `buildforthem.com/v4` for the English equivalent. |
| Localhost dev access | Visit `localhost:3000/de/...` or `localhost:3000/en/...` directly. Switcher hops between them via path prefix in dev. |
| Calendar booking confirmations | Currently German-only (single Google calendar). Future improvement noted in 3.8. Document this in the EN site's CalendarEmbed copy ("Calls available in English on request") or leave as-is. **Resolution:** add a one-liner in the English calendar section: *"Booking confirmation in German; call available in English upon request — let us know in the booking notes."* |

---

## 7. Out of scope (explicit)

- `/v1`, `/v2`, `/v3`, `/quiz` quiz funnel translation — stays English-only
- Email capture / lead-capture forms on `/v4` — separate scope
- Separate Google Calendar per locale — flagged as future improvement only
- Localized URL slugs (e.g., `/datenschutz`) — same English slugs for both
- Currency formatting per locale (EUR is shown literally in both versions)
- Date/time formatting libraries — not needed; we hardcode "14 Tagen" / "14 days"
- Cookie-based locale persistence — strict domain routing, no cookies
- Automatic browser-language detection — strict domain routing only
- Translating Marc's signature image / photo — same assets

---

## 8. Success criteria

Implementation is complete when:

- [ ] Visiting `buildforthem.de` (or local equivalent `localhost:3000/de`) serves the full German homepage with `<html lang="de">` and German meta
- [ ] Visiting `buildforthem.com` (or `localhost:3000/en`) serves the full English homepage with `<html lang="en">` and English meta
- [ ] All 10 homepage sections render in both languages with no missing strings
- [ ] `/v4` and `/v4/success` render in both languages
- [ ] `/privacy`, `/terms`, `/disclosure` render in both languages
- [ ] Header language switcher links to the other domain (or `/other-locale` path in dev) and is visible on both
- [ ] hreflang `<link>` tags appear in both versions
- [ ] `npm run build` succeeds with zero errors
- [ ] `npx tsc --noEmit` succeeds (proves `de.ts` and `en.ts` are key-complete via the shared `Dictionary` interface)
- [ ] `/v1`, `/v2`, `/v3`, `/quiz` continue to work unchanged
- [ ] Page anchors (`#methode`, `#stories`, `#faq`, `#kalender`) still scroll correctly in both locales

---

## 9. Open questions (user input needed)

1. **Domain ownership status.** Are `buildforthem.de` and `buildforthem.com` both registered? If only one is owned, the spec needs adjustment.
2. **Legal text accuracy.** German legal text drafts must be reviewed by your lawyer before publishing — implementation will produce drafts based on the existing English text, but they need verification.
3. **English-call availability.** Do you want to offer the Strategie-Call in English (and notice this on the English page), or restrict to German-only with a wait?
4. **English brand voice.** The German voice is sharp/declarative ("Gehalt ist die langsame Spur."). Should the English voice match exactly ("Salary is the slow lane.") or soften slightly for an English-speaking audience that's less familiar with German direct-speech style?
5. **Marc's English-language fluency for calls.** Affects #3.

---

## 10. Ethics check (Playbook Section 11)

Carried over from the homepage redesign — same ethical posture applies to the English version:

| Filter | EN-specific status | Note |
|---|---|---|
| Full-Disclosure | ✅ Pass | Same transparent pricing model ("discussed on the call") |
| True-Promise | ✅ Pass | 5K-in-90-days guarantee transferred to English |
| Mom Test | ✅ Pass | All claims supported |
| Outcome Distribution | ⚠️ Action item | Testimonial figures translated, but currency unchanged (EUR in both versions). Consider EN versions with USD equivalents in a future iteration. |

---

## 11. Implementation order (suggested for plan)

1. Scaffold dictionary infrastructure (`dictionaries/types.ts`, `dictionaries/de.ts`, `dictionaries/en.ts`, `dictionaries/index.ts`)
2. Write `middleware.ts` with full routing logic
3. Add `utils/route.ts` (`localized()` helper)
4. Refactor every section component to accept `dict` prop (one component at a time, dev-server visual check)
5. Create `app/[locale]/layout.tsx` with locale-aware metadata + hreflang
6. Move `app/page.tsx` → `app/[locale]/page.tsx` and wire to dict
7. Move + refactor `/v4`, `/v4/success`, `/privacy`, `/terms`, `/disclosure`
8. Move `app/not-found.tsx` → `app/[locale]/not-found.tsx`
9. Delete old `app/layout.tsx`, old top-level pages
10. Add language switcher to `Header.tsx`
11. Add `sitemap.ts`
12. Full visual QA per locale on dev (`localhost:3000/de`, `localhost:3000/en`)
13. Production build verification
14. Vercel domain config (manual user step — documented in plan)
15. DNS config (manual user step — documented in plan)

---

*End of design document.*
