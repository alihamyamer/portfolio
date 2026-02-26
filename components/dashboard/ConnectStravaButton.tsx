'use client';

interface ConnectStravaButtonProps {
  connected: boolean;
}

export default function ConnectStravaButton({ connected }: ConnectStravaButtonProps) {
  return (
    <div className="flex items-center gap-2">
      {connected ? (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium border border-green-200">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          Connected
        </div>
      ) : (
        <a
          href="/api/auth/strava"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
        >
          Connect Strava
          <span aria-hidden>→</span>
        </a>
      )}
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-400 font-medium cursor-not-allowed text-sm"
        title="Garmin Connect API requires developer approval"
      >
        Connect Garmin (Coming soon)
      </button>
    </div>
  );
}
