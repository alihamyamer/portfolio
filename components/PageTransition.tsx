'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: boolean;
}

export default function PageTransition({
  children,
  className = '',
  staggerChildren = false,
}: PageTransitionProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    prevPath.current = pathname;
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <div
      className={`${className} ${staggerChildren ? 'stagger-children' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  );
}
