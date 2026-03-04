'use client';

import { useMemo, useState } from 'react';
import type { DailyActivities, ActivitySummary } from '@/lib/activity-providers/types';

interface TrainingCalendarProps {
  daily: DailyActivities[];
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  return `${minutes}m`;
}

function getEmojiForSport(sportType: string): string {
  switch (sportType) {
    case 'running':
      return '🏃';
    case 'cycling':
      return '🚴';
    case 'swimming':
      return '🏊';
    default:
      return '💪';
  }
}

export default function TrainingCalendar({ daily }: TrainingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const activitiesByDate = useMemo(() => {
    const map = new Map<string, ActivitySummary[]>();
    for (const day of daily) {
      map.set(day.date, day.activities);
    }
    return map;
  }, [daily]);

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth(); // 0-11

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const firstWeekday = firstDayOfMonth.getDay(); // 0-6, Sunday first
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const calendarCells: Array<{ dateStr: string | null; dayNumber: number | null }> = [];

  for (let i = 0; i < firstWeekday; i++) {
    calendarCells.push({ dateStr: null, dayNumber: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(monthIndex + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    calendarCells.push({ dateStr, dayNumber: day });
  }

  const selectedActivities =
    selectedDate && activitiesByDate.has(selectedDate)
      ? activitiesByDate.get(selectedDate) ?? []
      : [];

  const monthLabel = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-white/60">Training Calendar</h3>
          <p className="text-sm text-white/50 mt-0.5">
            Month view with emojis for each activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="p-1.5 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Previous month"
          >
            ‹
          </button>
          <span className="text-sm font-medium text-white/80 tabular-nums">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={goToNextMonth}
            className="p-1.5 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs text-white/40 mb-2">
        <div className="text-center">Sun</div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((cell, idx) => {
          if (!cell.dateStr || cell.dayNumber === null) {
            return <div key={idx} className="h-16 rounded-xl bg-transparent" />;
          }

          const activities = activitiesByDate.get(cell.dateStr) ?? [];
          const isSelected = selectedDate === cell.dateStr;
          const hasActivities = activities.length > 0;

          return (
            <button
              key={cell.dateStr}
              type="button"
              onClick={() => setSelectedDate(cell.dateStr!)}
              className={`h-16 rounded-xl border text-left px-2 py-1.5 flex flex-col justify-between transition-colors ${
                isSelected
                  ? 'bg-green-600/80 border-green-400 text-white'
                  : hasActivities
                    ? 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'
                    : 'bg-white/0 border-white/10 text-white/60 hover:bg-white/5'
              }`}
            >
              <span className="text-xs font-medium">{cell.dayNumber}</span>
              <div className="text-base leading-none">
                {hasActivities ? (
                  <span className="flex flex-wrap gap-0.5">
                    {activities.map((a, i) => (
                      <span key={`${a.id}-${i}`}>{getEmojiForSport(a.sportType)}</span>
                    ))}
                  </span>
                ) : (
                  <span className="text-[10px] text-white/30">—</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        {selectedDate && selectedActivities.length > 0 ? (
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-2">
              Activities on{' '}
              {new Date(selectedDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </h4>
            <ul className="space-y-1.5 text-sm text-white/80">
              {selectedActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center justify-between gap-3 bg-white/5 rounded-lg px-3 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {getEmojiForSport(activity.sportType)}
                    </span>
                    <span className="font-medium truncate max-w-[12rem]">
                      {activity.name}
                    </span>
                  </div>
                  <span className="text-xs text-white/60 tabular-nums">
                    {formatDuration(activity.movingTimeSeconds)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-white/50">
            Select a day to see activity name and duration.
          </p>
        )}
      </div>
    </div>
  );
}

