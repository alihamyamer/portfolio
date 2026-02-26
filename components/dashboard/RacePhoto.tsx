'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function RacePhoto() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <Image
        src="/images/ironman-finish.png"
        alt="Ironman 70.3 Victoria finish — May 2025"
        width={800}
        height={1000}
        className="w-full h-auto object-cover"
        priority
      />
      <div className="bg-white px-5 py-3">
        <p className="text-sm text-gray-500">
          Ironman 70.3 Victoria &mdash; May 2025
        </p>
      </div>
    </div>
  );
}
