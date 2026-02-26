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
          <div
            key={race.id}
            className="rounded-xl bg-gray-50 border border-gray-200 p-4 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-12px)',
              transitionDelay: `${300 + i * 120}ms`,
            }}
          >
            <div className="font-medium text-gray-900">{race.name}</div>
            <div className="text-sm text-gray-500 mt-1">
              {race.date} • {race.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
