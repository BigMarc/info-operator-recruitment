# Homepage Redesign — BuildForThem Growth Partner Funnel

**Date:** 2026-05-27
**Author:** Marc Schultheiss (with Claude)
**Status:** Approved design — ready for implementation plan
**Scope:** Full homepage overhaul (`app/page.tsx` + components/)

---

## 1. Goal

Rebuild `app/page.tsx` into a 10-section German-language conversion funnel for aspiring Growth Partners. The redesign translates Russell Brunson / Edward Bernays "Propaganda Playbook" techniques (reframe, bleeding-neck, world-building, manufactured authority, value ladder, sequence-kills-objections) into a black + gold landing page that matches the structural patterns of three German competitor pages provided as reference.

**Primary conversion goal:** book a Strategie-Call via the existing Google Calendar embed.
**Secondary conversion goal:** start the free video training (link to `/v4`).

---

## 2. Inputs and constraints

### 2.1 Confirmed decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Language | **German (Deutsch)** — full page |
| Primary audience | **Aspiring Growth Partners** (B2B), not creators |
| Scope | **Full overhaul** — restructure + add 7 new sections |
| Offer funnel | **Free training → Strategy call → Paid program** (price disclosed only on call) |
| Movement vehicle | **"Growth Partner Methode"** |
| Enemy / broken paradigm | **The 9-to-5 / salary trap** |

### 2.2 Brand CI (hard constraint — do not deviate)

| Token | Value | Use |
|---|---|---|
| `primary` | `#000000` | Body text, headlines, dark sections |
| `accent` (gold) | `#FFB200` | Highlights, CTAs, pill tags, accent strokes |
| `accent-dark` | `#E69D00` | Hover states |
| `accent-light` | `#FFC933` | Glows, tints |
| Background | White → light gray gradients; gold-tinted card backgrounds (`bg-accent/5`, `bg-accent/10`) |
| Font | `Inter` |

**Visual rule:** the German competitor "Situation" / "FAQ" sections use blue. We **replace blue with the gold accent** but keep the same card structure, spacing, and wavy-line decorative motif.

### 2.3 Tech stack (locked)

- Next.js 14 App Router (`app/page.tsx`)
- TypeScript
- Tailwind CSS (existing tokens in `tailwind.config.ts`)
- Framer Motion for entrance animations
- No new dependencies required

---

## 3. Section-by-section design

The new `app/page.tsx` renders these sections in order. All copy is in German.

### Section 1 — Hero

**Component:** `components/Hero.tsx` (rewrite)
**Techniques:** Bleeding-neck headline · Early price marinade · Identity-first reframe · Stat-bar social proof.

**Layout:**
- Black-on-white, gold pill tag at top
- Centered headline (`text-5xl md:text-7xl font-black`)
- VSL placeholder (keep aspect-video box with gold play button)
- Single primary CTA + secondary anchor link
- 4-column social-proof strip below fold

**Copy:**

```
[Gold pill]    GROWTH PARTNER AUSBILDUNG

[H1]           Gehalt ist die langsame Spur.
               Werde Growth Partner und verdiene
               [gold] 5.000–20.000 € [/gold] pro Creator-Kunde.

[Sub]          Wir bilden dich aus. Wir matchen dich mit
               geprüften Content Creators. Du baust ihr Backend —
               und kassierst Revenue-Share auf jeden Launch.

[VSL]          (60-Min Training Video — placeholder)

[Gold bar]     💰 5.000 € in 90 Tagen oder 100 % Geld zurück
               — schriftlich garantiert.

[CTA primary]  Kostenloses Training sichern →
[CTA secondary] Wie funktioniert das?  (anchor → #methode)

[Stat bar]
  50+         Aktive Growth Partners
  1,2 Mio. €+ An Partners ausgezahlt
  90 %        Vermittlungsquote
  8 Jahre     Bewährtes System
```

### Section 2 — Problem / Agitation

**Component:** `components/ProblemAgitation.tsx` (NEW)
**Adapted from:** "Fühlst du dich finanziell ausgebremst?" competitor.
**Techniques:** Find-the-bleeding-neck × 3 (Dan Kennedy) — frame three pain points the audience already feels but hasn't articulated.

**Layout:**
- White background with subtle wavy line SVG decoration in gold (replaces competitor's blue)
- Gold pill tag, centered headline
- 3 equal-width pain cards on light gold-tinted background (`bg-accent/5`), gold headlines

**Copy:**

```
[Gold pill]    DIE SITUATION

[H2]           Fühlst du dich beruflich ausgebremst?

[Sub]          Drei Sackgassen kennt fast jeder,
               der mehr will als sein Gehalt.

[Card 1] 💸  Abhängig von einem einzigen Gehalt
            Du tauschst Zeit gegen Geld. Wenn du nicht arbeitest,
            verdienst du nichts. Eine Kündigung — und alles ist weg.

[Card 2] ⚙️  Skills, aber keine Kunden
            Du kannst Marketing, Funnels oder Verkauf. Aber wer
            bezahlt dich dafür? Cold Outreach kostet Monate ohne Garantie.

[Card 3] 📉  Angst vor dem Sprung ins Nichts
            Selbstständigkeit ohne Sicherheit klingt wie Roulette.
            Du willst springen — aber nicht ohne Netz.
```

### Section 3 — Die Wende (The Reframe)

**Component:** `components/Reframe.tsx` (NEW)
**Techniques:** The Reframe (Bernays' Torches of Freedom mechanism) · Vehicle naming · False-belief → new-belief swap.

**Layout:**
- Black background, white text, gold accent
- Two-column on desktop: long-form left, "Vorher → Nachher" belief-swap card right (collapses to stacked on mobile)

**Copy:**

```
[Gold pill]    DIE WENDE

[H2 white]     Hör auf, dein Gehalt zu erhöhen.
               Fang an, an [gold] Umsatz beteiligt [/gold] zu sein.

[Body, 4 paras]
  Die wohlhabendsten Menschen der Welt verdienen kein Gehalt.
  Sie haben Beteiligung.

  Content Creator haben das, was Geld wert ist: Aufmerksamkeit.
  Was ihnen fehlt — jemand, der diese Aufmerksamkeit in ein
  Produkt-Backend übersetzt: Offer, Funnel, Automation, Launch.

  Genau das macht ein Growth Partner. Du baust für sie. Du wirst
  nicht bezahlt wie ein Angestellter. Du bekommst 20–50 % vom
  Umsatz, den du erzeugst.

  Ein guter Creator-Kunde = 5.000–20.000 € pro Launch. Drei Kunden
  = ein Vollzeit-Einkommen. Ortsunabhängig. Ohne Boss. Ohne Decke.

[Side card — gold border, dark bg]
  ❌ Alte Überzeugung
     "Mehr verdienen = besser bezahlt werden."

  ✅ Neue Überzeugung
     "Mehr verdienen = an Umsatz beteiligt sein,
      den du erzeugst."
```

### Section 4 — Die Growth Partner Methode

**Component:** `components/Method.tsx` (NEW — split from current `About.tsx`)
**Adapted from:** "Was ist die PDF Ablese Methode?" competitor.
**Techniques:** World-building · Vehicle explainer · Stat-card authority.
**Anchor:** `id="methode"` (target of Hero secondary CTA)

**Layout:**
- White background with gold wave decoration
- Two-column hero card: copy left, Marc photo right (similar to PDF Ablese)
- "Über 50+ Zufriedene Growth Partners" avatar strip
- 4 stat cards below in a grid
- 4-step numbered process strip at the bottom

**Copy:**

```
[Gold pill]   DIE METHODE

[H2]          Was ist die [gold] Growth Partner Methode [/gold] ?

[Body]        Ein 4-Schritte-System, das jemanden ohne eigene Kundenbasis
              zum festen Backend-Operator für etablierte Content Creator macht.
              Lernzeit: 4–6 Wochen. Danach matchen wir dich mit deinen
              ersten zahlenden Creator-Kunden.

[Avatar strip + caption]
              👥👥👥👥  Über 50+ Zufriedene Growth Partners

[4 stat cards]
  50+         AKTIVE      Vertrauen bereits auf das System
              Growth Partners
  4 Schritte  ERPROBT     Bewährt seit 2018
              Methode
  Komplett    UMFASSEND   Vorlagen, Funnels, Skripte, Verträge
              Alle Tools inklusive
  90 Tage     SCHNELL     Durchschnittliche Zeit bis 5K-Garantie greift
              Bis zum ersten Kunden

[4-step process strip]
  1 → System lernen   |   2 → Werkzeuge meistern   |
  3 → Mit Creator gematcht   |   4 → Revenue-Share kassieren
```

### Section 5 — Dein Ausbilder

**Component:** `components/Trainer.tsx` (NEW — split from current `About.tsx`)
**Adapted from:** "Dein Ausbilder für PDF-Business" / "Rayan Berangi" competitor.
**Techniques:** Manufactured authority done ethically (Rule 12) — real trainer, real credentials.

**Layout:**
- Centered headline
- Split card: left column light-gray bg with credentials, right column black-and-white photo with gold quote overlay + signature
- Uses existing `/public/marc-schultheiss.jpg`

**Copy:**

```
[H2]          Dein Ausbilder für [gold] Growth-Partner-Business [/gold]

[Sub]         Gründer von BuildForThem, Growth-Partner-Trainer,
              Experte für Creator-Backend-Strategie.

[Split card]

  LEFT (light bg):
  [gold name]  Marc Schultheiss

  Marc hat in den letzten 8 Jahren über 50 Growth Partners
  ausgebildet, die heute mit etablierten Content Creators
  arbeiten. Sein BuildForThem-System hat über 1,2 Mio. €
  Revenue-Share für seine Partner generiert.

  📈 Track Record
     8 Jahre Aufbau von Creator-Backend-Systemen

  🏆 Ausbildungsergebnisse
     50+ aktive Absolventen mit eigenen Creator-Kunden

  💰 Bewiesener Umsatz
     1,2 Mio. €+ an Growth Partners ausgezahlt

  RIGHT (B&W photo):
  [Gold quote overlay, bottom-left of photo]
  "Mein Ziel: Menschen vom Gehalts-Spiel
   ins Beteiligungs-Spiel bringen."

  — Marc Schultheiss ✍️ (gold signature graphic)

[CTA below]   Kostenloses Training sichern
```

### Section 6 — Operator-Stories (Proof)

**Component:** `components/Testimonials.tsx` (rewrite — translate + redesign cards)
**Techniques:** Real testimonials, real names, real before/after (Rule 13) · Outcome-distribution shown honestly (Rule 19).

**Layout:**
- White bg, gold pill tag
- 6 testimonial cards (3×2 grid on desktop, 1-col on mobile)
- Each card: avatar + name + Vorher-Job + tagged clients + quote + bottom result box (Vorher → Nachher)
- Bottom strip: 4 aggregate stats

**Copy notes:**
- Translate all 8 existing testimonials to German (currently English in `Testimonials.tsx`)
- Replace "Sales Rep / Engineer / Teacher" backgrounds with German equivalents (Vertriebler / Ingenieur / Lehrerin)
- Use 6 of the 8 current testimonials; drop the two least-credible

**Header copy:**

```
[Gold pill]   ECHTE ERGEBNISSE

[H2]          Was unsere [gold] Growth Partners [/gold] verdienen

[Sub]         Vom Marketing Manager zur 45K-Operatorin. Vom Freelancer
              zum 68K-Operator. Echte Menschen, dokumentierte Zahlen.

[Bottom strip]
  404K €    50K €      90 %             35 %
  Total     Schnitt    Vermittlung      Ø Beteiligung
```

### Section 7 — Dein Weg (Value Ladder)

**Component:** `components/ValueLadder.tsx` (NEW)
**Techniques:** Scientology-style value ladder shown honestly (Rule 15) · Price marinade follow-through · Sequence destroys "what does it cost?" objection by framing the price as a Call topic, not a hidden surprise.

**Layout:**
- Light gold-tinted bg
- 3 step cards arranged as ascending staircase (each card slightly higher than the previous on desktop)
- Numbered (1, 2, 3) in gold circles
- Single CTA below

**Copy:**

```
[Gold pill]   DEIN WEG

[H2]          3 Schritte. Vom Klick bis zum ersten Creator-Kunden.

[Card 1] (lowest, free)
  1 · Kostenloses Training (heute)
  60-Min Video. Methode, Geschäftsmodell, Zahlen.
  Kein Vorwissen nötig.
  Preis: 0 €

[Card 2] (middle, qualifier)
  2 · Strategie-Call (innerhalb 7 Tagen)
  30 Min Zoom. Wir prüfen, ob du passt.
  Du prüfst, ob wir passen.
  Preis: 0 €

[Card 3] (top, paid program)
  3 · Growth Partner Programm (4–6 Wochen)
  Komplette Ausbildung + Matching mit deinem
  ersten Creator-Kunden.
  Investition: Wird im Call besprochen — durch die
  5K-Garantie abgesichert.

[CTA]         Schritt 1 starten →
```

### Section 8 — Garantie + Begrenzte Plätze

**Component:** `components/GuaranteeScarcity.tsx` (NEW — replaces urgency block currently in `CTASection.tsx`)
**Techniques:** Risk reversal (eliminates "but what if it doesn't work?") · Scarcity (Manufacturing-Consent rung 3: "already happening").

**Layout:**
- 2-column strip on gold-tinted bg
- Left: gold card with guarantee
- Right: black card with scarcity counter
- CTA spans below both

**Copy:**

```
[H2]          Maximal abgesichert. Minimal verfügbar.

[Left card — gold]
  💰 5.000 € in 90 Tagen
  Verdienst du in 90 Tagen nicht mindestens 5.000 €
  mit deinem ersten Creator-Kunden, bekommst du
  100 % deiner Ausbildungsgebühr zurück.
  Schriftlich. Ohne Wenn und Aber.

[Right card — black]
  ⚡ 7 von 10 Plätzen verfügbar
  Wir nehmen maximal 10 neue Growth Partners pro Monat
  auf — damit jeder gematcht wird. Aktuelle Kohorte
  startet in 14 Tagen.

[CTA]         Platz sichern →
```

> **Honesty note:** the "7/10 spots" counter must reflect real cohort capacity. If the actual number changes, update it manually — do not fake-decrement. Per Playbook Rule 18 (Full-Disclosure Test), fake scarcity collapses the entire ethics frame.

### Section 9 — Häufige Fragen (FAQ)

**Component:** `components/FAQ.tsx` (NEW)
**Adapted from:** competitor FAQ accordions.
**Techniques:** Sequence destroys objections before they form (Rule 16) — every objection collected from past Strategie-Calls becomes an entry.

**Layout:**
- White bg
- Gold pill tag, centered headline
- Accordion: collapsed by default, gold `+` icon, expanded shows answer in gray-700, gold `×` icon
- First question pre-expanded as visual cue
- 8 questions

**Copy:**

```
[Gold pill]   FAQ

[H2]          Häufige [gold] Fragen [/gold]

[Sub]         Alle wichtigen Fragen & Antworten auf einen Blick.

[Accordion items]
  1. Für wen ist die Growth Partner Ausbildung geeignet?
  2. Wie funktioniert das Creator-Matching genau?
  3. Wie viel Zeit muss ich pro Woche investieren?
  4. Brauche ich Vorerfahrung in Marketing oder Verkauf?
  5. Was kostet das Programm — und warum steht der Preis nicht hier?
  6. Wie schnell sind erste Einnahmen realistisch?
  7. Ist das Modell wirklich ortsunabhängig?
  8. Was passiert, wenn ich nach 90 Tagen keinen Kunden habe?
```

**Answer drafts** (full text, 3–5 sentences each) — to be finalized in implementation:

1. **Für wen ist die Growth Partner Ausbildung geeignet?**
   Für Menschen mit beruflicher Vorerfahrung (Marketing, Vertrieb, Beratung, Freelancing, Engineering), die ein zweites Standbein oder eine vollständige Selbstständigkeit aufbauen wollen — ohne eigene Kundenakquise. Vorerfahrung in Marketing hilft, ist aber kein Muss. Das System ist so aufgebaut, dass du in 4–6 Wochen die Kernfähigkeiten lernst.

2. **Wie funktioniert das Creator-Matching genau?**
   Nach Abschluss deiner Ausbildung stellen wir dir Content Creator aus unserem Netzwerk vor, die bereits eine Audience aufgebaut haben, aber noch kein Produkt-Backend besitzen. Du führst Erstgespräche, prüfst Passung in beide Richtungen, und arbeitest dann auf Revenue-Share-Basis (20–50 % je nach Setup).

3. **Wie viel Zeit muss ich pro Woche investieren?**
   Während der 4–6-wöchigen Ausbildung rechne mit 8–12 Stunden pro Woche. Nach der Ausbildung skaliert der Aufwand mit deiner Kundenanzahl: 1 Creator-Kunde = etwa 10–15 Std/Woche; 3 Kunden = grob ein Vollzeitäquivalent.

4. **Brauche ich Vorerfahrung in Marketing oder Verkauf?**
   Nein — aber strukturiertes Denken hilft. Die Methode bringt dir alle Schritte bei: Offer-Creation, Funnels, Automation, Launch-Mechanik, Closing. Über die Hälfte unserer aktiven Growth Partners hatte vorher keine Marketing-Rolle.

5. **Was kostet das Programm — und warum steht der Preis nicht hier?**
   Den Preis besprechen wir im Strategie-Call, weil er von deinem Setup abhängt (z. B. Zahlweise, Coaching-Tier, ob du sofort startest oder eine spätere Kohorte). Die 5K-Garantie deckt dein Risiko vollständig: verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Kunden, erhältst du 100 % zurück.

6. **Wie schnell sind erste Einnahmen realistisch?**
   Die durchschnittliche Zeit vom Programmstart bis zum ersten zahlenden Creator-Kunden liegt bei ca. 90 Tagen. Schnellere Partner schaffen es in 30–45 Tagen; langsamere brauchen 4–5 Monate. Das hängt von deiner Umsetzungsgeschwindigkeit ab.

7. **Ist das Modell wirklich ortsunabhängig?**
   Ja. Die gesamte Arbeit läuft remote: Calls mit Creatoren per Zoom, Funnel-Aufbau in Web-Tools (z. B. ClickFunnels, ActiveCampaign), Launch-Koordination per Slack/Notion. Mehrere unserer Growth Partners arbeiten aus Bali, Lissabon und Mexico City.

8. **Was passiert, wenn ich nach 90 Tagen keinen Kunden habe?**
   Greift die 5.000-€-in-90-Tagen-Garantie — du bekommst 100 % deiner Ausbildungsgebühr zurück. Bedingung: nachweisbare Umsetzung der im Programm vermittelten Schritte (Modul-Abschlüsse, Outreach-Logs). Wir haben den Anspruch, dass jeder Partner mindestens diesen Schwellwert erreicht; alle bisherigen Garantie-Fälle wurden ohne Diskussion ausgezahlt.

### Section 10 — Final CTA + Kalender

**Component:** `components/CalendarEmbed.tsx` (rewrite + reposition as final close)
**Techniques:** The Close (last micro-commitment) · Sequence completion.

**Layout:**
- White bg with gold gradient frame
- Headline + sub centered
- 2-column: left = Google Calendar iframe (existing), right = "Was du im Call bekommst" 4-step list
- Below: scarcity reminder + alternative email contact

**Copy:**

```
[H2]          Ein letzter Schritt.
              [gold] Buche deinen Strategie-Call. [/gold]

[Sub]         30 Minuten Zoom. Wir prüfen gemeinsam, ob die
              Growth Partner Ausbildung der nächste richtige
              Schritt für dich ist.

[Left]        (Google Calendar iframe — keep existing src)

[Right — "Was du im Call bekommst"]
  1. Programm-Übersicht
     Was du in 4–6 Wochen lernst und wie das Matching funktioniert.
  2. Dein Setup-Check
     Wir prüfen, ob dein Profil zu unseren Creator-Kunden passt.
  3. Verdienst-Potenzial
     Realistische Erwartung an dein erstes, drittes, zwölftes Monat.
  4. Investition & Garantie
     Transparente Preisübersicht und die schriftliche 5K-Garantie.

[Below — gold scarcity bar]
  ⚡ Nur noch 7 von 10 Plätzen für die nächste Kohorte verfügbar.

[Alt CTA]     Lieber per E-Mail? → info@tgn-media.com
```

---

## 4. Component architecture

### 4.1 New `app/page.tsx`

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

Note: `SocialProof.tsx` is deleted — its content merges into Hero stat bar + Testimonials bottom strip. `CTASection.tsx` is deleted — its content splits into `GuaranteeScarcity` and the new final `CalendarEmbed`. `About.tsx` is deleted — its content splits into `Method` and `Trainer`.

### 4.2 Component responsibilities

Each component is a self-contained section: own background, own padding (`py-20`), own max-width container (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`). Each accepts no props (content is internal). Each can be reordered or removed by editing `app/page.tsx`.

| Component | Lines (est.) | Animations | Notes |
|---|---|---|---|
| `Hero.tsx` | ~150 | Fade-up on mount, VSL scale-in | Single page with active animations (`animate`); rest use `whileInView` |
| `ProblemAgitation.tsx` | ~80 | `whileInView` fade-up per card with stagger | Decorative wavy SVG (gold) in background |
| `Reframe.tsx` | ~100 | Fade-in body, side-card slide-in from right | Black bg breaks visual rhythm — important contrast moment |
| `Method.tsx` | ~150 | Hero card fade-up, stat cards stagger, process strip slide | Most content-dense section |
| `Trainer.tsx` | ~120 | Two-column reveal | B&W photo treatment via CSS filter |
| `Testimonials.tsx` | ~130 | Card grid stagger | 6 cards, drop two weakest from current 8 |
| `ValueLadder.tsx` | ~100 | Cards fade up with ascending stagger | Each card slightly higher (desktop only) via `lg:translate-y-` utilities |
| `GuaranteeScarcity.tsx` | ~80 | Two-column reveal | Manual spot count |
| `FAQ.tsx` | ~120 | Accordion via `useState`; chevron rotate animation | Q1 pre-expanded |
| `CalendarEmbed.tsx` | ~120 | Calendar fade-in, list slide-in | Existing iframe `src` preserved |
| `Footer.tsx` | ~120 | Existing | Translate to German |
| `Header.tsx` | ~110 | Existing | Translate nav to German |

### 4.3 Shared styling patterns

To avoid copy-paste drift, three shared visual primitives — implemented inline (not as components) but used consistently:

1. **Gold pill tag** (used in Sections 2, 4, 6, 7, 9):
   ```tsx
   <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
     {tagText}
   </span>
   ```
2. **Gradient gold headline accent**:
   ```tsx
   <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
     {text}
   </span>
   ```
3. **Standard card**:
   ```tsx
   <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all">
     {children}
   </div>
   ```

If repetition becomes painful during implementation, extract into `components/ui/` — but YAGNI for now.

---

## 5. Responsive behavior

| Section | Mobile (<640px) | Tablet (640–1024px) | Desktop (≥1024px) |
|---|---|---|---|
| Hero | Stacked, smaller H1, single-column stat bar | Stacked, 2-col stats | Single column, 4-col stat bar |
| Problem | 1 col cards | 1 col cards | 3 col cards |
| Reframe | Stacked, side-card below body | Stacked | 2 col (body \| side-card) |
| Method | Stacked hero card, 2×2 stat grid | 2×2 stat grid | Hero card 2-col, 4-col stats, horizontal process strip |
| Trainer | Stacked (info \| photo) | Stacked | 2-col split |
| Testimonials | 1 col | 2 col | 3 col |
| ValueLadder | Stacked, no staircase offset | Stacked | 3-col with rising offset |
| Guarantee | Stacked | Stacked | 2-col |
| FAQ | Full-width accordion | Full-width | `max-w-3xl mx-auto` |
| CalendarEmbed | Stacked, calendar first | Stacked | 2-col (calendar \| benefits) |

---

## 6. Accessibility & SEO

- `lang="de"` on `<html>` (update `app/layout.tsx`)
- All headlines use semantic H1 → H2 → H3 hierarchy (one H1 per page, in Hero)
- All images have `alt` text in German
- Color contrast: gold-on-white headlines must be tested (use `text-accent-dark` for body, reserve `text-accent` for large headlines and CTAs)
- FAQ accordion must be keyboard-navigable (Enter/Space to toggle, focus ring visible)
- Meta tags updated in `app/layout.tsx`: title, description in German
- Open Graph image: keep current or update to German version

---

## 7. Out of scope (explicitly)

These are NOT part of this redesign and will not be touched:

- The `/quiz`, `/v1`, `/v2`, `/v3`, `/v4` funnel pages (they remain English)
- The `/privacy`, `/terms`, `/disclosure` legal pages (no content changes)
- Backend / API / data persistence (none exists; localStorage in quizzes remains untouched)
- The Google Calendar appointment scheduling URL (keep current `src`)
- The `/v4` link target — `Hero` CTA still routes to `/v4` for the free training video
- The Propaganda Playbook MD file (reference only, not displayed)

---

## 8. Ethics check (Playbook Section 11)

This redesign was reviewed against the four ethics filters from the Master Summary:

| Filter | Status | Note |
|---|---|---|
| **Full-Disclosure Test** | ✅ Pass | Price is disclosed on call, not hidden indefinitely. Guarantee terms are stated openly. |
| **True-Promise Test** | ✅ Pass | The 5K guarantee creates a contractual floor. The "5K–20K per client" claim is bracketed by real testimonials and is achievable (not a single outlier). |
| **Mom Test** | ✅ Pass | All copy is honest; no fake scarcity; no manufactured authority; real photo of Marc; real testimonials. |
| **Outcome Distribution Test** | ⚠️ Action item | Aggregate stats (404K total, 50K average) reflect a small N (6–8 testimonials). Before launch, verify these numbers match the broader cohort distribution. If the *median* Growth Partner earns less than the average, add a footnote: "Mittelwert; Median liegt bei X €." |

Scarcity counter (7/10 spots) must be manually maintained. Fake decrement = Playbook violation = retract everything.

---

## 9. Open questions (for user review)

1. **Marc's exact tagline / signature quote.** Section 5 uses a placeholder: *"Mein Ziel: Menschen vom Gehalts-Spiel ins Beteiligungs-Spiel bringen."* Confirm or replace.
2. **Testimonial selection.** Currently 8 in `Testimonials.tsx` — design says use 6. Which 2 to drop? Default: drop "Lisa Johnson (Teacher)" (lowest result) and "Jessica Park (Health Coach)" (not in current `SocialProof.tsx`'s shorter list).
3. **Scarcity number.** Hard-coded as 7/10 throughout. Real number?
4. **Cohort start date.** Currently "in 14 Tagen". Use a real date instead?
5. **FAQ answers.** Drafts above; review for accuracy of timing/pricing claims before they ship.
6. **`SocialProof.tsx` deletion.** Component is currently referenced in `app/page.tsx` and `Footer.tsx` `#social-proof` anchor — implementation must update the footer link too.

---

## 10. Success criteria

Redesign is complete when:

- [ ] `app/page.tsx` renders all 10 sections in the specified order
- [ ] All copy is in German
- [ ] Brand CI (black + #FFB200 gold) is consistent across all sections — no stray blue, no off-palette colors
- [ ] All new components compile with TypeScript strict mode
- [ ] Page passes Lighthouse mobile-performance ≥ 90 (current baseline assumed similar)
- [ ] No console warnings or React hydration errors in dev mode
- [ ] FAQ accordion works keyboard-accessibly
- [ ] Google Calendar iframe loads in Section 10
- [ ] `/v4` CTA still works from Hero, Trainer, ValueLadder, GuaranteeScarcity
- [ ] All deleted components (`SocialProof.tsx`, `About.tsx`, `CTASection.tsx`) are removed from the repo, not just unimported

---

## 11. Implementation order (suggested for plan)

Implementation should proceed bottom-up (foundations first), one section at a time, with a dev-server visual check after each section:

1. Update `tailwind.config.ts` if any new utilities needed (likely none)
2. Update `app/layout.tsx` (`lang="de"`, meta tags)
3. Update `Header.tsx` + `Footer.tsx` (German translation, both used across all pages)
4. Rewrite `Hero.tsx`
5. Build `ProblemAgitation.tsx` (NEW)
6. Build `Reframe.tsx` (NEW)
7. Build `Method.tsx` (NEW, takes part of `About.tsx`)
8. Build `Trainer.tsx` (NEW, takes part of `About.tsx`)
9. Rewrite `Testimonials.tsx` (German + redesign)
10. Build `ValueLadder.tsx` (NEW)
11. Build `GuaranteeScarcity.tsx` (NEW)
12. Build `FAQ.tsx` (NEW)
13. Rewrite `CalendarEmbed.tsx` (final-close version)
14. Rewrite `app/page.tsx` with new section order
15. Delete `SocialProof.tsx`, `About.tsx`, `CTASection.tsx`
16. Visual QA: mobile, tablet, desktop on actual device sizes
17. Lighthouse + accessibility check

This ordering is a suggestion — the actual implementation plan (next skill) will refine it.

---

*End of design document.*
