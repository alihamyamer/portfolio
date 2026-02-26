'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TimePeriodFilters from '@/components/dashboard/TimePeriodFilters';
import LiveIndicator from '@/components/dashboard/LiveIndicator';
import TotalVolumeCard from '@/components/dashboard/TotalVolumeCard';
import UpcomingRacesCard from '@/components/dashboard/UpcomingRacesCard';
import MonthlyVolumeCard from '@/components/dashboard/MonthlyVolumeCard';
import { races } from '@/data/races';
import type { Period } from '@/lib/activity-providers/types';
import type { ActivitiesResponse } from '@/lib/activity-providers/types';

function DashboardContent() {
  const [period, setPeriod] = useState<Period>('ytd');
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<ActivitiesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const err = searchParams.get('error');
    if (err) {
      setError(
        err === 'config'
          ? 'Strava API not configured. Set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET.'
          : err === 'missing_code'
            ? 'Authorization was denied or no code received.'
            : err === 'token_exchange'
              ? 'Failed to exchange authorization code.'
              : err
      );
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/activities?period=${period}&year=${year}`)
      .then(async (res) => {
        const d = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(d.error || 'Failed to load activities');
        return d;
      })
      .then((d) => setData(d))
      .catch((err) => {
        setError(err.message || 'Failed to load activities');
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [period, year]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <LiveIndicator
              source={data?.connected ? data.source : null}
              lastUpdated={data?.lastUpdated}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Training Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <TimePeriodFilters
              period={period}
              year={year}
              onPeriodChange={setPeriod}
              onYearChange={setYear}
            />
          </div>
        </div>

        {loading && (
          <div className="mb-6 p-4 rounded-xl bg-white border border-gray-200 text-gray-400 text-sm shadow-sm">
            Loading activities...
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TotalVolumeCard
              totalSeconds={data?.totalSeconds ?? 0}
              bySport={data?.bySport ?? { cycling: 0, running: 0, swimming: 0, other: 0 }}
              year={year}
            />
          </div>
          <div>
            <UpcomingRacesCard races={races} />
          </div>
        </div>

        <div className="mt-6">
          <MonthlyVolumeCard
            monthly={data?.monthly ?? []}
            year={year}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="dashboard-theme min-h-screen pt-16 flex items-center justify-center text-gray-400">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
