import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const stravaToken = cookieStore.get('strava_access_token')?.value;

  return NextResponse.json({
    strava: { connected: !!stravaToken },
    garmin: { connected: false },
  });
}
