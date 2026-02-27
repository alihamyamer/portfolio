'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/automation', label: 'Automation' },
  { href: '/dashboard', label: 'Training' },
  { href: '/races', label: 'Races' },
  { href: '/contact', label: 'Get in Touch' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-800 shadow-2xl">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full border border-green-500/30 text-green-400 font-medium hover:border-green-400 hover:bg-green-500/10 transition-colors"
          >
            ali-amer
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA & Command Hint */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-xs font-medium hover:bg-slate-800 hover:text-slate-300 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="flex items-center gap-0.5">
                <kbd className="font-sans">⌘</kbd>
                <kbd className="font-sans">K</kbd>
              </div>
            </button>
            <Link
              href="/contact"
              className="px-5 py-1.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_20px_rgba(22,163,74,0.5)]"
            >
              Start a Project
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
