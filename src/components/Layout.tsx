import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>
      <main className="pt-24 min-h-screen">
        {children}
      </main>
    </div>
  );
}
