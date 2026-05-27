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
  redirectTo: string;
  source: string;
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
    // Storage full/disabled — silent ok, server has the lead.
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
        console.error('[lead] server returned', res.status);
      }
      persistLocalLead(state.firstName.trim(), state.email.trim());
      onOpenChange(false);
      router.push(localized(redirectTo, locale));
    } catch (err) {
      console.error('[lead] fetch failed', err);
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
