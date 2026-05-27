# Lead-Capture Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every direct `/v4` CTA on the homepage with a modal that captures first name, email, and DSGVO consent before forwarding to `/v4`.

**Architecture:** Add a `ModalDict` slice to the bilingual dictionary. Build two new components: `LeadCaptureModal` (the dialog) and `TrainingCTA` (a button-that-opens-modal that replaces every existing "/v4" link). Build a `POST /api/lead` route that validates server-side, logs to Vercel runtime logs, and forwards to an optional `LEAD_WEBHOOK_URL` (Zapier/Make/ConvertKit). After successful submit, the client redirects to `/v4` and writes a localStorage fallback.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Framer Motion 11 (existing), `@radix-ui/react-dialog` (new, ~6kb gzipped — for focus-trap + ARIA + body-scroll-lock). Bilingual via existing `dictionaries/de.ts` and `en.ts`.

**Reference spec:** [`docs/superpowers/specs/2026-05-27-bilingual-hosting-and-lead-popup-design.md`](../specs/2026-05-27-bilingual-hosting-and-lead-popup-design.md) — Part 2.

**Critical sequencing:** The bilingual rework is already shipped (32 commits on `main`). Components already accept dict props and the [locale] route structure exists. This plan only adds the popup layer on top.

**Defaults used (override later if needed):**
- Email regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$` (spec line 291)
- First name min length: 2 chars
- Modal max-width: 480px
- Animation: Framer Motion `opacity 0→1` + `scale 0.96→1` over 200ms
- `LEAD_WEBHOOK_URL` env var: optional; if unset, leads stay only in Vercel logs

---

## Task 0: Pre-flight

**Files:** none.

- [ ] **Step 1: Verify clean working tree**

Run: `git status` — expected: clean tree on `main`, only `Propaganda_Playbook_Master_Summary.md` untracked.

- [ ] **Step 2: Verify build still passes**

Run: `npx tsc --noEmit && npm run build 2>&1 | tail -5`
Expected: zero TS errors; build succeeds.

- [ ] **Step 3: Start dev server in background**

Run: `npm run dev`
Verify: `http://localhost:3000/de` and `http://localhost:3000/en` both return 200.

---

## Task 1: Install `@radix-ui/react-dialog`

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install**

Run: `npm install @radix-ui/react-dialog`

- [ ] **Step 2: Verify it appears in `dependencies`**

Run: `grep '"@radix-ui/react-dialog"' package.json`
Expected: one line matching the new dependency with a `^1.x` version.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — expected zero errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add @radix-ui/react-dialog for lead-capture modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Extend `dictionaries/types.ts` with `ModalDict`

**Files:**
- Modify: `dictionaries/types.ts`

- [ ] **Step 1: Add `ModalDict` interface and include it on `Dictionary`**

Append before the final `export interface Dictionary {` block:

```ts
export interface ModalDict {
  headline: string;
  sub: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  consentLabelBefore: string;     // text before the privacy link
  consentLinkText: string;        // the link text itself (rendered as <a>)
  consentLabelAfter: string;      // text after the privacy link
  submit: string;
  submitting: string;
  errorRequired: string;
  errorEmail: string;
  errorConsent: string;
  errorSubmit: string;
  closeLabel: string;             // aria-label for the close button
}
```

Then add `modal: ModalDict;` to the `Dictionary` interface (last property before the closing brace):

```ts
export interface Dictionary {
  // ... existing properties
  modal: ModalDict;
}
```

- [ ] **Step 2: Type-check (will fail until de.ts + en.ts have `modal`)**

Run: `npx tsc --noEmit 2>&1 | tail -10`
Expected: TWO errors — one each in `dictionaries/de.ts` and `dictionaries/en.ts` for missing `modal` property. This is the contract holding: TS forces us to populate both locales. Tasks 3 and 4 fix it.

- [ ] **Step 3: No commit yet** (Tasks 3 + 4 commit together with this).

---

## Task 3: Populate `dictionaries/de.ts` with `modal`

**Files:**
- Modify: `dictionaries/de.ts`

- [ ] **Step 1: Add `modal:` slice before the final `};` of the `const de: Dictionary = {` literal.**

Insert immediately before the closing `};`:

```ts
  modal: {
    headline: 'Hol dir das kostenlose 60-Minuten-Training',
    sub: 'Methode, Geschäftsmodell, echte Zahlen. Direkt nach Eintragung.',
    firstNameLabel: 'Vorname',
    firstNamePlaceholder: 'Max',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'max@beispiel.de',
    consentLabelBefore: 'Ich stimme zu, dass meine Daten zur Bereitstellung des Trainings und für Folge-E-Mails verwendet werden. Widerruf jederzeit möglich. Details: ',
    consentLinkText: 'Datenschutzerklärung',
    consentLabelAfter: '.',
    submit: 'Training jetzt freischalten →',
    submitting: 'Sichern...',
    errorRequired: 'Bitte fülle alle Felder aus.',
    errorEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    errorConsent: 'Bitte stimme der Datenverarbeitung zu.',
    errorSubmit: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    closeLabel: 'Schließen',
  },
```

- [ ] **Step 2: Type-check** (one TS error should remain — `en.ts` still needs `modal`)

Run: `npx tsc --noEmit 2>&1 | tail -5`
Expected: ONE error in `dictionaries/en.ts`.

---

## Task 4: Populate `dictionaries/en.ts` with `modal`

**Files:**
- Modify: `dictionaries/en.ts`

- [ ] **Step 1: Insert `modal:` slice immediately before the closing `};`:**

```ts
  modal: {
    headline: 'Get the free 60-minute training',
    sub: 'Method, business model, real numbers. Right after sign-up.',
    firstNameLabel: 'First name',
    firstNamePlaceholder: 'Alex',
    emailLabel: 'Email',
    emailPlaceholder: 'alex@example.com',
    consentLabelBefore: 'I agree that my data is used to provide the training and follow-up emails. I can withdraw at any time. Details: ',
    consentLinkText: 'Privacy Policy',
    consentLabelAfter: '.',
    submit: 'Unlock training →',
    submitting: 'Securing...',
    errorRequired: 'Please fill in all fields.',
    errorEmail: 'Please enter a valid email address.',
    errorConsent: 'Please consent to data processing.',
    errorSubmit: 'Something went wrong. Please try again.',
    closeLabel: 'Close',
  },
```

- [ ] **Step 2: Type-check** — expected zero errors.

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit Tasks 2+3+4 together**

```bash
git add dictionaries/types.ts dictionaries/de.ts dictionaries/en.ts
git commit -m "feat(i18n): add ModalDict to dictionary (DE + EN)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Create `components/LeadCaptureModal.tsx`

**Files:**
- Create: `components/LeadCaptureModal.tsx`

This is the modal dialog itself. Radix Dialog handles focus trap, ARIA, body-scroll-lock, portal mounting, and Esc-to-close. Framer Motion handles the open/close animation. The form is controlled internally; on success it calls `router.push(redirectTo)` and `onOpenChange(false)`.

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import type { ModalDict, Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

export interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  dict: ModalDict;
  redirectTo: string;   // logical path, e.g. '/v4' — component prepends locale
  source: string;       // 'hero' | 'header' | 'trainer' | 'ladder' | 'guarantee'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  firstName: string;
  email: string;
  consent: boolean;
}

interface FieldErrors {
  firstName?: string;
  email?: string;
  consent?: string;
  submit?: string;
}

function validate(state: FormState, dict: ModalDict): FieldErrors {
  const errors: FieldErrors = {};
  if (state.firstName.trim().length < 2) errors.firstName = dict.errorRequired;
  if (!EMAIL_RE.test(state.email.trim())) errors.email = dict.errorEmail;
  if (!state.consent) errors.consent = dict.errorConsent;
  return errors;
}

function persistLocalLead(firstName: string, email: string) {
  try {
    const raw = localStorage.getItem('buildforthem-leads');
    const existing = raw ? JSON.parse(raw) : [];
    existing.push({ firstName, email, capturedAt: new Date().toISOString() });
    localStorage.setItem('buildforthem-leads', JSON.stringify(existing));
  } catch {
    // Storage full / disabled — silent ok, server has it.
  }
}

export default function LeadCaptureModal({
  open,
  onOpenChange,
  locale,
  dict,
  redirectTo,
  source,
}: LeadCaptureModalProps) {
  const router = useRouter();
  const [state, setState] = useState<FormState>({ firstName: '', email: '', consent: false });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(state, dict);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: state.firstName.trim(),
          email: state.email.trim(),
          consent: true,
          locale,
          source,
          referrer: typeof document !== 'undefined' ? document.referrer || null : null,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        }),
      });
      if (!res.ok) {
        // Still redirect — log is server-side, but allow the user through.
        console.error('[lead] server returned', res.status);
      }
      persistLocalLead(state.firstName.trim(), state.email.trim());
      onOpenChange(false);
      router.push(localized(redirectTo, locale));
    } catch (err) {
      console.error('[lead] fetch failed', err);
      // On network error: still let the user through (don't block training access on a transient failure).
      persistLocalLead(state.firstName.trim(), state.email.trim());
      onOpenChange(false);
      router.push(localized(redirectTo, locale));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[480px] bg-white rounded-2xl shadow-2xl border-2 border-accent/20 p-8 focus:outline-none"
              >
                <Dialog.Close
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={dict.closeLabel}
                >
                  ×
                </Dialog.Close>

                <Dialog.Title className="text-2xl font-black text-black mb-3 pr-8">
                  {dict.headline}
                </Dialog.Title>
                <Dialog.Description className="text-gray-700 mb-6">
                  {dict.sub}
                </Dialog.Description>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="lead-first-name" className="block text-sm font-bold text-black mb-1">
                      {dict.firstNameLabel}
                    </label>
                    <input
                      id="lead-first-name"
                      type="text"
                      required
                      minLength={2}
                      value={state.firstName}
                      onChange={(e) => setState((s) => ({ ...s, firstName: e.target.value }))}
                      placeholder={dict.firstNamePlaceholder}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:outline-none transition"
                      autoComplete="given-name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-bold text-black mb-1">
                      {dict.emailLabel}
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={state.email}
                      onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                      placeholder={dict.emailPlaceholder}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:outline-none transition"
                      autoComplete="email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={state.consent}
                        onChange={(e) => setState((s) => ({ ...s, consent: e.target.checked }))}
                        className="mt-1 w-5 h-5 accent-accent flex-shrink-0"
                      />
                      <span className="text-xs text-gray-600 leading-relaxed">
                        {dict.consentLabelBefore}
                        <a
                          href={localized('/privacy', locale)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline hover:text-accent-dark"
                        >
                          {dict.consentLinkText}
                        </a>
                        {dict.consentLabelAfter}
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
                  </div>

                  {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-accent text-black font-black text-lg py-4 rounded-xl shadow-lg hover:bg-accent-dark hover:shadow-xl transition transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitting ? dict.submitting : dict.submit}
                  </button>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — expected zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/LeadCaptureModal.tsx
git commit -m "feat(modal): LeadCaptureModal with Radix Dialog + Framer Motion

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Create `components/TrainingCTA.tsx`

**Files:**
- Create: `components/TrainingCTA.tsx`

A wrapper button that opens the modal. Designed to drop into every place where `<a href="/v4">` currently lives. Accepts `children` so each call site keeps its own bespoke button styling (icon arrows, hover effects, etc.).

- [ ] **Step 1: Write the file**

```tsx
'use client';

import { useState, ReactNode } from 'react';
import type { ModalDict, Locale } from '@/dictionaries/types';
import LeadCaptureModal from './LeadCaptureModal';

export interface TrainingCTAProps {
  locale: Locale;
  dict: ModalDict;
  source: string;                // 'hero' | 'header' | 'header-mobile' | 'trainer' | 'ladder-step1' | 'ladder-primary' | 'guarantee'
  className?: string;            // pass-through for button styling
  children: ReactNode;           // inner content of the button (the existing CTA label + arrows etc.)
  redirectTo?: string;           // default '/v4'
  ariaLabel?: string;
}

export default function TrainingCTA({
  locale,
  dict,
  source,
  className,
  children,
  redirectTo = '/v4',
  ariaLabel,
}: TrainingCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </button>
      <LeadCaptureModal
        open={open}
        onOpenChange={setOpen}
        locale={locale}
        dict={dict}
        redirectTo={redirectTo}
        source={source}
      />
    </>
  );
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/TrainingCTA.tsx
git commit -m "feat(cta): TrainingCTA wraps button + modal, replaces /v4 links

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Create `app/api/lead/route.ts`

**Files:**
- Create: `app/api/lead/route.ts`

Server-side endpoint. Validates input, logs to Vercel runtime logs (always), forwards to `LEAD_WEBHOOK_URL` if set. Returns 200 OK if validation passes — even if the webhook itself failed, because the log is the authoritative record.

- [ ] **Step 1: Create the directory**

Run: `mkdir -p app/api/lead`

- [ ] **Step 2: Write `app/api/lead/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  firstName: string;
  email: string;
  consent: true;
  locale: 'de' | 'en';
  source: string;
  userAgent?: string | null;
  referrer?: string | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is LeadPayload {
  if (!body || typeof body !== 'object') return false;
  const p = body as Record<string, unknown>;
  if (typeof p.firstName !== 'string' || p.firstName.trim().length < 2) return false;
  if (typeof p.email !== 'string' || !EMAIL_RE.test(p.email.trim())) return false;
  if (p.consent !== true) return false;
  if (p.locale !== 'de' && p.locale !== 'en') return false;
  if (typeof p.source !== 'string' || p.source.length === 0) return false;
  return true;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: 'invalid-input' }, { status: 400 });
  }

  const lead = {
    ...body,
    firstName: body.firstName.trim(),
    email: body.email.trim().toLowerCase(),
    capturedAt: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
  };

  // Always log — authoritative record visible in Vercel runtime logs.
  console.log('[lead]', JSON.stringify(lead));

  // Forward to external webhook if configured.
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const r = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!r.ok) {
        console.error('[lead] webhook returned', r.status);
      }
    } catch (err) {
      console.error('[lead] webhook fetch failed', err);
    }
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Test the endpoint locally with curl**

```bash
curl -s -X POST -H 'content-type: application/json' \
  -d '{"firstName":"Test","email":"test@example.com","consent":true,"locale":"de","source":"hero"}' \
  http://localhost:3000/api/lead
```
Expected: `{"ok":true}`

```bash
curl -s -X POST -H 'content-type: application/json' \
  -d '{"firstName":"X","email":"not-an-email","consent":true,"locale":"de","source":"hero"}' \
  http://localhost:3000/api/lead
```
Expected: `{"error":"invalid-input"}` with HTTP 400 (check with `-w "%{http_code}\n"`).

- [ ] **Step 4: Commit**

```bash
git add app/api/lead/route.ts
git commit -m "feat(api): /api/lead endpoint - validate, log, forward to webhook

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Update homepage to pass `dict.modal` down to components

**Files:**
- Modify: `app/[locale]/page.tsx`

The Header, Hero, Trainer, ValueLadder, GuaranteeScarcity all need `dict.modal` to mount their TrainingCTAs. Threading it through every prop list is verbose but explicit and TypeScript-safe.

- [ ] **Step 1: Pre-pass `dict.modal` to every component that will host a CTA**

Update the JSX inside `app/[locale]/page.tsx`:

```tsx
<Header dict={dict.nav} modalDict={dict.modal} locale={locale} />
<Hero dict={dict.hero} modalDict={dict.modal} locale={locale} />
<ProblemAgitation dict={dict.problem} />
<Reframe dict={dict.reframe} />
<Method dict={dict.method} />
<Trainer dict={dict.trainer} modalDict={dict.modal} locale={locale} />
<Testimonials dict={dict.testimonials} />
<ValueLadder dict={dict.ladder} modalDict={dict.modal} locale={locale} />
<GuaranteeScarcity dict={dict.guarantee} modalDict={dict.modal} locale={locale} />
<FAQ dict={dict.faq} />
<CalendarEmbed dict={dict.calendar} />
<Footer dict={dict.footer} locale={locale} />
```

(Footer is **not** updated — per spec line 257, the footer "/v4" link stays a plain anchor.)

- [ ] **Step 2: Type-check (will fail — components don't accept modalDict yet)**

Expected: 5 errors (Header, Hero, Trainer, ValueLadder, GuaranteeScarcity each don't accept `modalDict`).

- [ ] **Step 3: No commit yet** — Tasks 9–13 fix the components and we commit each component change with its own task.

---

## Task 9: Replace Hero `/v4` CTA with TrainingCTA

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Update Hero props interface and component**

In `components/Hero.tsx`:

1. Update imports:
```tsx
import type { HeroDict, Locale, ModalDict } from '@/dictionaries/types';
import TrainingCTA from './TrainingCTA';
```

2. Remove this import (no longer needed since CTA isn't a navigated `<a>`):
```tsx
import { localized } from '@/utils/route';
```
**Wait** — keep it; the secondary CTA `#methode` still uses an anchor, and other component sections may need the import. Check: the secondary CTA is just `href="#methode"` (anchor scroll) — no `localized()` needed. The primary CTA was the only use. Remove the `localized` import.

3. Update props:
```tsx
interface HeroProps {
  dict: HeroDict;
  modalDict: ModalDict;
  locale: Locale;
}

export default function Hero({ dict, modalDict, locale }: HeroProps) {
```

4. Find the primary CTA (currently `<a href={localized('/v4', locale)} ...>` wrapping the "Kostenloses Training sichern" copy) and replace it with `<TrainingCTA>`:

```tsx
<TrainingCTA
  locale={locale}
  dict={modalDict}
  source="hero"
  className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden glow-animation"
>
  <span className="relative z-10 flex items-center gap-3">
    {dict.ctaPrimary}
    <span className="group-hover:translate-x-2 transition-transform">→</span>
  </span>
</TrainingCTA>
```

The secondary CTA (`href="#methode"`) stays as a plain `<a>`.

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Hero.tsx
git commit -m "feat(hero): primary CTA opens lead-capture modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Replace Header `/v4` CTAs with TrainingCTA

**Files:**
- Modify: `components/Header.tsx`

The Header has TWO CTAs that route to `/v4` — one in the desktop nav, one in the mobile menu. Both need to become `<TrainingCTA>`.

- [ ] **Step 1: Update props and imports**

1. Update imports:
```tsx
import type { NavDict, Locale, ModalDict } from '@/dictionaries/types';
import TrainingCTA from './TrainingCTA';
```

2. Update props interface:
```tsx
interface HeaderProps {
  dict: NavDict;
  modalDict: ModalDict;
  locale: Locale;
}

export default function Header({ dict, modalDict, locale }: HeaderProps) {
```

3. Replace the desktop CTA (currently `<a href={localized('/v4', locale)} className="bg-accent ...">{dict.cta}</a>`):

```tsx
<TrainingCTA
  locale={locale}
  dict={modalDict}
  source="header"
  className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
>
  {dict.cta}
</TrainingCTA>
```

4. Replace the mobile CTA (inside the `isMenuOpen` block, similar styling):

```tsx
<TrainingCTA
  locale={locale}
  dict={modalDict}
  source="header-mobile"
  className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg text-center"
>
  {dict.cta}
</TrainingCTA>
```

Note: the mobile CTA loses its inline `onClick={() => setIsMenuOpen(false)}`. The modal will open on top of the menu, which is fine (user closes modal → menu still open behind it). If this feels wrong in QA, lift `setIsMenuOpen(false)` into a wrapper handler.

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Header.tsx
git commit -m "feat(header): desktop + mobile CTAs open lead-capture modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Replace Trainer `/v4` CTA with TrainingCTA

**Files:**
- Modify: `components/Trainer.tsx`

- [ ] **Step 1: Update props and replace the bottom CTA**

1. Imports:
```tsx
import type { TrainerDict, Locale, ModalDict } from '@/dictionaries/types';
import TrainingCTA from './TrainingCTA';
```

2. Props:
```tsx
interface TrainerProps {
  dict: TrainerDict;
  modalDict: ModalDict;
  locale: Locale;
}

export default function Trainer({ dict, modalDict, locale }: TrainerProps) {
```

3. Replace the bottom CTA (currently `<a href={localized('/v4', locale)} ...>{dict.cta} <span>→</span></a>`):

```tsx
<TrainingCTA
  locale={locale}
  dict={modalDict}
  source="trainer"
  className="inline-flex items-center gap-3 bg-accent text-black px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-accent-dark transition-all transform hover:scale-105"
>
  {dict.cta}
  <span>→</span>
</TrainingCTA>
```

The `localized` import can stay since `<img src={...}>` and other uses don't depend on it; but if Trainer doesn't use `localized` anywhere else after this change, remove the import.

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Trainer.tsx
git commit -m "feat(trainer): CTA opens lead-capture modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: Replace ValueLadder `/v4` CTAs with TrainingCTA

**Files:**
- Modify: `components/ValueLadder.tsx`

ValueLadder has TWO `/v4` references: (1) step 1's `href: '/v4'` in the dict → currently rendered as `<a href={localized(step.href, locale)}>`; (2) the primary bottom CTA `<a href={localized('/v4', locale)}>`.

The dict's `step.href` for step 1 is `/v4`; step 2 and step 3 are `#kalender` (anchor). We need to special-case step 1: instead of `<a>`, render a `<TrainingCTA>`.

- [ ] **Step 1: Update props and special-case step 1**

1. Imports:
```tsx
import type { LadderDict, Locale, ModalDict } from '@/dictionaries/types';
import TrainingCTA from './TrainingCTA';
```

2. Props:
```tsx
interface ValueLadderProps {
  dict: LadderDict;
  modalDict: ModalDict;
  locale: Locale;
}

export default function ValueLadder({ dict, modalDict, locale }: ValueLadderProps) {
```

3. In the steps `.map()` rendering, replace the link-rendering line. The current code is:

```tsx
<a
  href={localized(step.href, locale)}
  className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
>
  {step.cta} →
</a>
```

Change to:

```tsx
{step.href === '/v4' ? (
  <TrainingCTA
    locale={locale}
    dict={modalDict}
    source={`ladder-step${step.num}`}
    className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
  >
    {step.cta} →
  </TrainingCTA>
) : (
  <a
    href={localized(step.href, locale)}
    className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
  >
    {step.cta} →
  </a>
)}
```

4. Replace the primary bottom CTA (currently `<a href={localized('/v4', locale)} ...>{dict.ctaPrimary} <span>→</span></a>`):

```tsx
<TrainingCTA
  locale={locale}
  dict={modalDict}
  source="ladder-primary"
  className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all transform hover:scale-105"
>
  {dict.ctaPrimary}
  <span>→</span>
</TrainingCTA>
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/ValueLadder.tsx
git commit -m "feat(ladder): step 1 + primary CTAs open lead-capture modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: Replace GuaranteeScarcity `/v4`-style CTA with TrainingCTA

**Files:**
- Modify: `components/GuaranteeScarcity.tsx`

The GuaranteeScarcity bottom CTA is currently `<a href="#kalender">{dict.cta}</a>` — the spec line 258 lists this as "needs the modal" because conceptually "Platz sichern" should capture a lead before letting them book. However, current code routes to `#kalender` (the calendar embed), not `/v4`.

**Decision** (matching spec intent): yes, replace with TrainingCTA, but redirect to `/v4` afterwards (consistent with the spec's "every CTA whose current behavior leads to training/booking"). The user can refine post-launch.

Actually, re-reading spec line 261: *"any CTA whose current href is `/v4` becomes a `<TrainingCTA>` button. Anything else stays as-is."* So `#kalender` should stay as anchor.

**Final decision: leave GuaranteeScarcity CTA as anchor to `#kalender`. NO modal here.**

- [ ] **Step 1: No code change needed for GuaranteeScarcity.**

But we still need to remove `modalDict` from its props in `app/[locale]/page.tsx` (it doesn't host a CTA).

- [ ] **Step 2: Update `app/[locale]/page.tsx`** — remove `modalDict` from GuaranteeScarcity:

```tsx
<GuaranteeScarcity dict={dict.guarantee} />
```

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add app/[locale]/page.tsx
git commit -m "feat(page): pass modalDict only to CTA-hosting components

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

> **Note on spec deviation:** spec line 258 mentions GuaranteeScarcity needs the modal, but spec line 261 says "any CTA whose current href is `/v4`" — these conflict. We choose 261 (only `/v4`-routed CTAs get the modal) for consistency. If post-launch data shows people bypass the modal by clicking "Platz sichern" → calendar without ever leaving an email, revisit.

---

## Task 14: Full integration smoke test

**Files:** none (verification only).

- [ ] **Step 1: Restart dev cleanly**

```bash
pkill -f "next dev"; sleep 1; rm -rf .next; npm run dev > /tmp/next-dev.log 2>&1 &
sleep 4
tail -5 /tmp/next-dev.log
```
Expected: server ready on port 3000.

- [ ] **Step 2: Verify routes still work for both locales**

```bash
for path in / /v4 /v4/success; do
  for loc in de en; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/${loc}${path}")
    echo "${loc}${path} → ${code}"
  done
done
```
Expected: all 200.

- [ ] **Step 3: Verify API endpoint**

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST -H 'content-type: application/json' \
  -d '{"firstName":"Test","email":"test@example.com","consent":true,"locale":"de","source":"hero"}' \
  http://localhost:3000/api/lead
```
Expected: `{"ok":true}` HTTP 200.

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST -H 'content-type: application/json' \
  -d '{"firstName":"X","email":"bad","consent":true,"locale":"de","source":"hero"}' \
  http://localhost:3000/api/lead
```
Expected: `{"error":"invalid-input"}` HTTP 400.

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST -H 'content-type: application/json' \
  -d '{"firstName":"Test","email":"test@example.com","consent":false,"locale":"de","source":"hero"}' \
  http://localhost:3000/api/lead
```
Expected: `{"error":"invalid-input"}` HTTP 400 (consent must be true).

- [ ] **Step 4: Manual browser test**

Open http://localhost:3000/de in a browser. Click "Kostenloses Training sichern" (Hero CTA). Verify:
- Modal opens with backdrop
- Headline: "Hol dir das kostenlose 60-Minuten-Training"
- First name + email + consent fields
- Esc closes the modal
- Clicking outside the modal closes it
- Submitting an invalid email shows the error inline
- Submitting valid data + checked consent → modal closes + browser navigates to `/de/v4`
- Server log (`tail /tmp/next-dev.log`) shows `[lead] {...}` JSON

Same flow on http://localhost:3000/en — English labels.

- [ ] **Step 5: Production build**

```bash
pkill -f "next dev"; sleep 1; rm -rf .next
npm run build 2>&1 | tail -10
```
Expected: build succeeds. `/api/lead` appears as a serverless function route. Both `/de` and `/en` pre-rendered.

- [ ] **Step 6: No commit** (verification only).

---

## Task 15: Document `LEAD_WEBHOOK_URL` env var

**Files:**
- Modify: `docs/superpowers/plans/2026-05-27-bilingual-deployment-steps.md`

Add an instruction to set `LEAD_WEBHOOK_URL` in Vercel.

- [ ] **Step 1: Append a new section to the deployment-steps doc**

Add at the end of the file (before the troubleshooting section):

```markdown
## Step 8: Set the `LEAD_WEBHOOK_URL` env var (optional but recommended)

The lead-capture modal POSTs to `/api/lead`. The route ALWAYS logs to Vercel runtime logs (visible in dashboard → Logs). It optionally forwards to a webhook URL set via `LEAD_WEBHOOK_URL`.

1. Vercel dashboard → Project Settings → Environment Variables
2. Add `LEAD_WEBHOOK_URL` with the value = your incoming webhook (Zapier, Make, n8n, ConvertKit, ActiveCampaign, etc.)
3. Set scope: **Production**, **Preview**, **Development** (all three)
4. Redeploy (Vercel does this automatically on the next push, or trigger manually)

If unset, leads are still captured in Vercel logs — no data loss, but you'll need to manually parse logs to retrieve them.

**Payload sent to webhook:**
```json
{
  "firstName": "Marc",
  "email": "marc@example.com",
  "consent": true,
  "locale": "de",
  "source": "hero",
  "userAgent": "...",
  "referrer": "...",
  "capturedAt": "2026-05-27T13:45:00.000Z",
  "ip": "203.0.113.1"
}
```
```

- [ ] **Step 2: Commit + push everything**

```bash
git add docs/superpowers/plans/2026-05-27-bilingual-deployment-steps.md
git commit -m "docs: document LEAD_WEBHOOK_URL env var for lead-capture modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Spec coverage check

| Spec section | Plan task(s) |
|---|---|
| Part 2 §"What it replaces" — modal in front of /v4 CTAs | Tasks 5–6, 9–13 |
| §UX of the modal | Task 5 (full Modal component) |
| §Component design — `LeadCaptureModal` | Task 5 |
| §Component design — `TrainingCTA` | Task 6 |
| §Dictionary additions (`ModalDict`) | Tasks 2–4 |
| §Where the CTA is used today (all `/v4` swaps) | Tasks 9–12 (Hero, Header×2, Trainer, ValueLadder×2). Footer link stays per spec. GuaranteeScarcity (Task 13) NOT swapped per spec rule "only `/v4` hrefs". |
| §Backend: `/api/lead` | Task 7 |
| §`localStorage` fallback | Task 5 (in Modal's success handler) |
| §Source tracking | Task 6 (TrainingCTA prop) |
| §GDPR / DSGVO consent + privacy link | Task 5 (consent checkbox + privacy link in modal copy) |
| §Out of scope (database, email sending) | Honored — no DB, no email-sending code |
| Risks — opt-in rate / webhook outages | No mitigation in code; manual observability via Vercel logs (acceptable per spec) |
| Sequence — bilingual first, then popup | Honored — bilingual is shipped, this plan runs on top |
| `LEAD_WEBHOOK_URL` env var | Task 15 (deployment doc) |

---

## Self-review notes

**Type consistency:** Every component prop signature uses `Locale`, `ModalDict`, `TrainingCTAProps`, `LeadCaptureModalProps` consistently across tasks. Source strings (`'hero'`, `'header'`, `'header-mobile'`, `'trainer'`, `'ladder-step1'`, `'ladder-step2'`, `'ladder-primary'`) are free-form — the API doesn't enumerate them, just stores whatever the client sent.

**Type errors during refactor:** Task 8 intentionally introduces 5 TS errors that Tasks 9–12 each fix. Tasks 9–12 won't all type-check independently if executed out of order. Order matters within Phase B (Tasks 9, 10, 11, 12, 13) but each pair (component file + page.tsx prop) is atomic per commit.

**Footer:** explicitly excluded per spec. Has a regular `<a href="/v4">` (well, `localized('/v4', locale)`). Stays as link.

**Footer mobile menu close on click:** the mobile-menu CTA in Header used to call `setIsMenuOpen(false)` on click. After modal swap, this is lost. Flag for QA — if it feels wrong, lift `setIsMenuOpen(false)` into a wrapper handler around the TrainingCTA. Not a blocker.

**Privacy link target on EN modal:** dict.modal links to `/privacy` regardless of locale via `localized('/privacy', locale)` — so EN modal opens `/en/privacy`. Correct.

**No tests added:** This codebase has no test framework configured. Verification is type-check + production build + manual curl + manual browser test. Adding Jest/Vitest is out of scope.

---

*End of lead-capture popup implementation plan.*
