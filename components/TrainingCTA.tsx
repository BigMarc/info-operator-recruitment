'use client';

import { useState, ReactNode } from 'react';
import type { ModalDict, Locale } from '@/dictionaries/types';
import LeadCaptureModal from './LeadCaptureModal';

export interface TrainingCTAProps {
  locale: Locale;
  dict: ModalDict;
  source: string;
  className?: string;
  children: ReactNode;
  redirectTo?: string;
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
