import { NextRequest, NextResponse } from 'next/server';

const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'missing_code' }, { status: 400 });
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'config' }, { status: 500 });
  }

  const tokenResponse = await fetch(STRAVA_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenResponse.ok) {
    const err = await tokenResponse.text();
    return NextResponse.json({ error: 'token_exchange', details: err }, { status: 400 });
  }

  const data = await tokenResponse.json();

  return NextResponse.json({
    message: 'Copy the refresh_token below and add it as STRAVA_REFRESH_TOKEN in your Vercel environment variables. Then redeploy.',
    refresh_token: data.refresh_token,
    access_token: data.access_token,
    athlete: data.athlete?.firstname,
  });
}
