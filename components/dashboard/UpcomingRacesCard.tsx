'use client';

import { useEffect, useState } from 'react';
import type { Race } from '@/data/races';

interface UpcomingRacesCardProps {
  races: Race[];
}

export default function UpcomingRacesCard({ races }: UpcomingRacesCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h3 className="text-lg font-medium text-gray-500 mb-4">
        Upcoming Goal Races
      </h3>
      <div className="space-y-3">
        {races.map((race, i) => (
          <a
            key={race.id}
            href={race.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-gray-50 border border-gray-200 p-4 transition-all duration-500 hover:border-green-300 hover:bg-green-50/50 group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-12px)',
              transitionDelay: `${300 + i * 120}ms`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                  {race.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {race.date} &bull; {race.location}
                </div>
              </div>
              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
