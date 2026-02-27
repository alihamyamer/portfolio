import type { Metadata } from 'next';
import '../styles/globals.css';
import Navigation from '@/components/Navigation';
import SmoothScroll from '@/components/SmoothScroll';
import CommandPaletteProvider from '@/components/CommandPaletteProvider';

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
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-300">
        <SmoothScroll />
        <CommandPaletteProvider />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
