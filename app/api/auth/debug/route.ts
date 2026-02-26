import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const redirectUri = `${url.protocol}//${url.host}/api/auth/strava/callback`;

  return NextResponse.json({
    requestUrl: request.url,
    protocol: url.protocol,
    host: url.host,
    redirectUri,
    forwardedProto: request.headers.get('x-forwarded-proto'),
    forwardedHost: request.headers.get('x-forwarded-host'),
  });
}
