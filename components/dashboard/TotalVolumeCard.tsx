'use client';

import type { VolumeBySport } from '@/lib/activity-providers/types';

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

interface TotalVolumeCardProps {
  totalSeconds: number;
  bySport: VolumeBySport;
  year: number;
}

export default function TotalVolumeCard({
  totalSeconds,
  bySport,
  year,
}: TotalVolumeCardProps) {
  const totalHours = totalSeconds / 3600;

  const sports = [
    { label: 'CYCLING', seconds: bySport.cycling, color: 'text-amber-600' },
    { label: 'RUNNING', seconds: bySport.running, color: 'text-green-600' },
    { label: 'SWIMMING', seconds: bySport.swimming, color: 'text-blue-600' },
  ];

  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-500">
          Total Training Volume ({year})
        </h3>
        <svg
          className="w-8 h-8 text-green-500/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <div className="mb-6">
        <span className="text-5xl font-bold text-gray-900">{totalHours.toFixed(1)}</span>
        <span className="text-xl text-gray-400 ml-2">hours</span>
      </div>
      <div className="space-y-3">
        {sports.map(({ label, seconds, color }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className={`text-sm font-medium ${color}`}>{label}</span>
            <span className="text-gray-700 font-medium">{formatDuration(seconds)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
