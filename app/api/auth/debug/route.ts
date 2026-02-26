import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = `${url.protocol}//${url.host}/api/auth/strava/callback`;

  const params = new URLSearchParams({
    client_id: clientId || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'activity:read_all,profile:read_all',
    approval_prompt: 'auto',
  });

  const fullStravaUrl = `https://www.strava.com/oauth/authorize?${params.toString()}`;

  return NextResponse.json({
    clientId,
    clientIdLength: clientId?.length,
    redirectUri,
    fullStravaUrl,
    host: url.host,
  });
}
