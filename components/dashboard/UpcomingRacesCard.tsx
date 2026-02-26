'use client';

import type { Race } from '@/data/races';

interface UpcomingRacesCardProps {
  races: Race[];
}

export default function UpcomingRacesCard({ races }: UpcomingRacesCardProps) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-500 mb-4">
        Upcoming Goal Races
      </h3>
      <div className="space-y-3">
        {races.map((race) => (
          <div
            key={race.id}
            className="rounded-xl bg-gray-50 border border-gray-200 p-4"
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
