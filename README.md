# Portfolio

A personal portfolio site with a Training Dashboard that connects to Strava and supports Garmin Connect (coming soon).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal).

## Strava API Setup

To connect the Training Dashboard to Strava:

### 1. Create a Strava API Application

1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Log in and create a new application
3. Set **Authorization Callback Domain** to `localhost` (for dev) or your production domain
4. Note your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Strava credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
STRAVA_CLIENT_ID=<your_client_id>
STRAVA_CLIENT_SECRET=<your_client_secret>
STRAVA_REDIRECT_URI=http://localhost:3000/api/auth/strava/callback
```

Use `http://localhost:3001/api/auth/strava/callback` if your dev server runs on port 3001.

For production, set `STRAVA_REDIRECT_URI` to `https://yourdomain.com/api/auth/strava/callback` and add `yourdomain.com` as the Authorization Callback Domain in Strava.

### 3. Restart the Dev Server

Restart `npm run dev` after adding `.env.local` so Next.js loads the variables.

### 4. Connect Strava

1. Visit `/dashboard`
2. Click "Connect Strava"
3. Authorize on Strava
4. You should see your training volume and sport breakdown

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `GET /api/auth/strava` returns 500 | Set `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REDIRECT_URI` in `.env.local` |
| Redirect fails or shows error | Ensure redirect URI matches Strava app settings exactly |
| Callback with `?error=token_exchange` | Check client secret; retry quickly (code expires) |
| "Not connected" after auth | Check browser allows cookies; verify redirect URI domain |
| Empty activities but "Connected" | Try "Last 90 days" or "YTD"; verify Strava has activities |
