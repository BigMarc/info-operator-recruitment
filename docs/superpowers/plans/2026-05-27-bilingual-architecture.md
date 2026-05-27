# Bilingual Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the BuildForThem site from German-only into a bilingual site served on `buildforthem.de` (German) and `buildforthem.com` (English) from a single Next.js codebase.

**Architecture:** Shared components + per-locale TypeScript dictionaries + `[locale]` dynamic route segment + middleware that maps domain → locale. Same URL slugs in both languages (e.g., `/v4/success` on both domains). Each section component is refactored once to accept a typed `dict` prop and threads it through the JSX. Adding more languages later = create one new `dictionaries/<locale>.ts`, no other code changes.

**Tech Stack:** Next.js 14 App Router · TypeScript strict · Tailwind CSS · Framer Motion 11. No new dependencies — uses Next.js built-in middleware and dynamic route segments.

**Reference spec:** [`docs/superpowers/specs/2026-05-27-bilingual-architecture-design.md`](../specs/2026-05-27-bilingual-architecture-design.md)

**Critical sequencing principle:** Each task leaves the site in a working state. Component refactors are paired with their `app/page.tsx` prop-update in the same commit so the page never breaks mid-task. The big `[locale]` route migration happens late (Phase 3) after all components are dict-ready.

**Implementation phases:**
- **Phase 1 — Infrastructure (Tasks 1–7):** dictionary types, German + English dictionaries, loader, middleware, helpers. Doesn't touch any page rendering yet.
- **Phase 2 — Component refactor (Tasks 8–19):** one task per component. Each refactors the component to take a `dict` prop AND updates `app/page.tsx` to pass it. Site stays German-only and working between every task.
- **Phase 3 — Route migration (Tasks 20–26):** move everything under `app/[locale]/`, switch root layout to read locale from middleware-set header, migrate `/v4`, `/v4/success`, legal pages.
- **Phase 4 — Polish (Tasks 27–29):** language switcher in Header, sitemap, final QA.
- **Phase 5 — Manual (Task 30):** documented Vercel + DNS steps for you to execute.

**Defaults used:**
- German legal text drafts are translations of the existing English text — flagged for lawyer review before publication
- English-language Strategie-Call: assumed AVAILABLE (we'll note in EN copy "Calls available in English upon request")
- English brand voice: matches the German declarative style (short, sharp sentences)
- Marc's English fluency: assumed sufficient for calls (you can adjust copy in `dictionaries/en.ts` if not)

---

## Task 0: Pre-flight

**Files:** none.

- [ ] **Step 1: Verify clean working tree on `main`**

Run: `git status`
Expected: `nothing to commit, working tree clean` (or only the existing untracked `Propaganda_Playbook_Master_Summary.md`).

- [ ] **Step 2: Ensure latest from origin**

Run: `git pull --ff-only origin main`
Expected: already up-to-date (we just pushed everything in the homepage redesign session).

- [ ] **Step 3: Verify baseline build passes**

Run: `npx tsc --noEmit && npm run build 2>&1 | tail -5`
Expected: zero TS errors; build succeeds.

- [ ] **Step 4: Start dev server in background**

Run: `npm run dev`
Open: http://localhost:3000
Expected: German homepage renders.

---

## Task 1: Create `dictionaries/types.ts` — Dictionary interface

**Files:**
- Create: `dictionaries/types.ts`

- [ ] **Step 1: Create the directory**

Run: `mkdir -p dictionaries`

- [ ] **Step 2: Write `dictionaries/types.ts`** (the single source of truth for what content exists)

```ts
// Single source of truth for all translatable content in the site.
// Both dictionaries/de.ts and dictionaries/en.ts MUST satisfy this interface.
// TypeScript enforces parity: missing a key in one locale = build error.

export type Locale = 'de' | 'en';

export interface MetaDict {
  title: string;
  description: string;
}

export interface NavDict {
  methode: string;
  stories: string;
  faq: string;
  cta: string;
  switchTo: string; // "EN" when current=de, "DE" when current=en
}

export interface HeroStatDict {
  value: string;
  label: string;
  sub: string;
  highlight?: boolean;
}

export interface HeroDict {
  tag: string;
  headlineLine1: string;       // "Gehalt ist die langsame Spur." / "Salary is the slow lane."
  headlineLine2Pre: string;    // "Werde Growth Partner und verdiene" / "Become a Growth Partner and earn"
  headlineAccent: string;      // "5.000–20.000 €"
  headlineLine3: string;       // "pro Creator-Kunde." / "per creator client."
  sub: string;
  guaranteeBarBefore: string;  // text before the bolded euro amount
  guaranteeAmount: string;     // "5.000 €" / "€5,000"
  guaranteeBarMiddle: string;  // " in "
  guaranteeDays: string;       // "90 Tagen" / "90 days"
  guaranteeBarAfter: string;   // " oder 100 % Geld zurück — schriftlich garantiert."
  videoTitle: string;
  videoSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStatDict[];       // 4 items
}

export interface ProblemCardDict {
  icon: string;
  title: string;
  body: string;
}

export interface ProblemDict {
  tag: string;
  headlineBefore: string;       // "Fühlst du dich beruflich"
  headlineAccent: string;       // "ausgebremst"
  headlineAfter: string;        // "?"
  sub: string;
  cards: ProblemCardDict[];     // exactly 3
}

export interface ReframeDict {
  tag: string;
  headlineLine1: string;
  headlineLine2Pre: string;
  headlineAccent: string;
  headlineLine2Post: string;
  paragraphs: string[];         // 4 paragraphs; supports inline emphasis via component
  beliefOldLabel: string;
  beliefOldQuote: string;
  beliefNewLabel: string;
  beliefNewQuote: string;
}

export interface MethodStatDict {
  value: string;
  label: string;
  sub: string;
}

export interface MethodStepDict {
  num: number;
  title: string;
  body: string;
}

export interface MethodDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  body1: string;
  body2: string;
  avatarStripText: string;       // "Über 50+ Zufriedene Growth Partners"
  stats: MethodStatDict[];       // 4 items
  steps: MethodStepDict[];       // 4 items
}

export interface CredentialDict {
  icon: string;
  title: string;
  body: string;
}

export interface TrainerDict {
  headlineBefore: string;
  headlineAccent: string;
  sub: string;
  name: string;
  intro: string;
  credentials: CredentialDict[];  // 3 items
  quote: string;
  quoteAttribution: string;
  cta: string;
}

export interface TestimonialDict {
  name: string;
  background: string;
  clients: number;
  avatar: string;
  quote: string;
  result: string;
  before: string;
  after: string;
}

export interface AggregateStatDict {
  value: string;
  label: string;
  sub: string;
}

export interface TestimonialsDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  sub: string;
  items: TestimonialDict[];                  // 6 items
  clientsLabel: string;                       // "Creator-Kunden" / "creator clients"
  resultLabel: string;                        // "Ergebnis:" / "Result:"
  beforeLabel: string;                        // "Vorher:" / "Before:"
  aggregate: AggregateStatDict[];             // 4 items
}

export interface LadderStepDict {
  num: number;
  title: string;
  body: string;
  price: string;
  cta: string;
  href: string;       // logical path (e.g., "/v4"); component prepends locale
}

export interface LadderDict {
  tag: string;
  headlineAccent: string;
  headlineRest: string;
  priceLabel: string;
  steps: LadderStepDict[];   // 3 items
  ctaPrimary: string;
}

export interface GuaranteeDict {
  headlineAccent: string;
  headlineRest: string;
  guarantee: {
    icon: string;
    title: string;
    body: string;             // contains placeholders {amount} and {days}
    footer: string;
  };
  scarcity: {
    icon: string;
    titleAccent: string;       // "7 von 10" / "7 of 10"
    titleRest: string;         // "Plätzen verfügbar"
    body: string;
    footer: string;
  };
  cta: string;
}

export interface FAQItemDict {
  q: string;
  a: string;
}

export interface FAQDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  sub: string;
  items: FAQItemDict[];       // 8 items
}

export interface CalendarBenefitDict {
  num: number;
  title: string;
  body: string;
}

export interface CalendarDict {
  headlineLine1: string;
  headlineLine2Accent: string;
  sub: string;
  benefitsHeading: string;
  benefits: CalendarBenefitDict[];     // 4 items
  scarcityHeading: string;
  scarcityBody: string;
  emailFallback: string;
}

export interface FooterDict {
  tagline: string;
  linksHeading: string;
  legalHeading: string;
  linkMethode: string;
  linkStories: string;
  linkFAQ: string;
  linkV4: string;
  linkPrivacy: string;
  linkTerms: string;
  linkDisclosure: string;
  companyHeading: string;
  guaranteeHeading: string;
  guaranteeBody: string;
  copyright: string;
}

export interface V4StepDict {
  num: number;
  title: string;
  body: string;
}

export interface V4Dict {
  badge: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  sub1: string;
  highlightAmount: string;          // "€100,000 profit" or German equivalent
  sub2: string;
  highlight2: string;
  sub3: string;
  ctaPrimary: string;
  secureBoxTitle: string;
  secureBoxBody: string;
  unlockedHeadlineBefore: string;
  unlockedHeadlineAccent: string;
  unlockedHeadlineAfter: string;
  videoTitle: string;
  videoSub: string;
  steps: V4StepDict[];               // 4 items
  unlockedCTA: string;
  footerDisclaimers: string[];
}

export interface SuccessNextStepDict {
  num: number;
  title: string;
  body: string;
}

export interface SuccessDict {
  badge: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  intro: string;
  nextStepsTag: string;
  nextStepsHeading: string;
  steps: SuccessNextStepDict[];      // 3 items
  ctaHeadlineLine1: string;
  ctaHeadlineLine2Accent: string;
  ctaSub: string;
  ctaScarcity: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaGuaranteeNote: string;
  backToHome: string;
}

export interface LegalDict {
  privacy: {
    title: string;
    bodyMarkdown: string;       // long-form text; rendered as paragraphs
  };
  terms: {
    title: string;
    bodyMarkdown: string;
  };
  disclosure: {
    title: string;
    bodyMarkdown: string;
  };
}

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

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add dictionaries/types.ts
git commit -m "feat(i18n): add Dictionary interface (single source of truth)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Create `i18n/config.ts` — Locale constants

**Files:**
- Create: `i18n/config.ts`

- [ ] **Step 1: Create directory and file**

Run: `mkdir -p i18n`

`i18n/config.ts`:
```ts
import type { Locale } from '@/dictionaries/types';

export const locales: Locale[] = ['de', 'en'];
export const defaultLocale: Locale = 'de';

export function isValidLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'de' ? 'en' : 'de';
}

// Production domain map. Used by the Header language switcher.
export const PRODUCTION_DOMAINS: Record<Locale, string> = {
  de: 'https://buildforthem.de',
  en: 'https://buildforthem.com',
};
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add i18n/config.ts
git commit -m "feat(i18n): add locale config (constants, helpers, domain map)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Create `dictionaries/de.ts` — Port German strings

**Files:**
- Create: `dictionaries/de.ts`

This task extracts every hardcoded German string from the existing components into a single typed dictionary. The string values are the EXACT current text from the live components — no rephrasing.

- [ ] **Step 1: Write `dictionaries/de.ts`**

```ts
import type { Dictionary } from './types';

const de: Dictionary = {
  meta: {
    title: 'Growth Partner Ausbildung — BuildForThem',
    description: 'Werde Growth Partner und verdiene 5.000–20.000 € pro Creator-Kunde. Komplette Ausbildung, Creator-Matching, 5K-Garantie in 90 Tagen.',
  },
  nav: {
    methode: 'Methode',
    stories: 'Operator-Stories',
    faq: 'FAQ',
    cta: 'Kostenloses Training',
    switchTo: 'EN',
  },
  hero: {
    tag: 'Growth Partner Ausbildung',
    headlineLine1: 'Gehalt ist die langsame Spur.',
    headlineLine2Pre: 'Werde Growth Partner und verdiene',
    headlineAccent: '5.000–20.000 €',
    headlineLine3: 'pro Creator-Kunde.',
    sub: 'Wir bilden dich aus. Wir matchen dich mit geprüften Content Creators. Du baust ihr Backend — und kassierst Revenue-Share auf jeden Launch.',
    guaranteeBarBefore: '',
    guaranteeAmount: '5.000 €',
    guaranteeBarMiddle: ' in ',
    guaranteeDays: '90 Tagen',
    guaranteeBarAfter: ' oder 100 % Geld zurück — schriftlich garantiert.',
    videoTitle: '60-Min Training ansehen',
    videoSub: 'Methode, Geschäftsmodell, echte Zahlen',
    ctaPrimary: 'Kostenloses Training sichern',
    ctaSecondary: 'Wie funktioniert das?',
    stats: [
      { value: '50+', label: 'Aktive Growth Partners', sub: 'Im Netzwerk' },
      { value: '1,2 Mio. €+', label: 'An Partners ausgezahlt', sub: 'Revenue-Share', highlight: true },
      { value: '90 %', label: 'Vermittlungsquote', sub: 'Matching-Erfolg' },
      { value: '8 Jahre', label: 'Bewährtes System', sub: 'Seit 2018' },
    ],
  },
  problem: {
    tag: 'Die Situation',
    headlineBefore: 'Fühlst du dich beruflich',
    headlineAccent: 'ausgebremst',
    headlineAfter: '?',
    sub: 'Drei Sackgassen kennt fast jeder, der mehr will als sein Gehalt.',
    cards: [
      { icon: '💸', title: 'Abhängig von einem einzigen Gehalt', body: 'Du tauschst Zeit gegen Geld. Wenn du nicht arbeitest, verdienst du nichts. Eine Kündigung — und alles ist weg.' },
      { icon: '⚙️', title: 'Skills, aber keine Kunden', body: 'Du kannst Marketing, Funnels oder Verkauf. Aber wer bezahlt dich dafür? Cold Outreach kostet Monate ohne Garantie.' },
      { icon: '📉', title: 'Angst vor dem Sprung ins Nichts', body: 'Selbstständigkeit ohne Sicherheit klingt wie Roulette. Du willst springen — aber nicht ohne Netz.' },
    ],
  },
  reframe: {
    tag: 'Die Wende',
    headlineLine1: 'Hör auf, dein Gehalt zu erhöhen.',
    headlineLine2Pre: 'Fang an, an',
    headlineAccent: 'Umsatz beteiligt',
    headlineLine2Post: 'zu sein.',
    paragraphs: [
      'Die wohlhabendsten Menschen der Welt verdienen **kein Gehalt**. Sie haben **Beteiligung**.',
      'Content Creator haben das, was Geld wert ist: **Aufmerksamkeit**. Was ihnen fehlt — jemand, der diese Aufmerksamkeit in ein Produkt-Backend übersetzt: Offer, Funnel, Automation, Launch.',
      'Genau das macht ein **Growth Partner**. Du baust für sie. Du wirst nicht bezahlt wie ein Angestellter — du bekommst **20–50 % vom Umsatz**, den du erzeugst.',
      'Ein guter Creator-Kunde = **5.000–20.000 €** pro Launch. Drei Kunden = ein Vollzeit-Einkommen. Ortsunabhängig. Ohne Boss. Ohne Decke.',
    ],
    beliefOldLabel: 'Alte Überzeugung',
    beliefOldQuote: 'Mehr verdienen = besser bezahlt werden.',
    beliefNewLabel: 'Neue Überzeugung',
    beliefNewQuote: 'Mehr verdienen = an Umsatz beteiligt sein, den du erzeugst.',
  },
  method: {
    tag: 'Die Methode',
    headlineBefore: 'Was ist die',
    headlineAccent: 'Growth Partner Methode',
    headlineAfter: '?',
    body1: 'Ein **4-Schritte-System**, das jemanden ohne eigene Kundenbasis zum festen Backend-Operator für etablierte Content Creator macht.',
    body2: 'Lernzeit: **4–6 Wochen**. Danach matchen wir dich mit deinen ersten zahlenden Creator-Kunden.',
    avatarStripText: 'Über **50+ Zufriedene** Growth Partners',
    stats: [
      { value: '50+', label: 'Aktive Growth Partners', sub: 'Vertrauen bereits auf das System' },
      { value: '4 Schritte', label: 'Erprobte Methode', sub: 'Bewährt seit 2018' },
      { value: 'Komplett', label: 'Alle Tools inklusive', sub: 'Vorlagen, Funnels, Skripte, Verträge' },
      { value: '90 Tage', label: 'Bis zum ersten Kunden', sub: 'Bis 5K-Garantie greift' },
    ],
    steps: [
      { num: 1, title: 'System lernen', body: 'Komplette Ausbildung: Offer-Creation, Funnels, Automation, Launches.' },
      { num: 2, title: 'Werkzeuge meistern', body: 'Hands-on mit unseren Vorlagen, Skripten und Plattformen.' },
      { num: 3, title: 'Mit Creator gematcht', body: 'Wir verbinden dich mit geprüften Influencern, die einen Growth Partner brauchen.' },
      { num: 4, title: 'Revenue-Share kassieren', body: '20–50 % vom Umsatz, den du erzeugst. Ohne Decke.' },
    ],
  },
  trainer: {
    headlineBefore: 'Dein Ausbilder für',
    headlineAccent: 'Growth-Partner-Business',
    sub: 'Gründer von BuildForThem, Growth-Partner-Trainer, Experte für Creator-Backend-Strategie.',
    name: 'Marc Schultheiss',
    intro: 'Marc hat in den letzten 8 Jahren über 50 Growth Partners ausgebildet, die heute mit etablierten Content Creators arbeiten. Sein BuildForThem-System hat über **1,2 Mio. € Revenue-Share** für seine Partner generiert.',
    credentials: [
      { icon: '📈', title: 'Track Record', body: '8 Jahre Aufbau von Creator-Backend-Systemen' },
      { icon: '🏆', title: 'Ausbildungsergebnisse', body: '50+ aktive Absolventen mit eigenen Creator-Kunden' },
      { icon: '💰', title: 'Bewiesener Umsatz', body: '1,2 Mio. €+ an Growth Partners ausgezahlt' },
    ],
    quote: 'Mein Ziel: Menschen vom Gehalts-Spiel ins Beteiligungs-Spiel bringen.',
    quoteAttribution: '— Marc Schultheiss',
    cta: 'Kostenloses Training sichern',
  },
  testimonials: {
    tag: 'Echte Ergebnisse',
    headlineBefore: 'Was unsere',
    headlineAccent: 'Growth Partners',
    headlineAfter: 'verdienen',
    sub: 'Vom Marketing Manager zur 45K-Operatorin. Vom Freelancer zum 68K-Operator. Echte Menschen, dokumentierte Zahlen.',
    items: [
      { name: 'Sarah Chen', background: 'Ehemals Marketing Managerin', clients: 8, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', quote: 'Ich war skeptisch, meinen Konzernjob zu kündigen. Marcs Ausbildung hat mir alles gegeben, was ich brauchte. Heute habe ich 8 Creator-Kunden und 45.000 € Jahresumsatz. Das Matching-System ist Gold wert.', result: '45.000 € Jahresumsatz', before: 'Marketing im Konzern', after: 'Eigenes Growth-Partner-Business' },
      { name: 'Marcus Rodriguez', background: 'Ehemals Freelancer', clients: 12, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', quote: 'Die Arbeit mit Marc hat mein Freelance-Geschäft transformiert. Von schwankenden 3K-Monaten zu 68.000 € Jahresumsatz als Growth Partner. Die Ausbildung und das Matching haben den Unterschied gemacht.', result: '68.000 € Jahresumsatz', before: '3K/Monat freelance', after: '68K Growth Partner' },
      { name: 'Emma Thompson', background: 'Ehemals Vertriebsmitarbeiterin', clients: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', quote: 'Der Lifestyle-Creator-Launch hat alle Erwartungen übertroffen. 28K in der ersten Woche! Marcs Team hat alles übernommen — Sales Pages, E-Mail-Sequenzen, alles. Allein hätte ich das nie geschafft.', result: '32.000 € Jahresumsatz', before: 'Vertriebs-Provision', after: 'Planbares Operator-Einkommen' },
      { name: 'David Kim', background: 'Ehemals Berater', clients: 15, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', quote: 'Als Berater hätte ich nie gedacht, dass ich Gaming-Creatoren helfe, Produkte zu launchen. Marc hat mich überzeugt — mit einem 55K-Launch beim ersten Kunden. Die Marketing-Automation-Trainings sind unschlagbar.', result: '89.000 € Jahresumsatz', before: 'Stunden-Beratung', after: 'High-Ticket Operator-Services' },
      { name: 'Alex Rivera', background: 'Ehemals Ingenieur', clients: 10, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', quote: 'Der KI-Kurs-Launch war der Gamechanger. 31K im ersten Monat mit minimalem Aufwand. Marcs System macht die Arbeit — ich liefere nur den Mehrwert.', result: '58.000 € Jahresumsatz', before: 'Ingenieurs-Gehalt', after: 'Passives Operator-Einkommen' },
      { name: 'Ryan Mitchell', background: 'Ehemals Fotograf', clients: 9, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', quote: 'Der Foto-Kurs-Launch war unglaublich — 38K im ersten Monat. Marcs Team hat so überzeugende Sales-Copy und Marketing-Materialien gebaut. Klare Empfehlung.', result: '52.000 € Jahresumsatz', before: 'Foto-Aufträge', after: 'Digital-Produkt-Operator' },
    ],
    clientsLabel: 'Creator-Kunden',
    resultLabel: 'Ergebnis:',
    beforeLabel: 'Vorher:',
    aggregate: [
      { value: '344.000 €', label: 'Gesamt-Umsatz', sub: 'Aus 6 Operators oben' },
      { value: '57.000 €', label: 'Ø Umsatz', sub: 'Pro Operator' },
      { value: '90 %', label: 'Vermittlung', sub: 'Match-Erfolgsquote' },
      { value: '35 %', label: 'Ø Beteiligung', sub: 'Operator-Profit-Share' },
    ],
  },
  ladder: {
    tag: 'Dein Weg',
    headlineAccent: '3 Schritte.',
    headlineRest: 'Vom Klick bis zum ersten Creator-Kunden.',
    priceLabel: 'Preis',
    steps: [
      { num: 1, title: 'Kostenloses Training (heute)', body: '60-Min Video. Methode, Geschäftsmodell, echte Zahlen. Kein Vorwissen nötig.', price: '0 €', cta: 'Training starten', href: '/v4' },
      { num: 2, title: 'Strategie-Call (innerhalb 7 Tagen)', body: '30 Min Zoom. Wir prüfen, ob du passt. Du prüfst, ob wir passen.', price: '0 €', cta: 'Call buchen', href: '#kalender' },
      { num: 3, title: 'Growth Partner Programm (4–6 Wochen)', body: 'Komplette Ausbildung + Matching mit deinem ersten Creator-Kunden. Investition wird im Call besprochen — durch die 5K-Garantie abgesichert.', price: 'Im Call', cta: 'Mehr im Call', href: '#kalender' },
    ],
    ctaPrimary: 'Schritt 1 starten',
  },
  guarantee: {
    headlineAccent: 'Maximal abgesichert.',
    headlineRest: 'Minimal verfügbar.',
    guarantee: {
      icon: '💰',
      title: '5.000 € in 90 Tagen',
      body: 'Verdienst du in 90 Tagen nicht mindestens **5.000 €** mit deinem ersten Creator-Kunden, bekommst du **100 % deiner Ausbildungsgebühr zurück**.',
      footer: 'Schriftlich. Ohne Wenn und Aber.',
    },
    scarcity: {
      icon: '⚡',
      titleAccent: '7 von 10',
      titleRest: 'Plätzen verfügbar',
      body: 'Wir nehmen maximal **10 neue Growth Partners** pro Monat auf — damit jeder gematcht wird.',
      footer: 'Aktuelle Kohorte startet in 14 Tagen.',
    },
    cta: 'Platz sichern',
  },
  faq: {
    tag: 'FAQ',
    headlineBefore: 'Häufige',
    headlineAccent: 'Fragen',
    sub: 'Alle wichtigen Fragen & Antworten auf einen Blick.',
    items: [
      { q: 'Für wen ist die Growth Partner Ausbildung geeignet?', a: 'Für Menschen mit beruflicher Vorerfahrung (Marketing, Vertrieb, Beratung, Freelancing, Engineering), die ein zweites Standbein oder eine vollständige Selbstständigkeit aufbauen wollen — ohne eigene Kundenakquise. Vorerfahrung in Marketing hilft, ist aber kein Muss. Das System ist so aufgebaut, dass du in 4–6 Wochen die Kernfähigkeiten lernst.' },
      { q: 'Wie funktioniert das Creator-Matching genau?', a: 'Nach Abschluss deiner Ausbildung stellen wir dir Content Creator aus unserem Netzwerk vor, die bereits eine Audience aufgebaut haben, aber noch kein Produkt-Backend besitzen. Du führst Erstgespräche, prüfst Passung in beide Richtungen, und arbeitest dann auf Revenue-Share-Basis (20–50 % je nach Setup).' },
      { q: 'Wie viel Zeit muss ich pro Woche investieren?', a: 'Während der 4–6-wöchigen Ausbildung rechne mit 8–12 Stunden pro Woche. Nach der Ausbildung skaliert der Aufwand mit deiner Kundenanzahl: 1 Creator-Kunde = etwa 10–15 Std/Woche; 3 Kunden = grob ein Vollzeitäquivalent.' },
      { q: 'Brauche ich Vorerfahrung in Marketing oder Verkauf?', a: 'Nein — aber strukturiertes Denken hilft. Die Methode bringt dir alle Schritte bei: Offer-Creation, Funnels, Automation, Launch-Mechanik, Closing. Über die Hälfte unserer aktiven Growth Partners hatte vorher keine Marketing-Rolle.' },
      { q: 'Was kostet das Programm — und warum steht der Preis nicht hier?', a: 'Den Preis besprechen wir im Strategie-Call, weil er von deinem Setup abhängt (z. B. Zahlweise, Coaching-Tier, ob du sofort startest oder eine spätere Kohorte). Die 5K-Garantie deckt dein Risiko vollständig: verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Kunden, erhältst du 100 % zurück.' },
      { q: 'Wie schnell sind erste Einnahmen realistisch?', a: 'Die durchschnittliche Zeit vom Programmstart bis zum ersten zahlenden Creator-Kunden liegt bei ca. 90 Tagen. Schnellere Partner schaffen es in 30–45 Tagen; langsamere brauchen 4–5 Monate. Das hängt von deiner Umsetzungsgeschwindigkeit ab.' },
      { q: 'Ist das Modell wirklich ortsunabhängig?', a: 'Ja. Die gesamte Arbeit läuft remote: Calls mit Creatoren per Zoom, Funnel-Aufbau in Web-Tools (z. B. ClickFunnels, ActiveCampaign), Launch-Koordination per Slack/Notion. Mehrere unserer Growth Partners arbeiten aus Bali, Lissabon und Mexico City.' },
      { q: 'Was passiert, wenn ich nach 90 Tagen keinen Kunden habe?', a: 'Greift die 5.000-€-in-90-Tagen-Garantie — du bekommst 100 % deiner Ausbildungsgebühr zurück. Bedingung: nachweisbare Umsetzung der im Programm vermittelten Schritte (Modul-Abschlüsse, Outreach-Logs). Wir haben den Anspruch, dass jeder Partner mindestens diesen Schwellwert erreicht; alle bisherigen Garantie-Fälle wurden ohne Diskussion ausgezahlt.' },
    ],
  },
  calendar: {
    headlineLine1: 'Ein letzter Schritt.',
    headlineLine2Accent: 'Buche deinen Strategie-Call.',
    sub: '30 Minuten Zoom. Wir prüfen gemeinsam, ob die Growth Partner Ausbildung der nächste richtige Schritt für dich ist.',
    benefitsHeading: 'Was du im Call bekommst:',
    benefits: [
      { num: 1, title: 'Programm-Übersicht', body: 'Was du in 4–6 Wochen lernst und wie das Matching funktioniert.' },
      { num: 2, title: 'Dein Setup-Check', body: 'Wir prüfen, ob dein Profil zu unseren Creator-Kunden passt.' },
      { num: 3, title: 'Verdienst-Potenzial', body: 'Realistische Erwartung für deinen ersten, dritten und zwölften Monat.' },
      { num: 4, title: 'Investition & Garantie', body: 'Transparente Preisübersicht und die schriftliche 5K-Garantie.' },
    ],
    scarcityHeading: 'Nur noch 7 von 10 Plätzen',
    scarcityBody: 'Aktuelle Kohorte startet in 14 Tagen. Wir nehmen maximal 10 neue Growth Partners pro Monat auf.',
    emailFallback: 'Lieber per E-Mail? → info@tgn-media.com',
  },
  footer: {
    tagline: 'Wir bilden Growth Partners aus, die das Backend für etablierte Content Creator bauen. Komplette Ausbildung, Creator-Matching und laufende Unterstützung.',
    linksHeading: 'Links',
    legalHeading: 'Rechtliches',
    linkMethode: 'Methode',
    linkStories: 'Operator-Stories',
    linkFAQ: 'FAQ',
    linkV4: 'Kostenloses Training',
    linkPrivacy: 'Datenschutz',
    linkTerms: 'AGB',
    linkDisclosure: 'Impressum',
    companyHeading: 'TGN Media LLC',
    guaranteeHeading: '5K-Garantie',
    guaranteeBody: 'Verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Creator-Kunden, bekommst du 100 % deiner Ausbildungsgebühr zurück. Schriftlich. Ohne Wenn und Aber.',
    copyright: '© 2026 TGN Media LLC. Alle Rechte vorbehalten.',
  },
  v4: {
    badge: 'Kostenloses Video-Training',
    headlineBefore: 'Wie du',
    headlineAccent: '10.000–20.000 € pro Monat',
    headlineAfter: 'als Growth Partner verdienst — mit einem einzigen Creator-Kunden.',
    sub1: 'Ich zeige dir das 4-Schritte-Framework, mit dem ich',
    highlightAmount: '100.000 € Gewinn',
    sub2: 'in einem einzigen Monat erzeugt habe — und wie du das',
    highlight2: 'Schritt für Schritt mit KI',
    sub3: 'nachbauen kannst.',
    ctaPrimary: 'Video-Training jetzt ansehen',
    secureBoxTitle: '🔒 Sichere dir KOSTENLOSEN Zugang zum Video-Training',
    secureBoxBody: 'Begrenzter Zugang — keine Zahlung nötig',
    unlockedHeadlineBefore: 'Mit diesen',
    unlockedHeadlineAccent: '4 Schritten',
    unlockedHeadlineAfter: 'habe ich als Growth Partner auf 106k skaliert...',
    videoTitle: 'Video-Training',
    videoSub: 'Hier wird die Video-URL eingebettet',
    steps: [
      { num: 1, title: 'Kunden-Akquise', body: 'Finde und gewinne hochwertige Creator, die deine Services brauchen' },
      { num: 2, title: 'Offer-Creation', body: 'Entwickle unwiderstehliche Angebote, die echte Probleme lösen' },
      { num: 3, title: 'KI-Automation', body: 'Nutze KI-Tools, um deine Operations effizient zu skalieren' },
      { num: 4, title: 'Profit-Skalierung', body: 'Skaliere auf konstantes 5-stelliges Monats-Einkommen' },
    ],
    unlockedCTA: 'Strategie-Call buchen',
    footerDisclaimers: [
      'NICHT FACEBOOK: Diese Seite ist nicht Teil der Facebook-Website oder Facebook Inc.',
      'NICHT GOOGLE: Diese Seite ist nicht Teil der Google-Website oder Google Inc.',
    ],
  },
  success: {
    badge: 'Dein Training ist freigeschaltet',
    headlineBefore: 'Willkommen,',
    headlineAccent: 'Growth Partner',
    headlineAfter: 'in spe.',
    intro: 'Du hast den ersten Schritt gemacht. In den nächsten 60 Minuten lernst du, wie das Growth-Partner-Modell funktioniert — und wie du daraus deine erste Revenue-Share-Beteiligung mit einem Creator baust.',
    nextStepsTag: 'Die nächsten Schritte',
    nextStepsHeading: 'Was jetzt passiert',
    steps: [
      { num: 1, title: 'Schau dir das Training in Ruhe an', body: 'Nimm dir 60 Minuten — am besten ohne Ablenkung. Du lernst die komplette Methode, das Geschäftsmodell und die echten Zahlen.' },
      { num: 2, title: 'Buche deinen Strategie-Call', body: 'Wenn du nach dem Training spürst, dass das Modell zu dir passt, buche direkt den nächsten Schritt: 30 Minuten Zoom mit unserem Team.' },
      { num: 3, title: 'Werde gematcht', body: 'Im Call entscheiden wir gemeinsam, ob du in die nächste Kohorte passt. Wenn ja: wir matchen dich nach der Ausbildung mit deinem ersten Creator-Kunden.' },
    ],
    ctaHeadlineLine1: 'Bereit für Schritt 2?',
    ctaHeadlineLine2Accent: 'Buche jetzt deinen Strategie-Call.',
    ctaSub: '30 Minuten Zoom. Wir prüfen, ob die Ausbildung zu dir passt — und du prüfst, ob wir zu dir passen.',
    ctaScarcity: 'Nur noch 7 von 10 Plätzen in der nächsten Kohorte',
    ctaPrimary: 'Strategie-Call buchen',
    ctaSecondary: 'Lieber per E-Mail',
    ctaGuaranteeNote: '5.000 € in 90 Tagen oder 100 % Geld zurück — schriftlich garantiert.',
    backToHome: '← Zurück zur Startseite',
  },
  legal: {
    privacy: {
      title: 'Datenschutzerklärung',
      bodyMarkdown: `## 1. Verantwortlicher

TGN Media LLC, 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, USA. E-Mail: info@tgn-media.com.

## 2. Erhebung personenbezogener Daten

Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website und Inhalte erforderlich ist. Beim Besuch unserer Website werden automatisch technische Daten (IP-Adresse, Browser-Typ, Zugriffszeit) erfasst.

## 3. Zweck der Verarbeitung

Die Daten dienen der technischen Bereitstellung der Website, der Sicherheit und der statistischen Auswertung.

## 4. Weitergabe von Daten

Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nicht, außer wenn dies gesetzlich erlaubt oder vorgeschrieben ist.

## 5. Ihre Rechte

Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Anfragen richten Sie bitte an info@tgn-media.com.

*Hinweis: Dieser Text ist ein Entwurf. Vor Veröffentlichung von einem Rechtsanwalt prüfen lassen.*`,
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      bodyMarkdown: `## 1. Geltungsbereich

Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen TGN Media LLC und ihren Kunden über die Growth Partner Ausbildung.

## 2. Vertragsgegenstand

Gegenstand des Vertrages ist die Teilnahme an der Growth Partner Ausbildung sowie das anschließende Matching mit Content Creators.

## 3. 5K-Garantie

Verdient ein Teilnehmer innerhalb von 90 Tagen nach Programmstart nicht mindestens 5.000 € mit seinem ersten Creator-Kunden, erstattet TGN Media LLC 100 % der gezahlten Ausbildungsgebühr. Bedingung ist die nachweisbare Umsetzung der im Programm vermittelten Schritte.

## 4. Zahlung

Die Höhe der Ausbildungsgebühr wird im Strategie-Call besprochen und vor Programmstart schriftlich vereinbart.

## 5. Widerrufsrecht

Verbrauchern steht das gesetzliche Widerrufsrecht zu. Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss.

*Hinweis: Dieser Text ist ein Entwurf. Vor Veröffentlichung von einem Rechtsanwalt prüfen lassen.*`,
    },
    disclosure: {
      title: 'Impressum',
      bodyMarkdown: `## Anbieter

TGN Media LLC
1309 Coffeen Avenue STE 1200
Sheridan, Wyoming 82801
United States of America

## Kontakt

E-Mail: info@tgn-media.com

## Vertretungsberechtigter

Marc Schultheiss

## Haftungsausschluss

Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.

*Hinweis: Dieser Text ist ein Entwurf. Vor Veröffentlichung von einem Rechtsanwalt prüfen lassen.*`,
    },
  },
};

export default de;
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add dictionaries/de.ts
git commit -m "feat(i18n): German dictionary (ports current strings + legal drafts)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Create `dictionaries/en.ts` — English translation

**Files:**
- Create: `dictionaries/en.ts`

This task drafts the full English translation. The voice matches the German declarative style ("Salary is the slow lane.") with minor adaptation for English idiom. All structural keys mirror `de.ts` — TypeScript enforces parity.

- [ ] **Step 1: Write `dictionaries/en.ts`**

```ts
import type { Dictionary } from './types';

const en: Dictionary = {
  meta: {
    title: 'Growth Partner Training — BuildForThem',
    description: 'Become a Growth Partner and earn €5,000–€20,000 per creator client. Complete training, creator matching, 90-day €5K money-back guarantee.',
  },
  nav: {
    methode: 'Method',
    stories: 'Operator Stories',
    faq: 'FAQ',
    cta: 'Free Training',
    switchTo: 'DE',
  },
  hero: {
    tag: 'Growth Partner Training',
    headlineLine1: 'A salary is the slow lane.',
    headlineLine2Pre: 'Become a Growth Partner and earn',
    headlineAccent: '€5,000–€20,000',
    headlineLine3: 'per creator client.',
    sub: "We train you. We match you with vetted content creators. You build their backend — and take revenue share on every launch.",
    guaranteeBarBefore: '',
    guaranteeAmount: '€5,000',
    guaranteeBarMiddle: ' in ',
    guaranteeDays: '90 days',
    guaranteeBarAfter: ' or 100% money back — guaranteed in writing.',
    videoTitle: 'Watch the 60-min training',
    videoSub: 'Method, business model, real numbers',
    ctaPrimary: 'Get free training',
    ctaSecondary: 'How does it work?',
    stats: [
      { value: '50+', label: 'Active Growth Partners', sub: 'In our network' },
      { value: '€1.2M+', label: 'Paid out to partners', sub: 'Revenue share', highlight: true },
      { value: '90%', label: 'Matching rate', sub: 'Successful placements' },
      { value: '8 years', label: 'Proven system', sub: 'Since 2018' },
    ],
  },
  problem: {
    tag: 'The Situation',
    headlineBefore: 'Feeling',
    headlineAccent: 'stuck',
    headlineAfter: ' in your career?',
    sub: 'Three dead ends almost everyone hits who wants more than a salary.',
    cards: [
      { icon: '💸', title: 'Trapped on a single paycheck', body: "You trade time for money. When you don't work, you don't earn. One layoff — and it's all gone." },
      { icon: '⚙️', title: 'You have skills, but no clients', body: "You know marketing, funnels, or sales. But who's paying you for them? Cold outreach takes months with no guarantee." },
      { icon: '📉', title: 'Afraid to jump without a net', body: "Going solo without security feels like roulette. You want to jump — but not into thin air." },
    ],
  },
  reframe: {
    tag: 'The Turn',
    headlineLine1: 'Stop trying to raise your salary.',
    headlineLine2Pre: 'Start earning',
    headlineAccent: 'a share of the revenue',
    headlineLine2Post: 'you create.',
    paragraphs: [
      "The wealthiest people in the world don't earn a salary. They have **a share**.",
      "Content creators have what's actually worth money: **attention**. What they lack — someone who turns that attention into a product backend: offer, funnel, automation, launch.",
      "That's exactly what a **Growth Partner** does. You build for them. You don't get paid like an employee — you get **20–50% of the revenue** you create.",
      "One good creator client = **€5,000–€20,000** per launch. Three clients = a full-time income. Location-independent. No boss. No ceiling.",
    ],
    beliefOldLabel: 'Old belief',
    beliefOldQuote: 'Earning more means getting paid more.',
    beliefNewLabel: 'New belief',
    beliefNewQuote: 'Earning more means owning a share of the revenue you create.',
  },
  method: {
    tag: 'The Method',
    headlineBefore: 'What is the',
    headlineAccent: 'Growth Partner Method',
    headlineAfter: '?',
    body1: "A **4-step system** that turns someone with no client base into a steady backend operator for established content creators.",
    body2: "Learning time: **4–6 weeks**. After that, we match you with your first paying creator clients.",
    avatarStripText: 'Over **50+ satisfied** Growth Partners',
    stats: [
      { value: '50+', label: 'Active Growth Partners', sub: 'Already trusting the system' },
      { value: '4 steps', label: 'Proven method', sub: 'Refined since 2018' },
      { value: 'Complete', label: 'All tools included', sub: 'Templates, funnels, scripts, contracts' },
      { value: '90 days', label: 'To first client', sub: 'Before the 5K guarantee kicks in' },
    ],
    steps: [
      { num: 1, title: 'Learn the system', body: 'Complete training: offer creation, funnels, automation, launches.' },
      { num: 2, title: 'Master the tools', body: 'Hands-on with our templates, scripts, and platforms.' },
      { num: 3, title: 'Matched with a creator', body: 'We connect you with vetted influencers who need a Growth Partner.' },
      { num: 4, title: 'Collect revenue share', body: '20–50% of the revenue you create. No ceiling.' },
    ],
  },
  trainer: {
    headlineBefore: 'Your trainer for the',
    headlineAccent: 'Growth Partner business',
    sub: 'Founder of BuildForThem, Growth Partner trainer, expert on creator backend strategy.',
    name: 'Marc Schultheiss',
    intro: "Over the last 8 years, Marc has trained 50+ Growth Partners who now work with established content creators. His BuildForThem system has generated over **€1.2M in revenue share** for his partners.",
    credentials: [
      { icon: '📈', title: 'Track record', body: '8 years building creator backend systems' },
      { icon: '🏆', title: 'Training results', body: '50+ active graduates with their own creator clients' },
      { icon: '💰', title: 'Proven payouts', body: '€1.2M+ paid out to Growth Partners' },
    ],
    quote: "My goal: move people from the salary game to the equity game.",
    quoteAttribution: '— Marc Schultheiss',
    cta: 'Get free training',
  },
  testimonials: {
    tag: 'Real Results',
    headlineBefore: 'What our',
    headlineAccent: 'Growth Partners',
    headlineAfter: 'earn',
    sub: 'From marketing manager to €45K operator. From freelancer to €68K operator. Real people, documented numbers.',
    items: [
      { name: 'Sarah Chen', background: 'Former Marketing Manager', clients: 8, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', quote: "I was hesitant to leave my corporate job. Marc's training gave me everything I needed. Today I have 8 creator clients and €45K in annual revenue. The matching system is worth its weight in gold.", result: '€45K annual revenue', before: 'Corporate marketing', after: 'Own Growth Partner business' },
      { name: 'Marcus Rodriguez', background: 'Former Freelancer', clients: 12, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', quote: "Working with Marc transformed my freelance business. From wobbly €3K months to €68K annual revenue as a Growth Partner. The training and matching made the difference.", result: '€68K annual revenue', before: '€3K/month freelance', after: '€68K Growth Partner' },
      { name: 'Emma Thompson', background: 'Former Sales Rep', clients: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', quote: "The lifestyle creator launch beat every expectation. €28K in the first week! Marc's team handled everything — sales pages, email sequences, all of it. I never could have done this alone.", result: '€32K annual revenue', before: 'Sales commission', after: 'Predictable operator income' },
      { name: 'David Kim', background: 'Former Consultant', clients: 15, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', quote: "As a consultant I never thought I'd be helping gaming creators launch products. Marc proved me wrong — with a €55K launch on the first client. The marketing automation training is unbeatable.", result: '€89K annual revenue', before: 'Hourly consulting', after: 'High-ticket operator services' },
      { name: 'Alex Rivera', background: 'Former Engineer', clients: 10, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', quote: "The AI course launch was the game-changer. €31K in the first month with minimal effort. Marc's system does the work — I just deliver the value.", result: '€58K annual revenue', before: 'Engineer salary', after: 'Passive operator income' },
      { name: 'Ryan Mitchell', background: 'Former Photographer', clients: 9, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', quote: "The photo course launch was incredible — €38K in the first month. Marc's team built such compelling sales copy and marketing assets. Highly recommend.", result: '€52K annual revenue', before: 'Photo gigs', after: 'Digital-product operator' },
    ],
    clientsLabel: 'creator clients',
    resultLabel: 'Result:',
    beforeLabel: 'Before:',
    aggregate: [
      { value: '€344K', label: 'Total revenue', sub: 'From 6 operators above' },
      { value: '€57K', label: 'Avg revenue', sub: 'Per operator' },
      { value: '90%', label: 'Matching', sub: 'Match success rate' },
      { value: '35%', label: 'Avg share', sub: 'Operator profit share' },
    ],
  },
  ladder: {
    tag: 'Your Path',
    headlineAccent: '3 steps.',
    headlineRest: 'From click to first creator client.',
    priceLabel: 'Price',
    steps: [
      { num: 1, title: 'Free training (today)', body: '60-min video. Method, business model, real numbers. No prior experience needed.', price: '€0', cta: 'Start training', href: '/v4' },
      { num: 2, title: 'Strategy call (within 7 days)', body: '30 min Zoom. We check if you fit. You check if we fit.', price: '€0', cta: 'Book call', href: '#kalender' },
      { num: 3, title: 'Growth Partner Program (4–6 weeks)', body: 'Complete training + matching with your first creator client. Investment discussed on the call — fully backed by the 5K guarantee.', price: 'On the call', cta: 'More on the call', href: '#kalender' },
    ],
    ctaPrimary: 'Start step 1',
  },
  guarantee: {
    headlineAccent: 'Maximally secure.',
    headlineRest: 'Minimally available.',
    guarantee: {
      icon: '💰',
      title: '€5,000 in 90 days',
      body: "If you don't earn at least **€5,000** with your first creator client within 90 days, you get **100% of your training fee back**.",
      footer: 'In writing. No questions asked.',
    },
    scarcity: {
      icon: '⚡',
      titleAccent: '7 of 10',
      titleRest: 'spots available',
      body: 'We take at most **10 new Growth Partners** per month — so everyone gets matched.',
      footer: 'Next cohort starts in 14 days.',
    },
    cta: 'Secure your spot',
  },
  faq: {
    tag: 'FAQ',
    headlineBefore: 'Frequently asked',
    headlineAccent: 'questions',
    sub: 'All the important questions and answers in one place.',
    items: [
      { q: 'Who is the Growth Partner training for?', a: "For people with professional experience (marketing, sales, consulting, freelancing, engineering) who want to build a second income stream or full self-employment — without their own client acquisition. Marketing experience helps but isn't required. The system is structured so you learn the core skills in 4–6 weeks." },
      { q: 'How does the creator matching actually work?', a: "After completing your training, we introduce you to content creators in our network who already have an audience but lack a product backend. You run intro calls, check fit both ways, and then work on a revenue-share basis (20–50% depending on setup)." },
      { q: 'How much time do I need to invest per week?', a: "During the 4–6-week training, plan for 8–12 hours per week. After training, the workload scales with your client count: 1 creator client = roughly 10–15 hrs/week; 3 clients = roughly a full-time equivalent." },
      { q: 'Do I need prior marketing or sales experience?', a: "No — but structured thinking helps. The method walks you through all the steps: offer creation, funnels, automation, launch mechanics, closing. Over half of our active Growth Partners had no prior marketing role." },
      { q: "What does the program cost — and why isn't the price listed here?", a: "We discuss the price on the strategy call because it depends on your setup (payment plan, coaching tier, whether you start now or in a later cohort). The 5K guarantee fully covers your risk: if you don't earn at least €5,000 with your first client in 90 days, you get 100% back." },
      { q: 'How quickly are first earnings realistic?', a: "The average time from program start to first paying creator client is roughly 90 days. Faster partners hit it in 30–45 days; slower ones take 4–5 months. It depends on your execution speed." },
      { q: 'Is the model really location-independent?', a: "Yes. The whole job runs remote: creator calls via Zoom, funnel building in web tools (e.g. ClickFunnels, ActiveCampaign), launch coordination via Slack/Notion. Several of our Growth Partners work from Bali, Lisbon, and Mexico City." },
      { q: "What happens if I don't get a client after 90 days?", a: "The 5,000-in-90-days guarantee kicks in — you get 100% of your training fee refunded. Condition: demonstrable execution of the steps taught in the program (module completion, outreach logs). Our standard is that every partner clears this threshold; every previous guarantee case was paid out without discussion." },
    ],
  },
  calendar: {
    headlineLine1: 'One last step.',
    headlineLine2Accent: 'Book your strategy call.',
    sub: "30 minutes on Zoom. We check together whether the Growth Partner training is the right next step for you. Calls available in English upon request — note this in your booking.",
    benefitsHeading: 'What you get on the call:',
    benefits: [
      { num: 1, title: 'Program overview', body: 'What you learn in 4–6 weeks and how the matching works.' },
      { num: 2, title: 'Your setup check', body: 'We check whether your profile matches our creator clients.' },
      { num: 3, title: 'Earnings potential', body: 'Realistic expectations for your first, third, and twelfth month.' },
      { num: 4, title: 'Investment & guarantee', body: 'Transparent price overview and the written 5K guarantee.' },
    ],
    scarcityHeading: 'Only 7 of 10 spots left',
    scarcityBody: 'Next cohort starts in 14 days. We take at most 10 new Growth Partners per month.',
    emailFallback: 'Prefer email? → info@tgn-media.com',
  },
  footer: {
    tagline: "We train Growth Partners who build the backend for established content creators. Complete training, creator matching, and ongoing support.",
    linksHeading: 'Links',
    legalHeading: 'Legal',
    linkMethode: 'Method',
    linkStories: 'Operator Stories',
    linkFAQ: 'FAQ',
    linkV4: 'Free Training',
    linkPrivacy: 'Privacy Policy',
    linkTerms: 'Terms of Service',
    linkDisclosure: 'Disclosure',
    companyHeading: 'TGN Media LLC',
    guaranteeHeading: '5K Guarantee',
    guaranteeBody: "If you don't earn at least €5,000 with your first creator client in 90 days, you get 100% of your training fee back. In writing. No questions asked.",
    copyright: '© 2026 TGN Media LLC. All rights reserved.',
  },
  v4: {
    badge: 'Free Video Training',
    headlineBefore: 'How to earn',
    headlineAccent: '€10,000–€20,000 per month',
    headlineAfter: 'as a Growth Partner — with a single creator client.',
    sub1: "I'll show you the 4-step framework I used to generate",
    highlightAmount: '€100,000 profit',
    sub2: 'in a single month — and how you can rebuild it',
    highlight2: 'step by step with AI',
    sub3: '.',
    ctaPrimary: 'Watch video training now',
    secureBoxTitle: '🔒 Secure your FREE access to the video training',
    secureBoxBody: 'Limited access — no payment required',
    unlockedHeadlineBefore: 'With these',
    unlockedHeadlineAccent: '4 steps',
    unlockedHeadlineAfter: "I scaled to €106K as a Growth Partner...",
    videoTitle: 'Video Training',
    videoSub: 'Replace with your actual video URL',
    steps: [
      { num: 1, title: 'Client acquisition', body: 'Find and attract high-value creators who need your services' },
      { num: 2, title: 'Offer creation', body: 'Develop irresistible offers that solve real problems' },
      { num: 3, title: 'AI automation', body: 'Leverage AI tools to scale your operations efficiently' },
      { num: 4, title: 'Profit scaling', body: 'Scale to consistent 5-figure monthly income' },
    ],
    unlockedCTA: 'Book strategy call',
    footerDisclaimers: [
      'NOT FACEBOOK: This site is not part of the Facebook website or Facebook Inc.',
      'NOT GOOGLE: This site is not part of the Google website or Google Inc.',
    ],
  },
  success: {
    badge: 'Your training is unlocked',
    headlineBefore: 'Welcome,',
    headlineAccent: 'Growth Partner',
    headlineAfter: 'in the making.',
    intro: "You took the first step. In the next 60 minutes you'll learn how the Growth Partner model works — and how to build your first revenue-share deal with a creator.",
    nextStepsTag: 'The next steps',
    nextStepsHeading: 'What happens now',
    steps: [
      { num: 1, title: 'Watch the training in peace', body: 'Take 60 minutes — ideally without distractions. You learn the complete method, the business model, and the real numbers.' },
      { num: 2, title: 'Book your strategy call', body: "If after the training you feel the model fits, book the next step directly: 30 minutes on Zoom with our team." },
      { num: 3, title: 'Get matched', body: 'On the call we decide together whether you fit the next cohort. If yes: we match you with your first creator client after training.' },
    ],
    ctaHeadlineLine1: 'Ready for step 2?',
    ctaHeadlineLine2Accent: 'Book your strategy call now.',
    ctaSub: '30 minutes on Zoom. We check if the training fits you — and you check if we fit you.',
    ctaScarcity: 'Only 7 of 10 spots left in the next cohort',
    ctaPrimary: 'Book strategy call',
    ctaSecondary: 'Prefer email',
    ctaGuaranteeNote: '€5,000 in 90 days or 100% money back — guaranteed in writing.',
    backToHome: '← Back to home',
  },
  legal: {
    privacy: {
      title: 'Privacy Policy',
      bodyMarkdown: `## 1. Controller

TGN Media LLC, 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, USA. Email: info@tgn-media.com.

## 2. Collection of Personal Data

We process personal data only as needed to provide our website and content. When you visit our site, technical data (IP address, browser type, access time) is collected automatically.

## 3. Purpose of Processing

Data is used for technical provision of the site, security, and statistical analysis.

## 4. Sharing of Data

Your personal data is not shared with third parties unless legally required or permitted.

## 5. Your Rights

You have the right to access, correct, delete, and restrict the processing of your personal data. Send requests to info@tgn-media.com.

*Note: This text is a draft. Have it reviewed by a lawyer before publication.*`,
    },
    terms: {
      title: 'Terms of Service',
      bodyMarkdown: `## 1. Scope

These Terms of Service apply to all contracts between TGN Media LLC and its customers regarding the Growth Partner training.

## 2. Subject of the Contract

The subject of the contract is participation in the Growth Partner training and subsequent matching with content creators.

## 3. 5K Guarantee

If a participant does not earn at least €5,000 with their first creator client within 90 days of program start, TGN Media LLC will refund 100% of the training fee paid. The condition is the demonstrable execution of the steps taught in the program.

## 4. Payment

The training fee is discussed on the strategy call and agreed in writing before program start.

## 5. Right of Withdrawal

Consumers have the statutory right of withdrawal. The withdrawal period is 14 days from contract conclusion.

*Note: This text is a draft. Have it reviewed by a lawyer before publication.*`,
    },
    disclosure: {
      title: 'Disclosure',
      bodyMarkdown: `## Provider

TGN Media LLC
1309 Coffeen Avenue STE 1200
Sheridan, Wyoming 82801
United States of America

## Contact

Email: info@tgn-media.com

## Authorized Representative

Marc Schultheiss

## Liability Disclaimer

Despite careful content control, we accept no liability for the content of external links. The operators of the linked pages are solely responsible for their content.

*Note: This text is a draft. Have it reviewed by a lawyer before publication.*`,
    },
  },
};

export default en;
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add dictionaries/en.ts
git commit -m "feat(i18n): English dictionary (full translation, matches DE structure)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Create `dictionaries/index.ts` — Loader

**Files:**
- Create: `dictionaries/index.ts`

- [ ] **Step 1: Write `dictionaries/index.ts`**

```ts
import type { Dictionary, Locale } from './types';
import de from './de';
import en from './en';

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary, Locale };
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add dictionaries/index.ts
git commit -m "feat(i18n): dictionary loader function

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Create `utils/route.ts` — `localized()` helper

**Files:**
- Create: `utils/route.ts`

- [ ] **Step 1: Create directory and file**

Run: `mkdir -p utils`

`utils/route.ts`:
```ts
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
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add utils/route.ts
git commit -m "feat(i18n): localized() href helper

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Create `middleware.ts` — Domain → locale routing

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Write `middleware.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';

// Routes that bypass the i18n middleware entirely.
// Quiz funnels stay English-only by design.
const BYPASS_PATHS = ['/v1', '/v2', '/v3', '/quiz'];

function detectLocale(req: NextRequest): Locale {
  const host = req.headers.get('host') || '';

  // Production domains
  if (host.endsWith('buildforthem.de')) return 'de';
  if (host.endsWith('buildforthem.com')) return 'en';

  // Dev / staging: check if pathname already carries a locale prefix
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

  // Bypass quiz funnels and any unrelated paths
  if (BYPASS_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const locale = detectLocale(req);

  // Build request headers with x-locale (root layout reads this for <html lang>)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-locale', locale);

  // If path already has /de or /en prefix, just attach the header
  if (pathHasLocalePrefix(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Rewrite to /{locale}{path} internally; public URL stays clean
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  // Skip: Next.js internals, API routes, static assets.
  // The bypass for v1/v2/v3/quiz is enforced inside middleware() above
  // because matcher can't easily express "starts with /v1 OR /v2 OR /v3 OR /quiz exactly".
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
```

- [ ] **Step 2: Type-check + build (middleware affects routing — must build)**

```bash
npx tsc --noEmit
npm run build 2>&1 | tail -10
```
Expected: zero TS errors. Build succeeds.

- [ ] **Step 3: Smoke test in dev**

The middleware is now active but no `[locale]` route exists yet — visiting `/` will 404 internally. Don't panic; Phase 3 fixes this.

To verify the file is syntactically correct, restart dev server:
```bash
pkill -f "next dev"; sleep 1; rm -rf .next; npm run dev &
sleep 4
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/
```
Expected: HTTP 404 (because `/de/` route doesn't exist yet — this is expected at this phase).

> **Important:** the dev server will appear broken until Phase 3 completes. That's intentional. Skip visual checks during Phase 2; rely on TypeScript and the production build for verification.

To restore working dev temporarily for Phase 2 visual checks, you can comment out the middleware export:
```ts
// Temporary during Phase 2 — comment out the export to disable middleware
// export const config = { matcher: [...] };
```
After Phase 3 is done, uncomment.

**Recommendation:** Don't comment out — just trust the tests and build. Visual checks resume in Phase 4.

- [ ] **Step 4: Commit**

```bash
git add middleware.ts
git commit -m "feat(i18n): add middleware (domain/path -> locale routing)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

**Phase 1 complete.** Infrastructure is in place; the site still works as before because no page imports the new modules yet.

---

## Phase 2 — Component refactor (Tasks 8–19)

**Principle:** each task refactors ONE component to accept a typed `dict` prop AND updates the current `app/page.tsx` (still German-only) to pass that component its dict. The site remains visually identical and working between every commit.

**Pattern (applies to every component task):**
1. Add `import type { XxxDict, Locale } from '@/dictionaries/types';` and `import { localized } from '@/utils/route';` (if the component has internal hrefs)
2. Change function signature: `export default function Xxx({ dict, locale }: { dict: XxxDict; locale: Locale })` — drop `locale` prop if no internal hrefs
3. Move all hardcoded array/object constants (STATS, STEPS, etc.) into reads from `dict`
4. Replace every hardcoded string with `{dict.someKey}`
5. Update `app/page.tsx`: import `getDictionary` once at top, then `<Xxx dict={dict.xxx} locale={locale} />`

Each task ends with: type-check + commit + visual smoke (refresh `http://localhost:3000` — page renders identically).

**`app/page.tsx` evolves across Phase 2.** By Task 8, it imports the dictionary at the top:
```tsx
import { getDictionary } from '@/dictionaries';
const dict = getDictionary('de');
const locale = 'de' as const;
```
This is temporary scaffolding — Phase 3 moves it under `[locale]` and reads locale from URL params. For now, hardcoding `'de'` keeps the page working during the refactor.

---

## Task 8: Refactor `components/Header.tsx`

**Files:**
- Modify: `components/Header.tsx`
- Modify: `app/page.tsx` (add dict scaffolding + pass `nav` dict to Header)

- [ ] **Step 1: Update `app/page.tsx` first** (so Header has its prop ready)

```tsx
import { getDictionary } from '@/dictionaries';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemAgitation from '@/components/ProblemAgitation';
import Reframe from '@/components/Reframe';
import Method from '@/components/Method';
import Trainer from '@/components/Trainer';
import Testimonials from '@/components/Testimonials';
import ValueLadder from '@/components/ValueLadder';
import GuaranteeScarcity from '@/components/GuaranteeScarcity';
import FAQ from '@/components/FAQ';
import CalendarEmbed from '@/components/CalendarEmbed';
import Footer from '@/components/Footer';

export default function Home() {
  const dict = getDictionary('de');
  const locale = 'de' as const;
  return (
    <main className="min-h-screen">
      <Header dict={dict.nav} locale={locale} />
      <Hero />
      <ProblemAgitation />
      <Reframe />
      <Method />
      <Trainer />
      <Testimonials />
      <ValueLadder />
      <GuaranteeScarcity />
      <FAQ />
      <CalendarEmbed />
      <Footer />
    </main>
  );
}
```

(`<Header dict={...} locale={...} />` works only after we update Header in Step 2; site will be broken between the two steps — that's fine within a single task.)

- [ ] **Step 2: Replace `components/Header.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { NavDict, Locale } from '@/dictionaries/types';
import { otherLocale, PRODUCTION_DOMAINS } from '@/i18n/config';
import { localized } from '@/utils/route';

interface HeaderProps {
  dict: NavDict;
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const switchTarget = otherLocale(locale);
  // SSR-safe: always link to production domain. (Dev users can navigate manually.)
  const switchHref = PRODUCTION_DOMAINS[switchTarget];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href={localized('/', locale)} className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-6"
          >
            <a href="#methode" className="text-gray-700 hover:text-black font-semibold transition">{dict.methode}</a>
            <a href="#stories" className="text-gray-700 hover:text-black font-semibold transition">{dict.stories}</a>
            <a href="#faq" className="text-gray-700 hover:text-black font-semibold transition">{dict.faq}</a>
            <a
              href={switchHref}
              hrefLang={switchTarget}
              className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-accent border border-gray-300 hover:border-accent rounded-full px-3 py-1.5 transition"
            >
              {dict.switchTo}
            </a>
            <a
              href={localized('/v4', locale)}
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              {dict.cta}
            </a>
          </motion.nav>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              <a href="#methode" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black font-semibold transition">{dict.methode}</a>
              <a href="#stories" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black font-semibold transition">{dict.stories}</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black font-semibold transition">{dict.faq}</a>
              <a href={switchHref} hrefLang={switchTarget} className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-accent border border-gray-300 rounded-full px-3 py-1.5 transition w-fit">
                {dict.switchTo}
              </a>
              <a
                href={localized('/v4', locale)}
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg text-center"
              >
                {dict.cta}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
```

> Note: `localized('/v4', 'de')` produces `/de/v4`. With middleware disabled or `[locale]` route not yet built, this link will 404. That's expected during Phase 2 — Phase 3 fixes routing.
>
> **For visual smoke tests during Phase 2**, the header text should render fine even though clicking links may 404. That's enough to validate the dict wiring.

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Header.tsx app/page.tsx
git commit -m "refactor(header): accept NavDict + Locale props, add language switcher

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Refactor `components/Hero.tsx`

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `app/page.tsx` (pass `hero` dict + locale)

- [ ] **Step 1: Update Hero pass in `app/page.tsx`**

Change `<Hero />` to `<Hero dict={dict.hero} locale={locale} />`.

- [ ] **Step 2: Replace `components/Hero.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { HeroDict, Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

interface HeroProps {
  dict: HeroDict;
  locale: Locale;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            {dict.tag}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
            {dict.headlineLine1}
            <br />
            {dict.headlineLine2Pre}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent inline-block">
              {dict.headlineAccent}
            </span>
            <br />
            {dict.headlineLine3}
          </h1>

          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 font-bold leading-relaxed">
              {dict.sub}
            </p>

            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-4 rounded-full border-2 border-accent/20 mb-2">
              <span className="text-accent font-bold text-lg">💰</span>
              <span className="text-black font-bold text-base sm:text-lg">
                {dict.guaranteeBarBefore}
                <span className="text-accent font-black">{dict.guaranteeAmount}</span>
                {dict.guaranteeBarMiddle}
                <span className="text-accent font-black">{dict.guaranteeDays}</span>
                {dict.guaranteeBarAfter}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg">{dict.videoTitle}</p>
                  <p className="text-gray-600 text-sm">{dict.videoSub}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href={localized('/v4', locale)}
              className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden glow-animation"
            >
              <span className="relative z-10 flex items-center gap-3">
                {dict.ctaPrimary}
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </a>
            <a
              href="#methode"
              className="group px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              {dict.ctaSecondary}
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {dict.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.highlight ? 'text-accent' : 'text-black'}`}>
                  {stat.value}
                </div>
                <div className="text-black font-semibold text-sm">{stat.label}</div>
                <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Hero.tsx app/page.tsx
git commit -m "refactor(hero): accept HeroDict + Locale props

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Refactor `components/ProblemAgitation.tsx`

**Files:**
- Modify: `components/ProblemAgitation.tsx`
- Modify: `app/page.tsx` (pass `problem` dict)

- [ ] **Step 1: Update `app/page.tsx`:** `<ProblemAgitation dict={dict.problem} />`

- [ ] **Step 2: Replace `components/ProblemAgitation.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { ProblemDict } from '@/dictionaries/types';

interface ProblemAgitationProps { dict: ProblemDict; }

export default function ProblemAgitation({ dict }: ProblemAgitationProps) {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            {dict.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            {dict.headlineBefore}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              {dict.headlineAccent}
            </span>
            {dict.headlineAfter}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{dict.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.cards.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="bg-accent/5 rounded-2xl p-8 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-6">{point.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-accent-dark mb-4 leading-tight">{point.title}</h3>
              <p className="text-gray-700 leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add components/ProblemAgitation.tsx app/page.tsx
git commit -m "refactor(problem-agitation): accept ProblemDict prop

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Refactor `components/Reframe.tsx`

**Files:**
- Modify: `components/Reframe.tsx`
- Modify: `app/page.tsx` (pass `reframe` dict)

The German body paragraphs contain `**bold**` markers (markdown-style). We render them by splitting on `**` and wrapping every odd-indexed segment in `<strong>`. Add a small inline `formatBold()` helper in the component.

- [ ] **Step 1: Update `app/page.tsx`:** `<Reframe dict={dict.reframe} />`

- [ ] **Step 2: Replace `components/Reframe.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { ReframeDict } from '@/dictionaries/types';

interface ReframeProps { dict: ReframeDict; }

// Render **bold** markdown-style emphasis as <strong> elements.
function FormattedParagraph({ text }: { text: string }) {
  const parts = text.split('**');
  return (
    <p>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : <span key={i}>{part}</span>
      )}
    </p>
  );
}

export default function Reframe({ dict }: ReframeProps) {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
              {dict.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              {dict.headlineLine1}
              <br />
              {dict.headlineLine2Pre}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                {dict.headlineAccent}
              </span>{' '}
              {dict.headlineLine2Post}
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              {dict.paragraphs.map((p, i) => (
                <FormattedParagraph key={i} text={p} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-accent/40 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">❌</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{dict.beliefOldLabel}</span>
                </div>
                <p className="text-white text-lg italic leading-relaxed">&ldquo;{dict.beliefOldQuote}&rdquo;</p>
              </div>
              <div className="border-t border-accent/30 pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{dict.beliefNewLabel}</span>
                </div>
                <p className="text-white text-lg italic leading-relaxed">&ldquo;{dict.beliefNewQuote}&rdquo;</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Reframe.tsx app/page.tsx
git commit -m "refactor(reframe): accept ReframeDict prop, render **bold** markdown inline

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12–19: Refactor remaining components (compact pattern)

**Same workflow for Method, Trainer, Testimonials, ValueLadder, GuaranteeScarcity, FAQ, CalendarEmbed, Footer.**

For each task: (1) update `app/page.tsx` to pass the matching dict slice and `locale` (if internal hrefs), (2) refactor the component to accept the typed prop and use a `FormattedParagraph`-style helper for any `**bold**` markdown in the dict, (3) type-check, (4) commit.

The full refactored components follow the same skeleton as Hero/Reframe above. The table below specifies, per component, what dict slice it consumes, whether it needs `locale`, and which dict keys replace which hardcoded strings.

| Task | Component | Dict slice | Needs `locale`? | Notable details |
|---|---|---|---|---|
| 12 | `Method.tsx` | `dict.method` | No | `body1`, `body2`, `avatarStripText` contain `**bold**` — use `FormattedParagraph` helper. Stats and steps come from `dict.stats` and `dict.steps`. Keep the `id="methode"` anchor. |
| 13 | `Trainer.tsx` | `dict.trainer` | Yes | `intro` contains `**bold**`. CTA href = `localized('/v4', locale)`. `dict.credentials` array drives the 3 credential rows. |
| 14 | `Testimonials.tsx` | `dict.testimonials` | No | Keep `id="stories"` anchor. Items, aggregate stats, and labels (`resultLabel`, `beforeLabel`, `clientsLabel`) all from dict. |
| 15 | `ValueLadder.tsx` | `dict.ladder` | Yes | `dict.steps[i].href` is a logical path — pass through `localized(href, locale)`. Step offsets (`lg:translate-y-12`, etc.) stay hardcoded — they're presentational, not content. `dict.ctaPrimary` for the bottom CTA href = `localized('/v4', locale)`. |
| 16 | `GuaranteeScarcity.tsx` | `dict.guarantee` | No | `guarantee.body` and `scarcity.body` contain `**bold**`. CTA href = `#kalender` (anchor, no localization). |
| 17 | `FAQ.tsx` | `dict.faq` | No | Keep `id="faq"`. `dict.items` drives the accordion. First item still pre-expanded via `useState(0)`. |
| 18 | `CalendarEmbed.tsx` | `dict.calendar` | No | Keep `id="kalender"`. Calendar `src` stays hardcoded (same for both locales). All copy from dict. |
| 19 | `Footer.tsx` | `dict.footer` | Yes | Link hrefs use `localized()`. The footer's currently-broken `/agb` link gets fixed: it becomes `localized('/terms', locale)` with display text from `dict.linkTerms`. |

**For each of Tasks 12–19, the workflow is identical to Tasks 8–11:**

- [ ] **Step 1:** Update `app/page.tsx` to pass the matching props. By Task 19, `app/page.tsx` looks like:

```tsx
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
```

- [ ] **Step 2:** Refactor the component. Use the existing component code as the base. Mechanical changes:
  - Add `import type { XxxDict, Locale } from '@/dictionaries/types';`
  - Add `import { localized } from '@/utils/route';` if needed
  - Change `export default function Xxx()` → `export default function Xxx({ dict, locale }: { dict: XxxDict; locale: Locale })` (drop `locale` if not needed)
  - Delete any local `const STATS = [...]`, `const STEPS = [...]`, `const TESTIMONIALS = [...]` arrays — read from `dict` instead
  - Replace every hardcoded string with `{dict.someKey}` per the dict shape in `dictionaries/types.ts`
  - For paragraphs containing `**bold**`, add and use `FormattedParagraph` helper (copy from Reframe.tsx)
  - For internal hrefs, swap `href="/v4"` → `href={localized('/v4', locale)}`
  - Anchor hrefs (`#methode`, `#stories`, `#faq`, `#kalender`) stay literal

- [ ] **Step 3:** Type-check + commit:

```bash
npx tsc --noEmit
git add components/<Component>.tsx app/page.tsx
git commit -m "refactor(<component>): accept <XxxDict> prop[, Locale]

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

> **If `npx tsc --noEmit` fails**, the most common cause is a dict key mismatch — verify the key you're reading exists in `dictionaries/types.ts` (and both `de.ts` and `en.ts`).

After Task 19, every component is dict-aware. The site is still German-only because `app/page.tsx` hardcodes `getDictionary('de')`. Phase 3 fixes that.

---

## Phase 3 — Route migration (Tasks 20–26)

This phase moves all in-scope routes under `app/[locale]/` and wires up the middleware-set `x-locale` header in the root layout. After Phase 3, both German and English are accessible.

---

## Task 20: Update `app/layout.tsx` — read locale from middleware header

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import { headers } from 'next/headers';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { getDictionary } from '@/dictionaries';
import type { Metadata } from 'next';
import './globals.css';

function readLocale(): Locale {
  const headersList = headers();
  const candidate = headersList.get('x-locale') || '';
  return isValidLocale(candidate) ? candidate : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
    alternates: {
      languages: {
        de: 'https://buildforthem.de',
        en: 'https://buildforthem.com',
        'x-default': 'https://buildforthem.de',
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = readLocale();
  return (
    <html lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add app/layout.tsx
git commit -m "feat(layout): read locale from middleware header for <html lang> and meta

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 21: Move `app/page.tsx` → `app/[locale]/page.tsx`

**Files:**
- Create: `app/[locale]/page.tsx`
- Delete: `app/page.tsx`

- [ ] **Step 1: Create directory**

Run: `mkdir -p "app/[locale]"`

- [ ] **Step 2: Create `app/[locale]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale, locales } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemAgitation from '@/components/ProblemAgitation';
import Reframe from '@/components/Reframe';
import Method from '@/components/Method';
import Trainer from '@/components/Trainer';
import Testimonials from '@/components/Testimonials';
import ValueLadder from '@/components/ValueLadder';
import GuaranteeScarcity from '@/components/GuaranteeScarcity';
import FAQ from '@/components/FAQ';
import CalendarEmbed from '@/components/CalendarEmbed';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
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

- [ ] **Step 3: Delete old `app/page.tsx`**

```bash
git rm app/page.tsx
```

- [ ] **Step 4: Type-check + verify routing**

```bash
npx tsc --noEmit
pkill -f "next dev"; sleep 1; rm -rf .next; npm run dev &
sleep 4
curl -s -o /dev/null -w "/ → %{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "/de → %{http_code}\n" http://localhost:3000/de
curl -s -o /dev/null -w "/en → %{http_code}\n" http://localhost:3000/en
```
Expected: all three → HTTP 200. (`/` works via middleware rewrite to `/de` based on default locale on localhost.)

- [ ] **Step 5: Commit**

```bash
git add "app/[locale]/page.tsx"
git commit -m "feat(routing): move homepage to app/[locale]/page.tsx

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 22: Migrate `/v4` to `app/[locale]/v4/page.tsx`

**Files:**
- Create: `app/[locale]/v4/page.tsx`
- Delete: `app/v4/page.tsx`

- [ ] **Step 1: Create directory**

Run: `mkdir -p "app/[locale]/v4"`

- [ ] **Step 2: Create `app/[locale]/v4/page.tsx`** — refactored to use `dict.v4`

```tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

export default function V4Page() {
  const params = useParams();
  const rawLocale = String(params?.locale ?? defaultLocale);
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale).v4;
  const [isVideoUnlocked, setIsVideoUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href={localized('/', locale)} className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
            <a
              href={localized('/', locale)}
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              {locale === 'de' ? 'Zurück zur Startseite' : 'Back to home'}
            </a>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent font-bold text-lg">🎥</span>
              <span className="text-black font-bold text-lg">{dict.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-8 leading-tight">
              {dict.headlineBefore}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                {dict.headlineAccent}
              </span>{' '}
              {dict.headlineAfter}
            </h1>

            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              {dict.sub1}{' '}
              <span className="text-accent font-black text-2xl">{dict.highlightAmount}</span>{' '}
              {dict.sub2}{' '}
              <span className="text-accent font-black">{dict.highlight2}</span>
              {dict.sub3}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => setIsVideoUnlocked(true)}
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {dict.ctaPrimary}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-accent/20 shadow-lg max-w-2xl mx-auto mb-16">
              <h3 className="text-lg font-bold text-black mb-2">{dict.secureBoxTitle}</h3>
              <p className="text-gray-600 text-sm">{dict.secureBoxBody}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {isVideoUnlocked && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-black mb-6">
                {dict.unlockedHeadlineBefore}{' '}
                <span className="text-accent">{dict.unlockedHeadlineAccent}</span>{' '}
                {dict.unlockedHeadlineAfter}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-black font-bold text-lg">{dict.videoTitle}</p>
                    <p className="text-gray-600 text-sm">{dict.videoSub}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {dict.steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1), duration: 0.8 }}
                  className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-xl">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <a
                href={localized('/v4/success', locale)}
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden inline-block"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {dict.unlockedCTA}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </a>
            </div>
          </div>
        </motion.section>
      )}

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black mb-4">
            Build<span className="text-accent">ForThem</span>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            {dict.footerDisclaimers.map((d, i) => <p key={i}>{d}</p>)}
            <p className="mt-4">
              <a href={localized('/privacy', locale)} className="text-accent hover:underline">Privacy</a>
              {' · '}
              <a href={localized('/terms', locale)} className="text-accent hover:underline">Terms</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
```

- [ ] **Step 3: Delete old `app/v4/page.tsx`**

```bash
git rm app/v4/page.tsx
```

- [ ] **Step 4: Type-check + smoke test**

```bash
npx tsc --noEmit
curl -s -o /dev/null -w "/de/v4 → %{http_code}\n" http://localhost:3000/de/v4
curl -s -o /dev/null -w "/en/v4 → %{http_code}\n" http://localhost:3000/en/v4
```
Expected: both → 200.

- [ ] **Step 5: Commit**

```bash
git add "app/[locale]/v4/page.tsx"
git commit -m "feat(routing): migrate /v4 to bilingual app/[locale]/v4

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 23: Migrate `/v4/success` to `app/[locale]/v4/success/page.tsx`

**Files:**
- Create: `app/[locale]/v4/success/page.tsx`
- Delete: `app/v4/success/page.tsx`

- [ ] **Step 1: Create directory**

Run: `mkdir -p "app/[locale]/v4/success"`

- [ ] **Step 2: Create `app/[locale]/v4/success/page.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

export default function V4SuccessPage() {
  const params = useParams();
  const rawLocale = String(params?.locale ?? defaultLocale);
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale).success;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href={localized('/', locale)} className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
            <a href={localized('/', locale)} className="text-gray-700 hover:text-black font-semibold transition">
              {dict.backToHome}
            </a>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="inline-flex items-center gap-3 bg-accent/10 px-8 py-4 rounded-full border-2 border-accent/30 mb-8">
              <span className="text-3xl">✅</span>
              <span className="text-black font-black text-lg">{dict.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
              {dict.headlineBefore}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                {dict.headlineAccent}
              </span>{' '}
              {dict.headlineAfter}
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">{dict.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
              {dict.nextStepsTag}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">{dict.nextStepsHeading}</h2>
          </motion.div>
          <div className="space-y-6 max-w-3xl mx-auto mb-12">
            {dict.steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6 border-2 border-accent/10">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-black text-lg">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-accent/5 via-white to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight">
              {dict.ctaHeadlineLine1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                {dict.ctaHeadlineLine2Accent}
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">{dict.ctaSub}</p>
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent text-lg">⚡</span>
              <span className="text-black font-bold">{dict.ctaScarcity}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={`${localized('/', locale)}#kalender`} className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 glow-animation">
                <span className="relative z-10 flex items-center gap-3">{dict.ctaPrimary}<span className="group-hover:translate-x-2 transition-transform">→</span></span>
              </a>
              <a href="mailto:info@tgn-media.com" className="px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all">{dict.ctaSecondary}</a>
            </div>
            <p className="mt-10 text-sm text-gray-500">{dict.ctaGuaranteeNote}</p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black mb-4">Build<span className="text-accent">ForThem</span></div>
          <p className="text-sm text-gray-500">
            <a href={localized('/privacy', locale)} className="text-accent hover:underline">Privacy</a>
            {' · '}<a href={localized('/terms', locale)} className="text-accent hover:underline">Terms</a>
            {' · '}<a href={localized('/disclosure', locale)} className="text-accent hover:underline">Disclosure</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
```

- [ ] **Step 3: Delete + verify + commit**

```bash
git rm app/v4/success/page.tsx
npx tsc --noEmit
curl -s -o /dev/null -w "/de/v4/success → %{http_code}\n" http://localhost:3000/de/v4/success
curl -s -o /dev/null -w "/en/v4/success → %{http_code}\n" http://localhost:3000/en/v4/success
git add "app/[locale]/v4/success/page.tsx"
git commit -m "feat(routing): migrate /v4/success to bilingual app/[locale]/v4/success

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 24: Migrate legal pages

**Files:**
- Create: `app/[locale]/privacy/page.tsx`
- Create: `app/[locale]/terms/page.tsx`
- Create: `app/[locale]/disclosure/page.tsx`
- Create: `components/LegalPage.tsx` (shared layout)
- Delete: `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/disclosure/page.tsx`

- [ ] **Step 1: Create shared `components/LegalPage.tsx`**

```tsx
'use client';

import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

interface LegalPageProps {
  locale: Locale;
  title: string;
  bodyMarkdown: string;
  backLabel: string;
}

// Minimal markdown renderer for the legal pages: handles ## headings and paragraphs.
function renderMarkdown(md: string): React.ReactNode[] {
  return md.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-black mt-8 mb-4">{block.slice(3)}</h2>;
    }
    if (block.startsWith('*') && block.endsWith('*')) {
      return <p key={i} className="text-gray-500 italic mt-8 text-sm">{block.slice(1, -1)}</p>;
    }
    return <p key={i} className="text-gray-700 leading-relaxed mb-4">{block}</p>;
  });
}

export default function LegalPage({ locale, title, bodyMarkdown, backLabel }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href={localized('/', locale)} className="text-2xl font-black text-black">
            Build<span className="text-accent">ForThem</span>
          </a>
          <a href={localized('/', locale)} className="text-gray-700 hover:text-black font-semibold transition">
            {backLabel}
          </a>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-8">{title}</h1>
        <div className="prose prose-lg max-w-none">
          {renderMarkdown(bodyMarkdown)}
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Create `app/[locale]/privacy/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import LegalPage from '@/components/LegalPage';

export default function Page({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  return (
    <LegalPage
      locale={locale}
      title={dict.legal.privacy.title}
      bodyMarkdown={dict.legal.privacy.bodyMarkdown}
      backLabel={dict.success.backToHome}
    />
  );
}
```

- [ ] **Step 3: Create `app/[locale]/terms/page.tsx`** (same pattern, `dict.legal.terms`)

```tsx
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import LegalPage from '@/components/LegalPage';

export default function Page({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  return (
    <LegalPage locale={locale} title={dict.legal.terms.title} bodyMarkdown={dict.legal.terms.bodyMarkdown} backLabel={dict.success.backToHome} />
  );
}
```

- [ ] **Step 4: Create `app/[locale]/disclosure/page.tsx`** (same pattern, `dict.legal.disclosure`)

```tsx
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import LegalPage from '@/components/LegalPage';

export default function Page({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  return (
    <LegalPage locale={locale} title={dict.legal.disclosure.title} bodyMarkdown={dict.legal.disclosure.bodyMarkdown} backLabel={dict.success.backToHome} />
  );
}
```

- [ ] **Step 5: Delete old legal pages + commit**

```bash
git rm app/privacy/page.tsx app/terms/page.tsx app/disclosure/page.tsx
mkdir -p "app/[locale]/privacy" "app/[locale]/terms" "app/[locale]/disclosure"
# (create the files written above in those directories first via Write/Edit)
npx tsc --noEmit
git add components/LegalPage.tsx "app/[locale]/privacy/page.tsx" "app/[locale]/terms/page.tsx" "app/[locale]/disclosure/page.tsx"
git commit -m "feat(routing): migrate legal pages to bilingual app/[locale]/*

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 25: Migrate `app/not-found.tsx`

**Files:**
- Create: `app/[locale]/not-found.tsx`
- Modify or replace: `app/not-found.tsx` (must still exist for paths outside `[locale]` — quiz funnels)

- [ ] **Step 1: Check current `app/not-found.tsx`** — read it; if it has hardcoded English text, leave it as-is (it covers paths the bypass list catches).

- [ ] **Step 2: Create `app/[locale]/not-found.tsx`**

```tsx
'use client';

import { useParams } from 'next/navigation';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

const COPY: Record<Locale, { title: string; sub: string; cta: string }> = {
  de: { title: 'Seite nicht gefunden', sub: 'Diese Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite' },
  en: { title: 'Page not found', sub: "This page doesn't exist or has been moved.", cta: 'Back to home' },
};

export default function NotFound() {
  const params = useParams();
  const rawLocale = String(params?.locale ?? defaultLocale);
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const copy = COPY[locale];
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-accent mb-6">404</h1>
        <h2 className="text-2xl font-bold text-black mb-4">{copy.title}</h2>
        <p className="text-gray-700 mb-8">{copy.sub}</p>
        <a href={localized('/', locale)} className="inline-block bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition shadow-lg">
          {copy.cta}
        </a>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add "app/[locale]/not-found.tsx"
git commit -m "feat(routing): bilingual 404 page under app/[locale]

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 26: Full integration smoke test

**Files:** none (verification only)

- [ ] **Step 1: Restart dev cleanly**

```bash
pkill -f "next dev"; sleep 1; rm -rf .next; npm run dev &
sleep 4
```

- [ ] **Step 2: Verify all routes for both locales**

```bash
for path in / /v4 /v4/success /privacy /terms /disclosure; do
  for loc in de en; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/${loc}${path}")
    echo "${loc}${path} → ${code}"
  done
done
```
Expected: every line ends with `200`.

- [ ] **Step 3: Verify quiz routes still work (bypass list)**

```bash
for path in /v1 /v2 /v3 /quiz; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${path}")
  echo "${path} → ${code}"
done
```
Expected: every line `200`.

- [ ] **Step 4: Verify `<html lang>` is correct per locale**

```bash
curl -s http://localhost:3000/de | grep -oE '<html[^>]*lang="[^"]*"' | head -1
curl -s http://localhost:3000/en | grep -oE '<html[^>]*lang="[^"]*"' | head -1
```
Expected: `<html lang="de"` for `/de`, `<html lang="en"` for `/en`.

- [ ] **Step 5: Verify production build passes**

```bash
npm run build 2>&1 | tail -10
```
Expected: build succeeds; routes for both locales generated.

- [ ] **Step 6: No commit** (verification task only).

---

## Phase 4 — Polish (Tasks 27–29)

---

## Task 27: Add `app/sitemap.ts`

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';

const ROUTES = ['', '/v4', '/v4/success', '/privacy', '/terms', '/disclosure'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of ROUTES) {
    entries.push({
      url: `https://buildforthem.de${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          de: `https://buildforthem.de${path}`,
          en: `https://buildforthem.com${path}`,
        },
      },
    });
    entries.push({
      url: `https://buildforthem.com${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          de: `https://buildforthem.de${path}`,
          en: `https://buildforthem.com${path}`,
        },
      },
    });
  }
  return entries;
}
```

- [ ] **Step 2: Type-check + verify + commit**

```bash
npx tsc --noEmit
curl -s http://localhost:3000/sitemap.xml | head -20
git add app/sitemap.ts
git commit -m "feat(seo): add sitemap with hreflang alternates for both domains

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 28: Visual review checkpoint

**Files:** none (you review in browser).

- [ ] **Step 1: Open both locales and click through**

In browser: visit each URL and verify content + language switcher hops domains correctly.

- http://localhost:3000/de
- http://localhost:3000/en
- http://localhost:3000/de/v4
- http://localhost:3000/en/v4
- http://localhost:3000/de/v4/success
- http://localhost:3000/en/v4/success
- http://localhost:3000/de/privacy (etc.)

For each page:
- Headline language matches expected
- All section text renders without missing keys
- Hero CTA goes to /{locale}/v4
- Header anchors scroll
- Header "EN"/"DE" pill links to other production domain (in dev it points to the production URL — that's expected; the value isn't useful locally but is correct for production)

- [ ] **Step 2: If anything is off, fix and commit per affected file.**

- [ ] **Step 3: No code commit if everything looks right.**

---

## Task 29: Production build verification

**Files:** none.

- [ ] **Step 1: Full production build**

```bash
pkill -f "next dev"; sleep 1
rm -rf .next
npm run build 2>&1 | tail -25
```
Expected: build succeeds. Output shows static routes generated for both `/de/...` and `/en/...`.

- [ ] **Step 2: Push commits**

```bash
git push origin main 2>&1 | tail -5
```

---

## Task 30: Manual user steps — Vercel and DNS

**Files:** none — you do this in dashboards.

These steps happen outside the repo. The implementer cannot do these for you.

- [ ] **Step 1: Vercel — add `buildforthem.com` domain**

1. Open the Vercel dashboard, select the `info-operator-recruitment` project
2. Settings → Domains
3. Click "Add" → enter `buildforthem.com` → Add
4. Vercel will show DNS instructions specific to your domain registrar — note the values it gives you

- [ ] **Step 2: Vercel — add `buildforthem.de` domain**

Same as above with `buildforthem.de`.

- [ ] **Step 3: DNS — point both domains at Vercel**

At your domain registrar (GoDaddy, Cloudflare, Namecheap, etc.) for each domain, set one of:
- **Apex record:** A record pointing to `76.76.21.21` (Vercel's anycast IP), OR
- **CNAME:** for `www.` subdomain, point to `cname.vercel-dns.com`

Use whatever Vercel's UI specifically instructs (it adapts to your apex/subdomain setup).

- [ ] **Step 4: Verify SSL provisions automatically**

Vercel auto-provisions SSL certificates via Let's Encrypt within a few minutes of DNS propagation. Status visible in Vercel → Domains.

- [ ] **Step 5: Verify both domains serve correctly**

- Visit `https://buildforthem.de` → expect German homepage with `<html lang="de">`
- Visit `https://buildforthem.com` → expect English homepage with `<html lang="en">`

- [ ] **Step 6: Verify quiz funnels still work**

- Visit `https://buildforthem.de/v1` → expect English quiz (bypassed by middleware)
- Visit `https://buildforthem.com/v1` → same

- [ ] **Step 7: Submit sitemaps to Google Search Console (optional)**

Add both domains to Google Search Console as separate properties. Submit `https://buildforthem.de/sitemap.xml` and `https://buildforthem.com/sitemap.xml`.

---

## Spec coverage check

| Spec section | Plan task(s) |
|---|---|
| 3.1 Directory structure | Tasks 20–25 (all migrations) |
| 3.2 Routing (same slugs, internal `/locale/` rewrite) | Task 7 (middleware) + Tasks 20–25 |
| 3.3 Middleware logic | Task 7 |
| 3.4 Dictionary system | Tasks 1–5 |
| 3.5 Component refactor pattern | Tasks 8–19 |
| 3.6 Page composition (`[locale]/layout.tsx` + `page.tsx`) | Tasks 20, 21 |
| 3.7 Language switcher | Task 8 (in Header) |
| 3.8 Non-translated items (calendar, photo, email) | Acknowledged in Header (Task 8) and Calendar (Task 17) — unchanged |
| 3.9 Vercel / DNS | Task 30 |
| 3.10 SEO (hreflang) | Tasks 20 (metadata) + 27 (sitemap) |
| 3.11 `/v4` translation strategy | Task 22 |
| 3.12 Legal pages | Task 24 |
| 4 Data flow | Verified in Task 26 |
| 5 Migration / file mapping | Tasks 20–25 |
| 6 Edge cases (bypass, 404, switcher) | Task 7 (bypass), Task 25 (404), Task 8 (switcher) |
| 7 Out of scope | Quizzes excluded via middleware bypass — Task 7 |
| 8 Success criteria | Verified in Task 26 (smoke test), Task 28 (visual), Task 29 (build) |

---

## Follow-up scope (not in this plan)

These items came up during the session but belong in separate brainstorms:

1. **Lead-capture popup** for "Kostenloses Training sichern" / "Get free training" CTA. Currently the CTA navigates to `/v4`; user wants it to open an email-capture modal first, then either route to `/v4` or unlock the video inline after capture. Touches Hero + Trainer + ValueLadder + GuaranteeScarcity CTAs and `/v4` itself. Needs its own brainstorm.
2. **Calendar bilingualism:** the Google Calendar embed is a single German booking link. Future improvement: separate calendars per locale or use `&hl=en` parameter.
3. **EUR → USD on the English version:** dictionary currently keeps EUR for both. Worth A/B-testing English-market revenue figures in USD.
4. **Localized URL slugs** (`/datenschutz`, `/agb`, `/impressum` on `.de`): deferred to a future iteration; current spec uses shared English slugs.

---

*End of bilingual implementation plan.*
