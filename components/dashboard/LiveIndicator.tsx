'use client';

interface LiveIndicatorProps {
  source: 'strava' | 'garmin' | null;
  lastUpdated?: string;
}

export default function LiveIndicator({ source, lastUpdated }: LiveIndicatorProps) {
  if (!source) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
        Not connected
      </div>
    );
  }

  const time = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : '--';

  return (
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="font-medium text-green-700">LIVE FROM {source.toUpperCase()}</span>
      <span className="text-gray-400">UPDATED {time}</span>
    </div>
  );
}
