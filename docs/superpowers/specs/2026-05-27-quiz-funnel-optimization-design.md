# Quiz funnel optimization — canonical ad LP

**Status:** Draft — pending user review
**Date:** 2026-05-27
**Owner:** Marc

## Problem

Current `/quiz` exposes 3 A/B variants (`/v1`, `/v2`, `/v3`) as a user-facing menu. Each variant is a different quiz length (2–5 questions), uses generic aspiration questions ("how much do you want to earn?"), has no investment-readiness qualifier, and ships in random per-variant color palettes (blue/green/orange) that don't match the `/v4` BuildForThem brand. The funnel ends at a Google-Calendar booking for a high-ticket sales call. The combination produces low call show-up and low close rates for paid ads — the funnel doesn't filter tire-kickers.

## Goal

Build a single canonical 4-question quiz at `/quiz` that ad campaigns can point to. Optimize for both **conversion** (visitors → booked calls) and **intent** (booked calls → showed up + closed) by climbing a commitment ladder ending in a soft investment-readiness qualifier.

## Scope decision

Add a new canonical quiz at `/quiz` while leaving `/v1`, `/v2`, `/v3` in place as future A/B slots. The `/quiz` index page becomes the actual ad landing page (not a variant menu).

## Non-goals

- No conditional / branching routing — linear flow only.
- No soft-disqualify path — everyone who completes the quiz reaches the calendar.
- No backend integration of quiz answers (stays in `localStorage` like current variants).
- No changes to `/v1`, `/v2`, `/v3`, `/v4`, or any other existing page.

## The 4 questions (German)

Each question follows the commitment-ladder principle: every answer increases the visitor's self-identification as "the right person for this offer."

### Q1 — Aspiration (entry hook + ambition filter)

> **Was willst du in den nächsten 90 Tagen erreichen?**

- 5.000 €/Monat als zweites Standbein
- 10.000 €/Monat als Hauptjob
- Den 9-to-5-Job ersetzen + ortsunabhängig arbeiten
- Erstmal nur informieren

### Q2 — Situation (segmentation + relevance)

> **Wo stehst du gerade beruflich?**

- Angestellt
- Selbstständig / Freelancer
- Student / in Ausbildung
- Aktuell zwischen Jobs

### Q3 — Commitment (effort qualifier)

> **Wie viel Zeit pro Woche kannst du investieren, um deinen ersten Creator-Kunden zu landen?**

- 5–10 Stunden
- 10–20 Stunden
- 20 Stunden oder mehr
- Weniger als 5 Stunden

### Q4 — Investment readiness (THE intent qualifier, soft framing)

> **Wenn wir ein klares Match sind: bist du bereit, in deine Ausbildung zu investieren, um in 90 Tagen 5.000 €+ mit deinem ersten Creator-Kunden zu machen?**

- Ja, wenn der Plan steht
- Ja, wenn es eine Finanzierungsoption gibt
- Erstmal will ich nur reinschnuppern

Q4 is the single biggest lead-quality lever for high-ticket sales-call funnels. Framing is intentionally soft (no €-amount mentioned) to maximize completion rate while still filtering out the "free-only" segment via the wording itself.

## Funnel structure

```
/quiz                  → Landing (ad destination) — hero + single CTA → /quiz/q1
/quiz/q1               → Aspiration question
/quiz/q2               → Situation question
/quiz/q3               → Commitment question
/quiz/q4               → Investment-readiness question
/quiz/contact          → Name + email + phone form
/quiz/success          → Calendar booking embed
```

All answers persist in `localStorage` under key `quiz-canonical-answers` (matching existing `quiz-v1-answers` pattern).

## /quiz landing page (the ad LP)

Replace the current variant-menu `/quiz/page.tsx` with a tight conversion-optimized landing:

- **Hero**: BuildForThem brand (white background, black + accent orange).
- **Headline**: *"In 2 Minuten herausfinden: Passt das Growth-Partner-Modell zu dir?"*
- **Sub**: *"4 kurze Fragen. Am Ende weißt du, ob das Modell zu deinem Leben passt — und ob wir der richtige Partner für dich sind."*
- **Single primary CTA**: *"Quiz starten →"* → `/quiz/q1`
- **Trust strip**: "✓ Kostenlos · ✓ Anonym · ✓ Kein Verkaufsgespräch erzwingen"
- **Mini social-proof below the fold**: 1–2 short testimonials or stat ("Über 150 ausgebildete Growth Partner")
- **No nav distractions** — link back to `/` only

## Component changes

Existing quiz components carry `variant: 'v1' | 'v2' | 'v3'` to drive per-variant colors. Extend the union with `'canonical'` and add a brand-matched palette (white background, orange accent matching `/v4`):

- `components/quiz/types.ts` — extend `variant` unions in `QuizData`
- `components/quiz/QuestionCard.tsx` — add `'canonical'` case → white→accent/5 gradient
- `components/quiz/ProgressBar.tsx` — add `'canonical'` case → accent gradient
- `components/quiz/AnswerButton.tsx` — add `'canonical'` case → accent border + shadow
- `components/quiz/ContactForm.tsx` — add `'canonical'` case + change submit button from blue→accent
- `components/quiz/SuccessPage.tsx` — add `'canonical'` case + dedicated success copy

Soft-fix while we're in the file: keep the existing v1/v2/v3 palettes untouched.

## New files

```
app/quiz/page.tsx              (REPLACE existing variant-menu with ad-LP)
app/quiz/q1/page.tsx           (NEW — wraps QuestionCard, variant="canonical")
app/quiz/q2/page.tsx           (NEW)
app/quiz/q3/page.tsx           (NEW)
app/quiz/q4/page.tsx           (NEW)
app/quiz/contact/page.tsx      (NEW — wraps ContactForm, variant="canonical", nextPage="/quiz/success")
app/quiz/success/page.tsx      (NEW — wraps SuccessPage, variant="canonical")
```

## Success-page copy (variant="canonical")

- **Title**: *"Top — du bist ein Match. Buche jetzt dein Strategie-Gespräch."*
- **Sub**: *"Basierend auf deinen Antworten haben wir noch Slots frei. Sichere dir dein kostenloses 30-Minuten-Gespräch."*
- Calendar embed (existing `CalendarEmbed` component, unchanged).
- "Was erwartet dich?" bullets (existing structure, minor copy refresh).

## Image choices

The existing v1/v2/v3 quizzes use Unsplash face photos for answer buttons. For Q1–Q4 in the canonical quiz, use thematically appropriate Unsplash imagery (laptop work, growth charts, etc.) consistent across all 4 questions to look like a single product, not a patchwork. Concrete URLs picked at implementation time.

## Tracking / analytics

Out of scope for this change. The `localStorage` writes match the existing pattern so any future analytics layer can pick up canonical answers the same way it would pick up v1/v2/v3 answers.

## Risks / tradeoffs

- **No backend persistence** — if a visitor abandons mid-quiz, the answers stay in their browser only. Acceptable for now; matches existing variants.
- **No disqualify path** — per user decision, every completion reaches the calendar. Q4's "reinschnuppern" answer still books a call. We accept the slightly noisier calendar in exchange for not over-engineering.
- **Three obsolete variants stay live** — `/v1`/`/v2`/`/v3` remain reachable and broken-ish (v1 especially). Cleanup is a separate task.

## Out of scope

- Cleanup of `/v1`, `/v2`, `/v3` — explicitly kept as A/B slots per user decision.
- Backend lead capture (CRM integration, email automation).
- Analytics / pixel firing on each question step.
- Bilingual English version of `/quiz`.
- Refactor of the per-variant color system into a token-based theme.
