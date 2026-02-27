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
      <body className="min-h-screen bg-slate-950 text-slate-200 selection:bg-green-500/30">
        {/* Global Background Pattern */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <SmoothScroll />
        <CommandPaletteProvider />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
