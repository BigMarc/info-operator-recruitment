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

  console.log('[lead]', JSON.stringify(lead));

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
