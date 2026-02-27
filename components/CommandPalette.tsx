'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/about', label: 'About', icon: '👤' },
  { href: '/projects', label: 'Projects', icon: '💻' },
  { href: '/automation', label: 'Automation', icon: '⚡' },
  { href: '/dashboard', label: 'Training Dashboard', icon: '🏃' },
  { href: '/races', label: 'Races', icon: '🏅' },
  { href: '/contact', label: 'Get in Touch', icon: '✉️' },
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLinks = links.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredLinks.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredLinks.length) % filteredLinks.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredLinks[selectedIndex]) {
          router.push(filteredLinks[selectedIndex].href);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredLinks, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        <div className="flex items-center px-4 border-b border-slate-800">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full px-4 py-4 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="px-2 py-1 text-xs font-medium text-slate-500 bg-slate-800 rounded hover:bg-slate-700 transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredLinks.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              {filteredLinks.map((link, index) => (
                <button
                  key={link.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-green-500/10 text-green-400'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                  onClick={() => {
                    router.push(link.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
