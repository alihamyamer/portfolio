'use client';

import type { MonthlyVolume } from '@/lib/activity-providers/types';

interface MonthlyVolumeCardProps {
  monthly: MonthlyVolume[];
  year: number;
}

function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
  return date.toLocaleString('default', { month: 'short' });
}

export default function MonthlyVolumeCard({ monthly, year }: MonthlyVolumeCardProps) {
  const maxSeconds = Math.max(
    ...monthly.map((m) => m.totalSeconds),
    1
  );

  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-500">
            Monthly Training Volume
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">Breakdown by sport</p>
        </div>
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      </div>
      {monthly.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          No data for {year}
        </div>
      ) : (
        <div className="space-y-3">
          {monthly.map(({ month, totalSeconds }) => {
            const hours = totalSeconds / 3600;
            const widthPct = (totalSeconds / maxSeconds) * 100;
            return (
              <div key={month} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-12">
                  {formatMonth(month)}
                </span>
                <div className="flex-1 h-6 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-green-500/80 rounded-lg transition-all duration-300"
                    style={{ width: `${Math.max(widthPct, 2)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-700 w-16 text-right">
                  {hours.toFixed(1)}h
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
