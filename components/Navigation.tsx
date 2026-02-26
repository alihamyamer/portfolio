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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-100/95 backdrop-blur-sm border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="px-4 py-2 rounded-full border border-green-600/60 text-green-700 font-medium hover:border-green-600 hover:bg-green-50 transition-colors"
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors flex items-center gap-2"
          >
            Start a Project
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
