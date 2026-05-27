'use client';

import ContactForm from '@/components/quiz/ContactForm';

export default function CanonicalContact() {
  return (
    <ContactForm
      variant="canonical"
      nextPage="/quiz/success"
    />
  );
}
