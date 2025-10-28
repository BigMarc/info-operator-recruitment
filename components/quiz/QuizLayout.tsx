'use client';

import { ReactNode } from 'react';

interface QuizLayoutProps {
  children: ReactNode;
  variant: 'v1' | 'v2' | 'v3';
}

export default function QuizLayout({ children, variant }: QuizLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
