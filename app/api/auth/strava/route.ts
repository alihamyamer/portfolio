import { NextResponse } from 'next/server';

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const SCOPES = 'activity:read_all,profile:read_all';

export async function GET() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Strava API not configured. Set STRAVA_CLIENT_ID and STRAVA_REDIRECT_URI.' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES,
    approval_prompt: 'auto',
  });

  const authUrl = `${STRAVA_AUTH_URL}?${params.toString()}`;
  return NextResponse.redirect(authUrl);
}
