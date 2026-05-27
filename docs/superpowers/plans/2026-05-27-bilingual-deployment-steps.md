# Bilingual Deployment — Manual Steps (Vercel + DNS)

> The code changes are done and committed. These steps happen in dashboards (Vercel + your domain registrar) — they cannot be automated from this repo.

**Status after code work:**
- `app/[locale]/` route structure live (homepage, `/v4`, `/v4/success`, `/privacy`, `/terms`, `/disclosure`)
- Middleware routes `buildforthem.de` → German, `buildforthem.com` → English
- Both domains will serve from the same Vercel project
- `/agb`, `/v1`, `/v2`, `/v3`, `/quiz` stay as flat routes (middleware bypasses them)
- Build verified passing locally
- Sitemap at `/sitemap.xml` includes both domains with hreflang

---

## Step 1: Push the redesign to GitHub

```bash
git push origin main
```

Vercel auto-deploys from `main`. Wait for the deploy to go green in the Vercel dashboard.

## Step 2: Add `buildforthem.com` to the Vercel project

1. Open https://vercel.com/dashboard → click the `info-operator-recruitment` project
2. **Settings → Domains**
3. Click **Add** → enter `buildforthem.com` → **Add**
4. Vercel shows DNS instructions specific to your registrar. Either:
   - **Apex (`buildforthem.com`):** A record → `76.76.21.21`, OR
   - **CNAME (`www.buildforthem.com`):** CNAME → `cname.vercel-dns.com`
5. Note exactly what Vercel shows you and apply those records at your registrar (see Step 4)

## Step 3: Add `buildforthem.de` to the same project

1. Same flow: **Settings → Domains** → **Add** → `buildforthem.de`
2. Follow Vercel's specific DNS instructions

## Step 4: Configure DNS at your domain registrar

At your domain registrar (GoDaddy, Cloudflare, Namecheap, etc.) for each domain:

| Record Type | Name | Value | Notes |
|---|---|---|---|
| A | `@` (apex) | `76.76.21.21` | Vercel anycast |
| CNAME | `www` | `cname.vercel-dns.com` | If you want `www.buildforthem.de` to also work |

Or follow whatever Vercel's UI tells you — it adapts based on your domain setup.

Propagation usually takes 5–30 minutes. Vercel auto-provisions SSL via Let's Encrypt as soon as DNS is verified.

## Step 5: Verify both domains

Once Vercel shows both domains as ✅ verified with SSL:

- Visit `https://buildforthem.de` → expect German homepage, `<html lang="de">`
- Visit `https://buildforthem.com` → expect English homepage, `<html lang="en">`
- Click the header "EN" pill on `.de` → should jump to `https://buildforthem.com`
- Click the header "DE" pill on `.com` → should jump to `https://buildforthem.de`
- Visit `https://buildforthem.de/v4` → German
- Visit `https://buildforthem.com/v4` → English
- Visit `https://buildforthem.de/v1` → English quiz (bypassed)
- Visit `https://buildforthem.de/agb` → German AGB (bypassed)

## Step 6: Submit sitemaps to Google Search Console (optional)

1. Add both domains as separate properties in https://search.google.com/search-console
2. Submit sitemaps:
   - `https://buildforthem.de/sitemap.xml`
   - `https://buildforthem.com/sitemap.xml`

Google will start indexing each domain in its target language.

## Step 7: (Recommended) Have a lawyer review legal text

The German legal pages (`/privacy`, `/terms`, `/disclosure`) contain drafted text marked with:
> *Hinweis: Dieser Text ist ein Entwurf. Vor Veröffentlichung von einem Rechtsanwalt prüfen lassen.*

Same for English. Edit `dictionaries/de.ts` and `dictionaries/en.ts` (the `legal` sections) once you have lawyer-approved text, then commit + push.

---

## Troubleshooting

**"Both domains show the same language."** Middleware isn't reading the right `host` header. Check Vercel function logs for the request; if `host` is `vercel.app` (preview) it falls back to default (`de`). Production domains should be detected correctly.

**"Some pages 404 on production."** Likely the build didn't include the dynamic locale routes. Check the build log shows `/[locale]` routes generated. If `next.config.js` has an unrecognized key it may silently drop config — clean it up if needed.

**"Switcher links go to localhost in dev."** Expected. The switcher always points to the production domain via `PRODUCTION_DOMAINS` (`i18n/config.ts`). In dev, navigate manually to `localhost:3000/de` or `localhost:3000/en`.

**"German content shows on `.com`."** Cache invalidation — Vercel sometimes caches the wrong locale during the initial domain setup. Force a fresh deploy: empty commit + push:
```bash
git commit --allow-empty -m "force redeploy"
git push origin main
```
