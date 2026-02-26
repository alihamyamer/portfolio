# Strava Troubleshooting: Running Activities Not Showing

Follow these steps in order to get your running activities to show on the Training Dashboard.

---

## Step 1: Confirm you’re connected to Strava

- Open the **Training Dashboard** (`/dashboard`).
- You should see a green **“Connected”** badge (not “Connect Strava”).
- If you see “Connect Strava”, click it and complete Strava authorization again.

If it still doesn’t show “Connected” after authorizing, check that cookies are allowed for your site and that `.env.local` has `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, and `STRAVA_REDIRECT_URI` set. Restart the dev server after changing env vars.

---

## Step 2: Check the time period and year

The dashboard only shows activities **inside the selected range**.

- **YTD (Year to Date)** – activities from Jan 1 of the selected year up to today.
- **Last 90 days** – last 90 days from today.
- **Last 4 weeks** – last 28 days.

Try:

1. Set the filter to **“Last 90 days”** (or “Last 4 weeks” if your runs are recent).
2. Ensure the **year** dropdown matches when you actually ran (e.g. 2025 or 2026).

If your runs are from an earlier year, use **YTD** and pick that year in the dropdown.

---

## Step 3: Confirm activities exist in Strava for that range

- Go to [Strava](https://www.strava.com) and open **Your profile → Training → Training Log** (or the list of activities).
- Check that you have **running** activities in the same period you selected on the dashboard (e.g. last 90 days or the chosen year).
- If there are no runs in that range on Strava, the dashboard will correctly show 0 for running.

---

## Step 4: Inspect what the API returns

Use the browser to see the data your app receives from Strava.

1. Open the dashboard: `http://localhost:3000/dashboard` (or your dev URL).
2. Open **Developer Tools** (F12 or right‑click → Inspect).
3. Go to the **Network** tab.
4. Refresh the page or change the period/year so a new request is made.
5. Find the request to **`activities`** (e.g. `activities?period=last_90_days&year=2026`).
6. Click it and open the **Response** (or **Preview**) tab.

Check:

- **`connected`** – should be `true` if Strava is connected.
- **`bySport`** – should look like `{ "cycling": 0, "running": 1234, "swimming": 0, "other": 0 }`.  
  If `running` is still 0 but you have runs in that period on Strava, the app may have been using the wrong activity field; the code was updated to use Strava’s `sport_type` (e.g. Run, TrailRun, VirtualRun) so runs are counted correctly.
- **`totalSeconds`** – total time in the response. If it’s 0, no activities were found for that range.

---

## Step 5: Restart the dev server after code or env changes

- If you changed `.env.local` or any server-side code (e.g. `lib/activity-providers/strava.ts`), restart the Next.js dev server (`npm run dev`).
- Reload the dashboard and try again with “Last 90 days” or “Last 4 weeks”.

---

## Step 6: If running is still zero

- **Double-check the date range**  
  Runs only count if their **start time** falls within the selected period (YTD, last 90 days, or last 4 weeks).

- **Confirm activity type in Strava**  
  In Strava, open one of your runs and check the activity type (e.g. “Run”, “Trail Run”, “Virtual Run”). The app maps all of these to “Running”. If you used a custom or rare type, tell us which one and we can add it.

- **Reconnect Strava**  
  Revoke access for the app in [Strava → Settings → My Apps](https://www.strava.com/settings/apps), then on the dashboard click “Connect Strava” again and re-authorize. This refreshes tokens and permissions.

---

## Quick checklist

| Check | What to do |
|-------|------------|
| Connected? | Green “Connected” badge on dashboard |
| Period? | Try “Last 90 days” or “Last 4 weeks” |
| Year? | Match the year of your runs |
| Runs on Strava? | Verify in Strava for the same period |
| API response? | Network tab → `activities` → `bySport.running` |
| Server restarted? | After env or server-side code changes |

Once the API response shows `bySport.running` greater than 0 for a period where you have runs on Strava, the dashboard will show them under Running.
