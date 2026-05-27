# Bilingual Hosting + Lead-Capture Popup — Design Spec

**Status:** Draft — pending user review
**Date:** 2026-05-27
**Owner:** Marc

## Goal

Ship the BuildForThem site on two domains from a single Next.js codebase, and replace the direct `/v4` CTA navigation with a lead-capture popup that hands the visitor off to `/v4` *after* their email is captured.

- **buildforthem.de** → German site (default locale `de`)
- **buildforthem.com** → English site (default locale `en`)
- Every "Kostenloses Training sichern" / "Get free training" CTA opens a modal. On submit: lead is captured server-side, then the user is redirected to `/v4`.

## Two parts

This spec covers two independent (but co-deployable) workstreams:

1. **Hosting & bilingual config** — Vercel project, two custom domains, middleware-driven locale detection. Builds on the existing detailed plan at [`docs/superpowers/plans/2026-05-27-bilingual-architecture.md`](../plans/2026-05-27-bilingual-architecture.md) — this spec adds the concrete Vercel/DNS/GitHub steps that plan deliberately deferred to "Task 30 (Manual)".
2. **Lead-capture popup** — new modal component, new `/api/lead` route, replace every `<Link href="/v4">` with `<TrainingCTA>` button that opens the modal.

The hosting work is mostly mechanical (config, DNS); the popup is the bulk of the code change.

---

## Part 1: Hosting & bilingual architecture

### Repository & branching (GitHub)

**Decision:** Single repo (`info-operator-recruitment`), single `main` branch, one Vercel project deploys from it. **No branch-per-domain, no monorepo split.**

Why: both locales share 100% of components and 95% of layout. The only difference is the dictionary loaded at request time. A single repo means one PR fixes both domains, and the middleware is the only place that branches on locale.

No GitHub-side configuration changes are needed beyond the existing repo. Vercel auto-deploys on push to `main` as it does today.

### Vercel project setup

**Decision:** One Vercel project. Both domains attached to the same project. Vercel routes every request to the same Next.js build; middleware reads the `Host` header to set the locale.

**Concrete steps** (do once, in this order):

1. **Confirm the existing Vercel project** is connected to this GitHub repo and auto-deploying `main` → production. (You said it's live as a German-only site, so this is already done.)

2. **Add `buildforthem.com` as a domain** in Vercel → Project Settings → Domains:
   - Click "Add" → enter `buildforthem.com` → Add.
   - Vercel will show DNS instructions. Choose **A record** if your registrar supports apex A records to Vercel's IP (`76.76.21.21`), or use **nameservers** if you want Vercel to manage DNS.
   - Also add `www.buildforthem.com` and set it to **redirect to `buildforthem.com`** (Vercel's domain settings has a one-click toggle for this).

3. **Add `buildforthem.de` as a domain** the same way:
   - Add `buildforthem.de` + `www.buildforthem.de` (redirect www → apex).
   - Configure DNS at your registrar (likely the same registrar both domains sit at — point `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`).

4. **Do NOT set either domain as "primary" / "redirect to another"** — both must serve traffic independently. By default Vercel will not redirect between distinct domains, only between the apex and `www`. Verify both render after DNS propagates.

5. **Add environment variables** in Vercel → Settings → Environment Variables (set for **Production**, **Preview**, and **Development**):
   - `LEAD_WEBHOOK_URL` — the URL of your CRM/email tool's incoming webhook (Zapier, Make, n8n, ConvertKit, ActiveCampaign, Resend, whatever). Optional — if unset, leads are written to Vercel logs only.
   - `NEXT_PUBLIC_PRODUCTION_DOMAIN_DE` — `https://buildforthem.de` (used by the language switcher)
   - `NEXT_PUBLIC_PRODUCTION_DOMAIN_EN` — `https://buildforthem.com`

6. **SSL certs**: Vercel auto-provisions Let's Encrypt certs for both domains once DNS resolves. No action needed.

7. **Preview deploys**: every Vercel preview URL (e.g., `info-operator-recruitment-git-feature-x.vercel.app`) defaults to `de` (because the `Host` header won't match either production domain — see middleware rules below). You can override per-preview by hitting `/en` directly.

### DNS at your registrar

Whoever hosts `buildforthem.de` and `buildforthem.com` DNS today (GoDaddy, Namecheap, Cloudflare, Hetzner, etc.) needs these records on each domain:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |

If the registrar doesn't support apex A records, switch to **Vercel nameservers** in Vercel's domain config and update the registrar's nameservers accordingly.

### Middleware locale detection

The existing bilingual plan (Task 4) already specifies this. Quick summary for completeness:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const DOMAIN_LOCALE: Record<string, 'de' | 'en'> = {
  'buildforthem.de': 'de',
  'www.buildforthem.de': 'de',
  'buildforthem.com': 'en',
  'www.buildforthem.com': 'en',
};

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const locale = DOMAIN_LOCALE[host] ?? 'de'; // localhost + previews default to de
  const res = NextResponse.next();
  res.headers.set('x-locale', locale);
  return res;
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
```

Pages read `x-locale` via `headers()` and load `dictionaries/de.ts` or `dictionaries/en.ts`. URL paths stay identical on both domains (`/v4/success` is the same path on de and com).

### Language switcher in Header

Add to Header (next to the nav links):

```tsx
// Pseudo
<a
  href={locale === 'de'
    ? `${process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN_EN}${pathname}`
    : `${process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN_DE}${pathname}`}
  hreflang={locale === 'de' ? 'en' : 'de'}
>
  {dict.nav.switchTo}
</a>
```

This is a hard cross-domain link, not client-side routing — exactly what we want for SEO (each domain owns its hreflang signal).

### SEO: hreflang tags

In root layout `<head>`:

```tsx
<link rel="alternate" hrefLang="de" href={`https://buildforthem.de${pathname}`} />
<link rel="alternate" hrefLang="en" href={`https://buildforthem.com${pathname}`} />
<link rel="alternate" hrefLang="x-default" href={`https://buildforthem.com${pathname}`} />
```

`x-default` = `.com` because English is the broader international fallback.

### Order of operations

1. Ship the bilingual code refactor first (per existing plan — Phases 1–4). Site stays German-only working through the entire refactor; English just isn't rendered yet because no domain points to `en`.
2. Add `buildforthem.com` to Vercel + configure DNS.
3. Verify `buildforthem.com` serves English content; verify `buildforthem.de` still serves German.
4. Launch.

---

## Part 2: Lead-capture popup

### What it replaces

Currently the homepage and `/v4` have multiple "Kostenloses Training sichern" CTAs that link directly to `/v4`. We replace the direct navigation with:

1. Click CTA → modal opens.
2. Modal shows: first name + email + DSGVO consent checkbox + submit button.
3. On submit: client POSTs to `/api/lead`, waits for `200 OK`, then `router.push('/v4')`. The URL path is identical on both domains (the existing bilingual plan keeps slugs the same across locales) — the locale comes from the domain, not the URL.
4. If the POST fails: still allow `/v4` redirect, but log the failure (the email is in `localStorage` as a fallback so a retry job can ship it later).

### Why this design (not the alternatives)

- **Not "modal opens the existing /quiz funnel"**: too much friction at the CTA. The point of the popup is to lower the barrier between "interested click" and "captured email."
- **Not "popup with mini-quiz"**: better for qualification, worse for opt-in rate. We already have `/quiz` for visitors who came via ads expecting a quiz; the homepage CTA should be the low-friction path.
- **Not "email-only, no name"**: a first name doubles the perceived personalization in `/v4` and in the welcome email, at almost zero extra friction.

### UX of the modal

**Layout:**
- Centered overlay, dark backdrop (50% black), white card max-width 480px.
- Close `×` top-right, also closes on backdrop click + Esc key.
- Headline: *"Hol dir das kostenlose 60-Minuten-Training"* (DE) / *"Get the free 60-minute training"* (EN)
- Sub: *"Methode, Geschäftsmodell, echte Zahlen. Direkt nach Eintragung."* (DE) / *"Method, business model, real numbers. Right after sign-up."* (EN)
- Fields:
  - First name (required, min 2 chars)
  - Email (required, valid email regex)
  - DSGVO consent checkbox (required, label: *"Ich stimme zu, dass meine Daten zur Bereitstellung des Trainings und für Folge-E-Mails verwendet werden. Widerruf jederzeit möglich. Details: [Datenschutzerklärung](/datenschutz)"*)
- Submit button: *"Training jetzt freischalten →"* / *"Unlock training →"*
- Loading state on submit (spinner in button, disabled state).
- Error state: red text below the form (e.g., *"Bitte gib eine gültige E-Mail ein"*).

**Animation:** Framer Motion — `opacity 0→1` + `scale 0.96→1` for the card, 200ms ease.

**Accessibility:**
- Modal trap focus inside (use `react-focus-lock` or `@radix-ui/react-dialog`'s built-in handling).
- `aria-modal="true"`, `aria-labelledby` pointing at the headline.
- Esc closes.

**Recommendation: use Radix Dialog primitive** rather than building modal scaffolding by hand. It handles focus trap, ARIA, body scroll lock, portal mounting, etc. Add the one dependency:

```bash
npm install @radix-ui/react-dialog
```

(Headless, ~6kb gzipped, brings no theme. Tailwind styling stays ours.)

### Component design

**`components/LeadCaptureModal.tsx`** — controlled component:

```ts
interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: 'de' | 'en';
  dict: ModalDict;          // headline, sub, field labels, button, errors
  redirectTo: string;        // e.g. '/v4' for de, '/v4' for en (paths stay same)
}
```

State managed inside the modal (form fields, submit state, error string). On submit success, calls `router.push(redirectTo)` then `onOpenChange(false)`.

**`components/TrainingCTA.tsx`** — replaces every `<Link href="/v4">` button. Takes the same props that the existing CTA buttons take (label, variant, className) plus opens the modal on click:

```ts
interface TrainingCTAProps {
  label: string;             // dict.hero.ctaPrimary, etc.
  variant?: 'primary' | 'secondary' | 'large' | 'small';
  className?: string;
  locale: 'de' | 'en';
  dict: ModalDict;
}
```

Internally holds the `open` state and renders both the button and the `<LeadCaptureModal>`. Multiple `<TrainingCTA>` instances on one page = multiple modal mounts, but only one open at a time per Radix's default behavior — which is fine because each is its own modal scope. (If we want a single shared modal across the page, we lift state to a React Context. For v1 keep it simple — duplicate mounts.)

**Dictionary additions** — add to `dictionaries/types.ts`:

```ts
export interface ModalDict {
  headline: string;
  sub: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  consentLabel: string;        // contains a {link} placeholder for the privacy link
  consentPrivacyLinkText: string;
  submit: string;
  submitting: string;          // "Sichern..." / "Securing..."
  errorRequired: string;
  errorEmail: string;
  errorConsent: string;
  errorSubmit: string;         // network/server fallback
}
```

And on `Dictionary`:
```ts
export interface Dictionary {
  // ...existing
  modal: ModalDict;
}
```

### Where the CTA is used today (must be replaced)

Found via grep:
- [components/Hero.tsx:85-89](components/Hero.tsx#L85-L89)
- [components/Header.tsx:40](components/Header.tsx#L40), [components/Header.tsx:83](components/Header.tsx#L83)
- [components/Trainer.tsx:93-96](components/Trainer.tsx#L93-L96)
- [components/ValueLadder.tsx:12](components/ValueLadder.tsx#L12) (step 1 `href`), [components/ValueLadder.tsx:89](components/ValueLadder.tsx#L89) (primary CTA)
- [components/Footer.tsx:42](components/Footer.tsx#L42) (the footer link — **keep as a regular link**, since modals don't belong in footer link lists; just keep `href="/v4"` there)
- [components/GuaranteeScarcity.tsx](components/GuaranteeScarcity.tsx) — check for "Platz sichern" CTA, also needs the modal
- [components/CalendarEmbed.tsx](components/CalendarEmbed.tsx) — final-close section — already goes to the calendar, NOT to `/v4`. Leave alone.

**Rule:** any CTA whose current href is `/v4` becomes a `<TrainingCTA>` button. Anything else stays as-is.

### Backend: `/api/lead` route

**File:** `app/api/lead/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  firstName: string;
  email: string;
  consent: true;
  locale: 'de' | 'en';
  source: string;             // 'hero' | 'header' | 'trainer' | etc.
  userAgent?: string;
  referrer?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  // Validation
  if (
    !body.firstName || body.firstName.length < 2 ||
    !body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
    body.consent !== true ||
    (body.locale !== 'de' && body.locale !== 'en')
  ) {
    return NextResponse.json({ error: 'invalid-input' }, { status: 400 });
  }

  // Enrich
  const lead = {
    ...body,
    capturedAt: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
  };

  // Always log (visible in Vercel runtime logs)
  console.log('[lead]', JSON.stringify(lead));

  // Forward to webhook if configured
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
        // Still return success to client — we have the log
      }
    } catch (err) {
      console.error('[lead] webhook fetch failed', err);
    }
  }

  return NextResponse.json({ ok: true });
}
```

**Why this shape:**
- Validates server-side (don't trust the client).
- Always logs to Vercel runtime logs as a permanent fallback (queryable via Vercel CLI or dashboard).
- Forwards to a webhook if `LEAD_WEBHOOK_URL` is set — this is where you wire ConvertKit / ActiveCampaign / Mailchimp / a Zapier funnel that does email-sending + CRM creation.
- Always returns `200 OK` if input validation passed, even if the webhook failed — because the log entry is the authoritative record. A nightly job can replay any leads that aren't in the CRM.

**Why no email-sending in this route:** keeping send logic out of the codebase means you can swap email providers without a deploy. Your webhook tool handles "send welcome email + add to nurture sequence."

### `localStorage` fallback

After a successful submit (server returned 200), also write to `localStorage`:

```ts
const existing = JSON.parse(localStorage.getItem('buildforthem-leads') ?? '[]');
existing.push({ firstName, email, capturedAt: new Date().toISOString() });
localStorage.setItem('buildforthem-leads', JSON.stringify(existing));
```

This is *not* a substitute for server capture — it's a backup. If the user re-opens the modal on the same device, we can pre-fill from this. If something goes wrong server-side, the data isn't lost from their browser.

### Source tracking

Every `<TrainingCTA>` must pass a `source` prop (`'hero'`, `'header'`, `'trainer'`, `'ladder'`, `'guarantee'`, etc.) so we can track which CTA placement converts best. This goes into the API payload.

### GDPR / DSGVO requirements

- Consent checkbox is required (no pre-ticked default).
- Privacy policy link in consent label.
- Privacy policy at `/datenschutz` (DE) and `/privacy` (EN) needs a "lead capture & email marketing" section explaining: what data is captured, why, how long it's stored, third parties (your email tool), and the right to withdraw consent. The existing `dictionaries/de.ts` legal text is a placeholder — flag for lawyer review **before launch**.
- IP is captured server-side for fraud/compliance only; should be mentioned in privacy text.
- Need a way to delete a lead on request (manual via your email tool — no need to build a self-serve flow in v1).

---

## Out of scope

- Backend storage of lead beyond log + webhook forward (no database, no admin panel).
- Email sending from the Next.js app (delegated to webhook target).
- Cookie banner / consent manager — that's a separate compliance task already on the docket.
- A/B testing the popup copy or fields (do it after launch with real data).
- Multi-step popup (mini-quiz inside) — explicitly rejected above; revisit if cold opt-in rate underperforms.
- Localization of the privacy policy text beyond what's already in the dictionary structure — flagged for lawyer review.

---

## Risks & tradeoffs

- **The popup adds one click between intent and `/v4` content.** Some visitors who would have clicked through will bounce at the form. The trade is: those who do submit are now leads, not anonymous traffic. Track opt-in rate on day 1 — if it's under ~25%, consider reducing fields to email-only.
- **DSGVO consent text needs lawyer review.** Draft is good enough to ship to dev; not to production.
- **DNS propagation can take up to 48h.** Schedule the domain cutover for a low-traffic window.
- **Webhook outages = silent lead loss** (caught only in logs). Mitigation: `LEAD_WEBHOOK_URL` should point at a tool with retry semantics (Make/Zapier have these; a custom endpoint should add a queue).
- **Multiple `<TrainingCTA>` mounts each render a Radix Dialog.** Negligible perf cost (~6kb gzip total), but if it becomes a concern, lift modal state to React Context.

---

## Sequence to ship

1. **Bilingual refactor first** — follow the existing plan ([`docs/superpowers/plans/2026-05-27-bilingual-architecture.md`](../plans/2026-05-27-bilingual-architecture.md)) Phases 1–4. Don't add the popup mid-refactor; it complicates the component refactor.
2. **Then the popup** — add `ModalDict` to dictionary types, populate `de.ts` and `en.ts`, build `LeadCaptureModal`, build `TrainingCTA`, swap every `/v4` button. One PR.
3. **Then the API route** — `app/api/lead/route.ts` + env var setup in Vercel.
4. **Then domain cutover** — add `buildforthem.com` in Vercel, configure DNS, verify both domains.
5. **Then privacy text review** — lawyer pass on DSGVO copy before launch.
6. **Launch.**
