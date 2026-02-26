const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

export async function getValidStravaToken(): Promise<string | null> {
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) return null;

  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.accessToken;
  }

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
  const { access_token, expires_at } = data;

  if (!access_token) return null;

  cachedToken = { accessToken: access_token, expiresAt: expires_at };

  return access_token;
}
