'use client';

import ContactForm from '@/components/quiz/ContactForm';

export default function V2Contact() {
  return (
    <ContactForm 
      variant="v2" 
      nextPage="/v2/success" 
    />
  );
}
