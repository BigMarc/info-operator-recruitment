# BuildForThem Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `app/page.tsx` into a German-language 10-section conversion funnel for aspiring Growth Partners, applying Propaganda Playbook techniques in the existing black + gold brand CI.

**Architecture:** Each homepage section is a self-contained React client component under `components/`. `app/page.tsx` imports and composes them in order. No new dependencies — uses existing Next.js 14 / TypeScript / Tailwind / Framer Motion stack. Three existing components (`SocialProof`, `About`, `CTASection`) are deleted after their content is redistributed.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion 11. No test framework is configured in this project — verification per task is via `npx tsc --noEmit` (type check), `npm run lint`, and visual inspection in the dev server (`npm run dev` on http://localhost:3000).

**Reference spec:** [`docs/superpowers/specs/2026-05-27-homepage-redesign-design.md`](../specs/2026-05-27-homepage-redesign-design.md)

**Brand CI (locked):** `#000000` primary · `#FFB200` accent gold · `#E69D00` accent-dark · `Inter` font. All these are already configured in `tailwind.config.ts` as `text-accent`, `bg-accent`, etc.

**Defaults used for spec Open Questions** (override in code if you have better values):
- Marc's quote: *"Mein Ziel: Menschen vom Gehalts-Spiel ins Beteiligungs-Spiel bringen."*
- Testimonials dropped: "Lisa Johnson (Teacher)" and "Jessica Park (Health Coach)" — keep 6
- Scarcity counter: 7 von 10 Plätzen
- Cohort start: "in 14 Tagen" (relative, no fixed date)

---

## Task 0: Pre-flight — verify dev server runs cleanly

**Files:** none (just verification)

- [ ] **Step 1: Install deps (if not already)**

Run: `npm install`
Expected: completes without errors.

- [ ] **Step 2: Start dev server in background, then verify**

Run: `npm run dev` (in a separate terminal or `run_in_background`)
Open: http://localhost:3000
Expected: current English homepage renders without console errors.

- [ ] **Step 3: Type-check baseline**

Run: `npx tsc --noEmit`
Expected: zero errors. If errors exist, fix them before proceeding (they will block every later task).

- [ ] **Step 4: Lint baseline**

Run: `npm run lint`
Expected: zero errors. Warnings OK.

- [ ] **Step 5: Stop the dev server before next task** (or leave running and refresh between tasks).

---

## Task 1: Update `app/layout.tsx` (German lang + meta)

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the file with German metadata**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growth Partner Ausbildung — BuildForThem',
  description: 'Werde Growth Partner und verdiene 5.000–20.000 € pro Creator-Kunde. Komplette Ausbildung, Creator-Matching, 5K-Garantie in 90 Tagen.',
  keywords: 'growth partner, creator backend, info produkt, online business, revenue share, ortsunabhängig, ausbildung',
  authors: [{ name: 'Marc Schultheiss' }],
  openGraph: {
    title: 'Growth Partner Ausbildung — BuildForThem',
    description: 'Werde Growth Partner und verdiene 5.000–20.000 € pro Creator-Kunde. Komplette Ausbildung, Creator-Matching, 5K-Garantie in 90 Tagen.',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 3: Visual check**

Refresh http://localhost:3000 and inspect the document `<html lang="de">` and tab title in browser dev tools.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): switch to German lang and meta tags"
```

---

## Task 2: Translate `components/Header.tsx` to German

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Replace the file**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="/" className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#methode" className="text-gray-700 hover:text-black font-semibold transition">
              Methode
            </a>
            <a href="#stories" className="text-gray-700 hover:text-black font-semibold transition">
              Operator-Stories
            </a>
            <a href="#faq" className="text-gray-700 hover:text-black font-semibold transition">
              FAQ
            </a>
            <a
              href="/v4"
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              Kostenloses Training
            </a>
          </motion.nav>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
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
              <a href="#methode" className="text-gray-700 hover:text-black font-semibold transition" onClick={() => setIsMenuOpen(false)}>
                Methode
              </a>
              <a href="#stories" className="text-gray-700 hover:text-black font-semibold transition" onClick={() => setIsMenuOpen(false)}>
                Operator-Stories
              </a>
              <a href="#faq" className="text-gray-700 hover:text-black font-semibold transition" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </a>
              <a
                href="/v4"
                className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Kostenloses Training
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Visual check**

Refresh http://localhost:3000. Header shows: BuildForThem logo, "Methode / Operator-Stories / FAQ / Kostenloses Training" buttons. Anchor links won't scroll yet (target sections don't exist) — that's fine.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx
git commit -m "feat(header): translate navigation to German"
```

---

## Task 3: Translate `components/Footer.tsx` to German + fix dead anchors

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace the file**

(Removes `#social-proof` anchor — that component will be deleted. Updates `#about` → `#methode`.)

```tsx
'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-black text-white mb-4">
              Build<span className="text-accent">ForThem</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Wir bilden Growth Partners aus, die das Backend für etablierte Content Creator bauen.
              Komplette Ausbildung, Creator-Matching und laufende Unterstützung.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@tgn-media.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="E-Mail">
                <span className="text-white">📧</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Links</h4>
            <ul className="space-y-3">
              <li><a href="#methode" className="text-gray-300 hover:text-accent transition">Methode</a></li>
              <li><a href="#stories" className="text-gray-300 hover:text-accent transition">Operator-Stories</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-accent transition">FAQ</a></li>
              <li><a href="/v4" className="text-gray-300 hover:text-accent transition">Kostenloses Training</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-300 hover:text-accent transition">Datenschutz</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-accent transition">AGB</a></li>
              <li><a href="/disclosure" className="text-gray-300 hover:text-accent transition">Impressum</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-white mb-4">TGN Media LLC</h4>
              <div className="text-gray-300 space-y-2">
                <p>1309 Coffeen Avenue STE 1200</p>
                <p>Sheridan, Wyoming 82801</p>
                <p>United States of America</p>
                <p className="mt-4">
                  <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-light transition">
                    info@tgn-media.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">5K-Garantie</h4>
              <p className="text-gray-300">
                Verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Creator-Kunden,
                bekommst du 100 % deiner Ausbildungsgebühr zurück. Schriftlich. Ohne Wenn und Aber.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2026 TGN Media LLC. Alle Rechte vorbehalten. |
            <span className="text-accent font-semibold"> Growth Partner Ausbildung</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Visual check**

Scroll to bottom of http://localhost:3000. Footer is German.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat(footer): translate to German, drop dead #social-proof anchor"
```

---

## Task 4: Rewrite `components/Hero.tsx` (German, Propaganda-Playbook structure)

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Replace the file**

```tsx
'use client';

import { motion } from 'framer-motion';

export default function Hero() {
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
          {/* Gold pill tag */}
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Growth Partner Ausbildung
          </span>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
            Gehalt ist die langsame Spur.
            <br />
            Werde Growth Partner und verdiene{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent inline-block">
              5.000–20.000 €
            </span>
            <br />
            pro Creator-Kunde.
          </h1>

          {/* Subheadline */}
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 font-bold leading-relaxed">
              Wir bilden dich aus. Wir matchen dich mit geprüften Content Creators.
              Du baust ihr Backend — und kassierst Revenue-Share auf jeden Launch.
            </p>

            {/* Price marinade / guarantee bar */}
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-4 rounded-full border-2 border-accent/20 mb-2">
              <span className="text-accent font-bold text-lg">💰</span>
              <span className="text-black font-bold text-base sm:text-lg">
                <span className="text-accent font-black">5.000 €</span> in <span className="text-accent font-black">90 Tagen</span> oder <span className="text-accent font-black">100 %</span> Geld zurück — schriftlich garantiert.
              </span>
            </div>
          </div>

          {/* VSL placeholder */}
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
                  <p className="text-black font-bold text-lg">60-Min Training ansehen</p>
                  <p className="text-gray-600 text-sm">Methode, Geschäftsmodell, echte Zahlen</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="/v4"
              className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden glow-animation"
            >
              <span className="relative z-10 flex items-center gap-3">
                Kostenloses Training sichern
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </a>
            <a
              href="#methode"
              className="group px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Wie funktioniert das?
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </motion.div>

          {/* Social Proof Stats — 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: '50+', label: 'Aktive Growth Partners', sub: 'Im Netzwerk' },
              { value: '1,2 Mio. €+', label: 'An Partners ausgezahlt', sub: 'Revenue-Share', highlight: true },
              { value: '90 %', label: 'Vermittlungsquote', sub: 'Matching-Erfolg' },
              { value: '8 Jahre', label: 'Bewährtes System', sub: 'Seit 2018' },
            ].map((stat, i) => (
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

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Visual check**

Refresh http://localhost:3000. Hero shows German headline, gold pill tag, VSL placeholder, two CTAs, 4-column stat bar. Mobile: stats collapse to 2 columns.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat(hero): German rewrite with price-marinade bar and 4-col proof"
```

---

## Task 5: Create `components/ProblemAgitation.tsx` (NEW)

**Files:**
- Create: `components/ProblemAgitation.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { motion } from 'framer-motion';

const PAIN_POINTS = [
  {
    icon: '💸',
    title: 'Abhängig von einem einzigen Gehalt',
    body: 'Du tauschst Zeit gegen Geld. Wenn du nicht arbeitest, verdienst du nichts. Eine Kündigung — und alles ist weg.',
  },
  {
    icon: '⚙️',
    title: 'Skills, aber keine Kunden',
    body: 'Du kannst Marketing, Funnels oder Verkauf. Aber wer bezahlt dich dafür? Cold Outreach kostet Monate ohne Garantie.',
  },
  {
    icon: '📉',
    title: 'Angst vor dem Sprung ins Nichts',
    body: 'Selbstständigkeit ohne Sicherheit klingt wie Roulette. Du willst springen — aber nicht ohne Netz.',
  },
];

export default function ProblemAgitation() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Decorative gold blur */}
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
            Die Situation
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Fühlst du dich beruflich{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              ausgebremst
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Drei Sackgassen kennt fast jeder, der mehr will als sein Gehalt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="bg-accent/5 rounded-2xl p-8 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-6">{point.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-accent-dark mb-4 leading-tight">
                {point.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Visual check (temporary import)**

To preview, temporarily import in `app/page.tsx` right after `<Hero />`:
```tsx
import ProblemAgitation from '@/components/ProblemAgitation';
// inside <main>: <ProblemAgitation />
```
Refresh page, verify 3 pain cards render. Then revert the temporary import — `app/page.tsx` gets fully rewritten in Task 14.

(Alternative: skip the visual preview here and let Task 14 verify all sections together.)

- [ ] **Step 4: Commit**

```bash
git add components/ProblemAgitation.tsx
git commit -m "feat(homepage): add ProblemAgitation section with 3 pain cards"
```

---

## Task 6: Create `components/Reframe.tsx` (NEW)

**Files:**
- Create: `components/Reframe.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { motion } from 'framer-motion';

export default function Reframe() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Decorative gold blurs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left — long-form body (2/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
              Die Wende
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Hör auf, dein Gehalt zu erhöhen.
              <br />
              Fang an, an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                Umsatz beteiligt
              </span>{' '}
              zu sein.
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Die wohlhabendsten Menschen der Welt verdienen <strong className="text-white">kein Gehalt</strong>. Sie haben <strong className="text-accent">Beteiligung</strong>.
              </p>
              <p>
                Content Creator haben das, was Geld wert ist: <strong className="text-white">Aufmerksamkeit</strong>. Was ihnen fehlt — jemand, der diese Aufmerksamkeit in ein Produkt-Backend übersetzt: Offer, Funnel, Automation, Launch.
              </p>
              <p>
                Genau das macht ein <strong className="text-accent">Growth Partner</strong>. Du baust für sie. Du wirst nicht bezahlt wie ein Angestellter — du bekommst <strong className="text-white">20–50 % vom Umsatz</strong>, den du erzeugst.
              </p>
              <p>
                Ein guter Creator-Kunde = <strong className="text-accent">5.000–20.000 €</strong> pro Launch. Drei Kunden = ein Vollzeit-Einkommen. Ortsunabhängig. Ohne Boss. Ohne Decke.
              </p>
            </div>
          </motion.div>

          {/* Right — belief-swap card (1/3 width on desktop) */}
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
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Alte Überzeugung</span>
                </div>
                <p className="text-white text-lg italic leading-relaxed">
                  &ldquo;Mehr verdienen = besser bezahlt werden.&rdquo;
                </p>
              </div>
              <div className="border-t border-accent/30 pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Neue Überzeugung</span>
                </div>
                <p className="text-white text-lg italic leading-relaxed">
                  &ldquo;Mehr verdienen = an Umsatz beteiligt sein, den du erzeugst.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/Reframe.tsx
git commit -m "feat(homepage): add Reframe section (black bg, belief-swap card)"
```

---

## Task 7: Create `components/Method.tsx` (NEW — split from About)

**Files:**
- Create: `components/Method.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '50+', label: 'Aktive Growth Partners', sub: 'Vertrauen bereits auf das System' },
  { value: '4 Schritte', label: 'Erprobte Methode', sub: 'Bewährt seit 2018' },
  { value: 'Komplett', label: 'Alle Tools inklusive', sub: 'Vorlagen, Funnels, Skripte, Verträge' },
  { value: '90 Tage', label: 'Bis zum ersten Kunden', sub: 'Bis 5K-Garantie greift' },
];

const STEPS = [
  { num: 1, title: 'System lernen', body: 'Komplette Ausbildung: Offer-Creation, Funnels, Automation, Launches.' },
  { num: 2, title: 'Werkzeuge meistern', body: 'Hands-on mit unseren Vorlagen, Skripten und Plattformen.' },
  { num: 3, title: 'Mit Creator gematcht', body: 'Wir verbinden dich mit geprüften Influencern, die einen Growth Partner brauchen.' },
  { num: 4, title: 'Revenue-Share kassieren', body: '20–50 % vom Umsatz, den du erzeugst. Ohne Decke.' },
];

export default function Method() {
  return (
    <section id="methode" className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Die Methode
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Was ist die{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth Partner Methode
            </span>
            ?
          </h2>
        </motion.div>

        {/* Hero card — two columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-2xl border-2 border-accent/10 overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Ein <strong className="text-black">4-Schritte-System</strong>, das jemanden ohne eigene Kundenbasis zum festen Backend-Operator für etablierte Content Creator macht.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                Lernzeit: <strong>4–6 Wochen</strong>. Danach matchen wir dich mit deinen ersten zahlenden Creator-Kunden.
              </p>
              {/* Avatar strip */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['MS', 'JR', 'EK', 'DM'].map((initials) => (
                    <div
                      key={initials}
                      className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center text-xs font-bold border-2 border-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Über <strong className="text-accent">50+ Zufriedene</strong> Growth Partners
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-[300px] lg:min-h-full flex items-center justify-center p-8">
              <img
                src="/marc-schultheiss.jpg"
                alt="Marc Schultheiss — Growth Partner Trainer"
                className="rounded-2xl shadow-xl w-full max-w-sm object-cover aspect-square"
              />
            </div>
          </div>
        </motion.div>

        {/* 4 stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-accent mb-2">{stat.value}</div>
              <div className="text-black font-bold text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* 4-step process strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-black text-lg">{step.num}</span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/Method.tsx
git commit -m "feat(homepage): add Method section (methodology + 4 stats + 4 steps)"
```

---

## Task 8: Create `components/Trainer.tsx` (NEW — split from About)

**Files:**
- Create: `components/Trainer.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { motion } from 'framer-motion';

const CREDENTIALS = [
  {
    icon: '📈',
    title: 'Track Record',
    body: '8 Jahre Aufbau von Creator-Backend-Systemen',
  },
  {
    icon: '🏆',
    title: 'Ausbildungsergebnisse',
    body: '50+ aktive Absolventen mit eigenen Creator-Kunden',
  },
  {
    icon: '💰',
    title: 'Bewiesener Umsatz',
    body: '1,2 Mio. €+ an Growth Partners ausgezahlt',
  },
];

export default function Trainer() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Dein Ausbilder für{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth-Partner-Business
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Gründer von BuildForThem, Growth-Partner-Trainer, Experte für Creator-Backend-Strategie.
          </p>
        </motion.div>

        {/* Split card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-2xl overflow-hidden shadow-2xl border-2 border-accent/10 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — info */}
            <div className="p-8 md:p-12">
              <h3 className="text-4xl font-black text-accent mb-6">Marc Schultheiss</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Marc hat in den letzten 8 Jahren über 50 Growth Partners ausgebildet,
                die heute mit etablierten Content Creators arbeiten. Sein BuildForThem-System
                hat über <strong className="text-black">1,2 Mio. € Revenue-Share</strong> für seine Partner generiert.
              </p>
              <div className="space-y-5">
                {CREDENTIALS.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{c.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black mb-1">{c.title}</h4>
                      <p className="text-gray-600 text-sm">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — photo + quote overlay */}
            <div className="relative bg-black min-h-[400px] lg:min-h-full">
              <img
                src="/marc-schultheiss.jpg"
                alt="Marc Schultheiss"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg italic leading-relaxed mb-3 border-l-4 border-accent pl-4">
                  &ldquo;Mein Ziel: Menschen vom Gehalts-Spiel ins Beteiligungs-Spiel bringen.&rdquo;
                </p>
                <p className="text-accent font-bold text-xl pl-4">— Marc Schultheiss</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/v4"
            className="inline-flex items-center gap-3 bg-accent text-black px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-accent-dark transition-all transform hover:scale-105"
          >
            Kostenloses Training sichern
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/Trainer.tsx
git commit -m "feat(homepage): add Trainer section (Marc credentials + B&W photo)"
```

---

## Task 9: Rewrite `components/Testimonials.tsx` (German + drop 2)

**Files:**
- Modify: `components/Testimonials.tsx`

- [ ] **Step 1: Replace the file** (drops Lisa Johnson and Jessica Park, translates the remaining 6 to German, replaces job titles with German equivalents)

```tsx
'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    background: 'Ehemals Marketing Managerin',
    clients: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    quote:
      'Ich war skeptisch, meinen Konzernjob zu kündigen. Marcs Ausbildung hat mir alles gegeben, was ich brauchte. Heute habe ich 8 Creator-Kunden und 45.000 € Jahresumsatz. Das Matching-System ist Gold wert.',
    result: '45.000 € Jahresumsatz',
    before: 'Marketing im Konzern',
    after: 'Eigenes Growth-Partner-Business',
  },
  {
    name: 'Marcus Rodriguez',
    background: 'Ehemals Freelancer',
    clients: 12,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote:
      'Die Arbeit mit Marc hat mein Freelance-Geschäft transformiert. Von schwankenden 3K-Monaten zu 68.000 € Jahresumsatz als Growth Partner. Die Ausbildung und das Matching haben den Unterschied gemacht.',
    result: '68.000 € Jahresumsatz',
    before: '3K/Monat freelance',
    after: '68K Growth Partner',
  },
  {
    name: 'Emma Thompson',
    background: 'Ehemals Vertriebsmitarbeiterin',
    clients: 6,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote:
      'Der Lifestyle-Creator-Launch hat alle Erwartungen übertroffen. 28K in der ersten Woche! Marcs Team hat alles übernommen — Sales Pages, E-Mail-Sequenzen, alles. Allein hätte ich das nie geschafft.',
    result: '32.000 € Jahresumsatz',
    before: 'Vertriebs-Provision',
    after: 'Planbares Operator-Einkommen',
  },
  {
    name: 'David Kim',
    background: 'Ehemals Berater',
    clients: 15,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote:
      'Als Berater hätte ich nie gedacht, dass ich Gaming-Creatoren helfe, Produkte zu launchen. Marc hat mich überzeugt — mit einem 55K-Launch beim ersten Kunden. Die Marketing-Automation-Trainings sind unschlagbar.',
    result: '89.000 € Jahresumsatz',
    before: 'Stunden-Beratung',
    after: 'High-Ticket Operator-Services',
  },
  {
    name: 'Alex Rivera',
    background: 'Ehemals Ingenieur',
    clients: 10,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote:
      'Der KI-Kurs-Launch war der Gamechanger. 31K im ersten Monat mit minimalem Aufwand. Marcs System macht die Arbeit — ich liefere nur den Mehrwert.',
    result: '58.000 € Jahresumsatz',
    before: 'Ingenieurs-Gehalt',
    after: 'Passives Operator-Einkommen',
  },
  {
    name: 'Ryan Mitchell',
    background: 'Ehemals Fotograf',
    clients: 9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    quote:
      'Der Foto-Kurs-Launch war unglaublich — 38K im ersten Monat. Marcs Team hat so überzeugende Sales-Copy und Marketing-Materialien gebaut. Klare Empfehlung.',
    result: '52.000 € Jahresumsatz',
    before: 'Foto-Aufträge',
    after: 'Digital-Produkt-Operator',
  },
];

const AGGREGATE_STATS = [
  { value: '344.000 €', label: 'Gesamt-Umsatz', sub: 'Aus 6 Operators oben' },
  { value: '57.000 €', label: 'Ø Umsatz', sub: 'Pro Operator' },
  { value: '90 %', label: 'Vermittlung', sub: 'Match-Erfolgsquote' },
  { value: '35 %', label: 'Ø Beteiligung', sub: 'Operator-Profit-Share' },
];

export default function Testimonials() {
  return (
    <section id="stories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Echte Ergebnisse
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Was unsere{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth Partners
            </span>{' '}
            verdienen
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Vom Marketing Manager zur 45K-Operatorin. Vom Freelancer zum 68K-Operator.
            Echte Menschen, dokumentierte Zahlen.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="text-lg font-bold text-black">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.background}</p>
                  <p className="text-accent font-semibold text-sm">{t.clients} Creator-Kunden</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic flex-grow">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Ergebnis:</span>
                  <span className="text-accent font-bold text-lg">{t.result}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Vorher: {t.before}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-700 font-semibold">{t.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border-2 border-accent/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {AGGREGATE_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black text-accent mb-2">{s.value}</div>
                <div className="text-black font-bold text-sm">{s.label}</div>
                <div className="text-gray-600 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat(testimonials): translate to German, keep 6 strongest, add aggregate strip"
```

---

## Task 10: Create `components/ValueLadder.tsx` (NEW)

**Files:**
- Create: `components/ValueLadder.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: 1,
    title: 'Kostenloses Training (heute)',
    body: '60-Min Video. Methode, Geschäftsmodell, echte Zahlen. Kein Vorwissen nötig.',
    price: '0 €',
    cta: 'Training starten',
    href: '/v4',
    offset: 'lg:translate-y-12',
  },
  {
    num: 2,
    title: 'Strategie-Call (innerhalb 7 Tagen)',
    body: '30 Min Zoom. Wir prüfen, ob du passt. Du prüfst, ob wir passen.',
    price: '0 €',
    cta: 'Call buchen',
    href: '#kalender',
    offset: 'lg:translate-y-6',
  },
  {
    num: 3,
    title: 'Growth Partner Programm (4–6 Wochen)',
    body: 'Komplette Ausbildung + Matching mit deinem ersten Creator-Kunden. Investition wird im Call besprochen — durch die 5K-Garantie abgesichert.',
    price: 'Im Call',
    cta: 'Mehr im Call',
    href: '#kalender',
    offset: 'lg:translate-y-0',
  },
];

export default function ValueLadder() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Dein Weg
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">3 Schritte.</span>
            <br />
            Vom Klick bis zum ersten Creator-Kunden.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className={`${step.offset} bg-white rounded-2xl p-8 border-2 border-accent/20 shadow-xl hover:shadow-2xl transition-all flex flex-col`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent text-black font-black text-2xl flex items-center justify-center shadow-lg">
                  {step.num}
                </div>
                <div className="text-right ml-auto">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Preis</div>
                  <div className="text-xl font-black text-accent">{step.price}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 leading-snug">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{step.body}</p>
              <a
                href={step.href}
                className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
              >
                {step.cta} →
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/v4"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all transform hover:scale-105"
          >
            Schritt 1 starten
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/ValueLadder.tsx
git commit -m "feat(homepage): add ValueLadder section (3 ascending steps)"
```

---

## Task 11: Create `components/GuaranteeScarcity.tsx` (NEW)

**Files:**
- Create: `components/GuaranteeScarcity.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { motion } from 'framer-motion';

export default function GuaranteeScarcity() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">Maximal abgesichert.</span>
            <br />
            Minimal verfügbar.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Left — gold guarantee card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-accent to-accent-dark text-black rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-3xl font-black mb-4">5.000 € in 90 Tagen</h3>
            <p className="text-black/90 leading-relaxed text-lg">
              Verdienst du in 90 Tagen nicht mindestens <strong>5.000 €</strong> mit deinem ersten Creator-Kunden,
              bekommst du <strong>100 % deiner Ausbildungsgebühr zurück</strong>.
            </p>
            <p className="text-black/80 mt-4 font-semibold">
              Schriftlich. Ohne Wenn und Aber.
            </p>
          </motion.div>

          {/* Right — black scarcity card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 md:p-10 shadow-2xl border-2 border-accent/30"
          >
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-3xl font-black mb-4">
              <span className="text-accent">7 von 10</span> Plätzen verfügbar
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Wir nehmen maximal <strong className="text-white">10 neue Growth Partners</strong> pro Monat auf —
              damit jeder gematcht wird.
            </p>
            <p className="text-gray-400 mt-4 font-semibold">
              Aktuelle Kohorte startet in 14 Tagen.
            </p>
          </motion.div>
        </div>

        <div className="text-center">
          <a
            href="#kalender"
            className="inline-flex items-center gap-3 bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 glow-animation"
          >
            Platz sichern
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/GuaranteeScarcity.tsx
git commit -m "feat(homepage): add GuaranteeScarcity section (gold guarantee + black scarcity)"
```

---

## Task 12: Create `components/FAQ.tsx` (NEW)

**Files:**
- Create: `components/FAQ.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    q: 'Für wen ist die Growth Partner Ausbildung geeignet?',
    a: 'Für Menschen mit beruflicher Vorerfahrung (Marketing, Vertrieb, Beratung, Freelancing, Engineering), die ein zweites Standbein oder eine vollständige Selbstständigkeit aufbauen wollen — ohne eigene Kundenakquise. Vorerfahrung in Marketing hilft, ist aber kein Muss. Das System ist so aufgebaut, dass du in 4–6 Wochen die Kernfähigkeiten lernst.',
  },
  {
    q: 'Wie funktioniert das Creator-Matching genau?',
    a: 'Nach Abschluss deiner Ausbildung stellen wir dir Content Creator aus unserem Netzwerk vor, die bereits eine Audience aufgebaut haben, aber noch kein Produkt-Backend besitzen. Du führst Erstgespräche, prüfst Passung in beide Richtungen, und arbeitest dann auf Revenue-Share-Basis (20–50 % je nach Setup).',
  },
  {
    q: 'Wie viel Zeit muss ich pro Woche investieren?',
    a: 'Während der 4–6-wöchigen Ausbildung rechne mit 8–12 Stunden pro Woche. Nach der Ausbildung skaliert der Aufwand mit deiner Kundenanzahl: 1 Creator-Kunde = etwa 10–15 Std/Woche; 3 Kunden = grob ein Vollzeitäquivalent.',
  },
  {
    q: 'Brauche ich Vorerfahrung in Marketing oder Verkauf?',
    a: 'Nein — aber strukturiertes Denken hilft. Die Methode bringt dir alle Schritte bei: Offer-Creation, Funnels, Automation, Launch-Mechanik, Closing. Über die Hälfte unserer aktiven Growth Partners hatte vorher keine Marketing-Rolle.',
  },
  {
    q: 'Was kostet das Programm — und warum steht der Preis nicht hier?',
    a: 'Den Preis besprechen wir im Strategie-Call, weil er von deinem Setup abhängt (z. B. Zahlweise, Coaching-Tier, ob du sofort startest oder eine spätere Kohorte). Die 5K-Garantie deckt dein Risiko vollständig: verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Kunden, erhältst du 100 % zurück.',
  },
  {
    q: 'Wie schnell sind erste Einnahmen realistisch?',
    a: 'Die durchschnittliche Zeit vom Programmstart bis zum ersten zahlenden Creator-Kunden liegt bei ca. 90 Tagen. Schnellere Partner schaffen es in 30–45 Tagen; langsamere brauchen 4–5 Monate. Das hängt von deiner Umsetzungsgeschwindigkeit ab.',
  },
  {
    q: 'Ist das Modell wirklich ortsunabhängig?',
    a: 'Ja. Die gesamte Arbeit läuft remote: Calls mit Creatoren per Zoom, Funnel-Aufbau in Web-Tools (z. B. ClickFunnels, ActiveCampaign), Launch-Koordination per Slack/Notion. Mehrere unserer Growth Partners arbeiten aus Bali, Lissabon und Mexico City.',
  },
  {
    q: 'Was passiert, wenn ich nach 90 Tagen keinen Kunden habe?',
    a: 'Greift die 5.000-€-in-90-Tagen-Garantie — du bekommst 100 % deiner Ausbildungsgebühr zurück. Bedingung: nachweisbare Umsetzung der im Programm vermittelten Schritte (Modul-Abschlüsse, Outreach-Logs). Wir haben den Anspruch, dass jeder Partner mindestens diesen Schwellwert erreicht; alle bisherigen Garantie-Fälle wurden ohne Diskussion ausgezahlt.',
  },
];

export default function FAQ() {
  // First question pre-expanded for visual cue
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Häufige{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Fragen
            </span>
          </h2>
          <p className="text-xl text-gray-700">
            Alle wichtigen Fragen & Antworten auf einen Blick.
          </p>
        </motion.div>

        <div className="space-y-4">
          {QUESTIONS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-white rounded-2xl border-2 border-accent/10 shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-accent/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <span className="text-lg md:text-xl font-bold text-black">{item.q}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center text-xl font-bold transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat(homepage): add FAQ accordion (8 questions, keyboard-accessible)"
```

---

## Task 13: Rewrite `components/CalendarEmbed.tsx` (German final close)

**Files:**
- Modify: `components/CalendarEmbed.tsx`

- [ ] **Step 1: Replace the file**

(Keeps the same Google Calendar `src`, restructures as the final close, uses `id="kalender"` to match anchor links from ValueLadder and GuaranteeScarcity.)

```tsx
'use client';

import { motion } from 'framer-motion';

const CALL_BENEFITS = [
  {
    num: 1,
    title: 'Programm-Übersicht',
    body: 'Was du in 4–6 Wochen lernst und wie das Matching funktioniert.',
  },
  {
    num: 2,
    title: 'Dein Setup-Check',
    body: 'Wir prüfen, ob dein Profil zu unseren Creator-Kunden passt.',
  },
  {
    num: 3,
    title: 'Verdienst-Potenzial',
    body: 'Realistische Erwartung für deinen ersten, dritten und zwölften Monat.',
  },
  {
    num: 4,
    title: 'Investition & Garantie',
    body: 'Transparente Preisübersicht und die schriftliche 5K-Garantie.',
  },
];

export default function CalendarEmbed() {
  return (
    <section id="kalender" className="py-20 bg-gradient-to-br from-accent/5 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Ein letzter Schritt.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Buche deinen Strategie-Call.
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            30 Minuten Zoom. Wir prüfen gemeinsam, ob die Growth Partner Ausbildung
            der nächste richtige Schritt für dich ist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calendar embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-accent/10">
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0PhisTFQ39uvL2tQkbo4U0xBOm5z5zUWQXHM6acjIAvomo6fxmFR7XjurJutBp3k0xSigSuQr3?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Strategie-Call Buchung"
                />
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl md:text-3xl font-black text-black mb-8">
              Was du im Call bekommst:
            </h3>
            <div className="space-y-6">
              {CALL_BENEFITS.map((b) => (
                <div key={b.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-black">{b.num}</span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-black mb-1">{b.title}</h4>
                    <p className="text-gray-700">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-accent/10 rounded-xl border border-accent/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent text-2xl">⚡</span>
                <h4 className="text-lg font-bold text-black">Nur noch 7 von 10 Plätzen</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Aktuelle Kohorte startet in 14 Tagen. Wir nehmen maximal 10 neue Growth Partners pro Monat auf.
              </p>
            </div>

            <div className="mt-6 text-center lg:text-left">
              <a
                href="mailto:info@tgn-media.com"
                className="text-accent hover:text-accent-dark font-semibold underline underline-offset-4"
              >
                Lieber per E-Mail? → info@tgn-media.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/CalendarEmbed.tsx
git commit -m "feat(calendar): rewrite as final-close section with German call benefits"
```

---

## Task 14: Rewrite `app/page.tsx` + delete dead components

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/SocialProof.tsx`
- Delete: `components/About.tsx`
- Delete: `components/CTASection.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
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
  return (
    <main className="min-h-screen">
      <Header />
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

- [ ] **Step 2: Delete the three dead components**

Run:
```bash
git rm components/SocialProof.tsx components/About.tsx components/CTASection.tsx
```
Expected: files staged for deletion. (If any other file in the repo still imports them, build will fail in Step 3 — search with `grep -r "from '@/components/About'" .` etc. and fix imports.)

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: zero errors. If you get "module not found", a stale import still references a deleted component.

- [ ] **Step 4: Visual check — full page**

Refresh http://localhost:3000. Scroll top-to-bottom and verify all 10 sections render in this order:
1. Hero (German, VSL placeholder, gold guarantee bar, 4-col stats)
2. ProblemAgitation (3 gold-tinted pain cards)
3. Reframe (black background, belief-swap card on right)
4. Method (`#methode` anchor — Header link should scroll here)
5. Trainer (Marc photo B&W with quote overlay)
6. Testimonials (`#stories` — 6 cards, aggregate strip)
7. ValueLadder (3 ascending step cards on desktop)
8. GuaranteeScarcity (gold + black cards)
9. FAQ (`#faq` — accordion, Q1 pre-expanded)
10. CalendarEmbed (`#kalender` — Google Calendar iframe + benefits)
11. Footer (German)

Test in browser:
- Header anchors (Methode / Operator-Stories / FAQ) scroll to correct sections
- "Platz sichern" CTA in GuaranteeScarcity scrolls to CalendarEmbed
- Mobile breakpoint (375px): all sections stack cleanly, no horizontal scroll
- FAQ: clicking another question collapses Q1 and opens the new one; Enter/Space toggle the focused button

- [ ] **Step 5: Run production build**

Run: `npm run build`
Expected: build succeeds with no errors. (Warnings about Image component are OK — we use `<img>` for simplicity; can be upgraded to `next/image` later.)

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat(homepage): wire up 10-section German funnel, delete dead components"
```

---

## Task 15: Final QA + polish pass

**Files:** none (verification + small fixes only)

- [ ] **Step 1: Console-clean check**

Open http://localhost:3000 in browser, open DevTools Console. Reload. Expected: zero errors, zero React hydration warnings. (Warnings about Google Calendar iframe cookies are external and OK.)

- [ ] **Step 2: Lighthouse check (manual)**

In Chrome DevTools → Lighthouse → Run audit on mobile.
Expected:
- Performance ≥ 80 (Unsplash images and Google Calendar iframe will hurt this — acceptable for a marketing page)
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 95

If Accessibility < 90, the most common culprits:
- Missing `alt` text → check `<img>` tags
- Low color contrast → check that gold text only appears in large headlines (≥ 18px bold), not body copy

- [ ] **Step 3: Cross-browser sanity (manual)**

If possible: open in Safari and Firefox in addition to Chrome. Verify no layout breakage. (Most likely flashpoint: `bg-clip-text` gradient text — should render fine in all modern browsers.)

- [ ] **Step 4: Mobile device check**

Resize browser to 375px width. Verify:
- Hero headline doesn't overflow
- 4-column stat bar collapses to 2 columns
- 3-column ProblemAgitation cards stack to 1 column
- ValueLadder ascending offset is removed (cards stack with no `translate-y`)
- FAQ buttons remain tap-friendly (≥ 44px tap target)

- [ ] **Step 5: Any final fixes — type-check, lint, build**

If any fixes were made in steps 1–4:
```bash
npx tsc --noEmit
npm run lint
npm run build
```
All must pass.

- [ ] **Step 6: Final commit** (if any fixes were applied)

```bash
git add -p   # review fixes
git commit -m "polish(homepage): final QA fixes"
```

If no fixes needed: skip this step.

- [ ] **Step 7: Push (only if user explicitly authorizes)**

Do **not** push automatically. Inform the user the redesign is complete and ask whether to push to `origin/main`.

---

## Spec coverage check

This plan implements every section, file, and architectural decision from the spec:

| Spec section | Plan task |
|---|---|
| 3.1 Hero | Task 4 |
| 3.2 Problem/Agitation | Task 5 |
| 3.3 Reframe | Task 6 |
| 3.4 Method | Task 7 |
| 3.5 Trainer | Task 8 |
| 3.6 Testimonials | Task 9 |
| 3.7 ValueLadder | Task 10 |
| 3.8 GuaranteeScarcity | Task 11 |
| 3.9 FAQ | Task 12 |
| 3.10 CalendarEmbed | Task 13 |
| 4.1 New app/page.tsx | Task 14 |
| 4.2 Component responsibilities | Tasks 4–13 |
| 4.3 Shared styling patterns | Inline in every task |
| 5. Responsive behavior | Verified in Task 14 step 4 and Task 15 step 4 |
| 6. Accessibility & SEO | Task 1 (lang/meta), Task 12 (keyboard-accessible FAQ), Task 15 (Lighthouse) |
| 7. Out of scope items | Not touched anywhere |
| 8. Ethics check | Honest copy in every task; scarcity counter hardcoded (manual update) |
| 9. Open questions | Defaults documented at top of plan |
| 10. Success criteria | Verified across Tasks 14–15 |

---

*End of implementation plan.*
