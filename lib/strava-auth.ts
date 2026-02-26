import { cookies } from 'next/headers';

const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

export async function refreshStravaToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('strava_refresh_token')?.value;

  if (!refreshToken) return null;

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  const tokenResponse = await fetch(STRAVA_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!tokenResponse.ok) return null;

  const data = await tokenResponse.json();
  const { access_token, refresh_token: newRefreshToken, expires_at } = data;

  if (!access_token) return null;

  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set('strava_access_token', access_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 60 * 60 * 6,
    path: '/',
  });

  if (newRefreshToken) {
    cookieStore.set('strava_refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }

  cookieStore.set('strava_expires_at', String(expires_at), {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return access_token;
}

export async function getValidStravaToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('strava_access_token')?.value;
  const expiresAt = cookieStore.get('strava_expires_at')?.value;

  if (!accessToken) return null;

  const now = Math.floor(Date.now() / 1000);
  const expires = expiresAt ? parseInt(expiresAt, 10) : 0;

  // Refresh if expired or expiring in < 5 min
  if (expires < now + 300) {
    const newToken = await refreshStravaToken();
    return newToken;
  }

  return accessToken;
}
