import { NextRequest, NextResponse } from 'next/server';
import type { Period } from '@/lib/activity-providers/types';
import { getStravaActivities } from '@/lib/activity-providers/strava';
import { getValidStravaToken } from '@/lib/strava-auth';

const VALID_PERIODS: Period[] = ['last_4_weeks', 'last_90_days', 'ytd'];

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = (searchParams.get('period') ?? 'ytd') as Period;
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : undefined;

  if (!VALID_PERIODS.includes(period)) {
    return NextResponse.json({ error: 'Invalid period' }, { status: 400 });
  }

  const accessToken = await getValidStravaToken();

  if (accessToken) {
    try {
      const data = await getStravaActivities(accessToken, period, year);
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json(
        { error: 'Failed to fetch Strava activities', connected: false },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    connected: false,
    source: 'strava',
    totalSeconds: 0,
    bySport: { cycling: 0, running: 0, swimming: 0, other: 0 },
    monthly: [],
  });
}
