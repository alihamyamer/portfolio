import { NextResponse } from 'next/server';
import { refreshStravaToken } from '@/lib/strava-auth';

export async function POST() {
  const accessToken = await refreshStravaToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: 'No refresh token available' },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
