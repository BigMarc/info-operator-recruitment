'use client';

import ContactForm from '@/components/quiz/ContactForm';

export default function V3Contact() {
  return (
    <ContactForm 
      variant="v3" 
      nextPage="/v3/success" 
    />
  );
}
