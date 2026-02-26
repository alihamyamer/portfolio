import type { Metadata } from 'next';
import '../styles/globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'ali-amer',
  description: 'Showcase of personal projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-200 text-slate-800">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
