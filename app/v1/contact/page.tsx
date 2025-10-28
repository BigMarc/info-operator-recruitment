'use client';

import ContactForm from '@/components/quiz/ContactForm';

export default function V1Contact() {
  return (
    <ContactForm 
      variant="v1" 
      nextPage="/v1/success" 
    />
  );
}
