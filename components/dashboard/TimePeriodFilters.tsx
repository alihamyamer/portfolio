'use client';

import type { Period } from '@/lib/activity-providers/types';

const FILTERS: { value: Period; label: string }[] = [
  { value: 'last_4_weeks', label: 'Last 4 weeks' },
  { value: 'last_90_days', label: 'Last 90 days' },
  { value: 'ytd', label: 'YTD' },
];

interface TimePeriodFiltersProps {
  period: Period;
  year: number;
  onPeriodChange: (period: Period) => void;
  onYearChange: (year: number) => void;
}

export default function TimePeriodFilters({
  period,
  year,
  onPeriodChange,
  onYearChange,
}: TimePeriodFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onPeriodChange(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            period === value
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          {label}
        </button>
      ))}
      <select
        value={year}
        onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        className="px-4 py-2 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
