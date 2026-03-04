import type {
  Period,
  ActivitiesResponse,
  VolumeBySport,
  MonthlyVolume,
  ActivitySummary,
  DailyActivities,
} from './types';

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

function getDateRange(period: Period, year?: number): { after: number; before: number } {
  const now = new Date();
  const currentYear = year ?? now.getFullYear();

  switch (period) {
    case 'last_4_weeks': {
      const before = Math.floor(now.getTime() / 1000);
      const after = new Date(now);
      after.setDate(after.getDate() - 28);
      return { after: Math.floor(after.getTime() / 1000), before };
    }
    case 'last_90_days': {
      const before = Math.floor(now.getTime() / 1000);
      const after = new Date(now);
      after.setDate(after.getDate() - 90);
      return { after: Math.floor(after.getTime() / 1000), before };
    }
    case 'ytd': {
      const after = new Date(currentYear, 0, 1);
      const before = new Date(now);
      if (before.getFullYear() > currentYear) {
        before.setFullYear(currentYear);
        before.setMonth(11, 31);
      }
      return {
        after: Math.floor(after.getTime() / 1000),
        before: Math.floor(before.getTime() / 1000),
      };
    }
  }
}

function mapSportType(type: string): keyof VolumeBySport | 'other' {
  const t = (type ?? '').toLowerCase();
  if (t.includes('ride') || t.includes('cycling') || t === 'virtualride') return 'cycling';
  if (t.includes('run')) return 'running';
  if (t.includes('swim')) return 'swimming';
  return 'other';
}

export async function getStravaActivities(
  accessToken: string,
  period: Period,
  year?: number
): Promise<ActivitiesResponse> {
  const { after, before } = getDateRange(period, year);
  const activities: ActivitySummary[] = [];
  let page = 1;
  const perPage = 200;

  while (true) {
    const url = `${STRAVA_API_BASE}/athlete/activities?after=${after}&before=${before}&page=${page}&per_page=${perPage}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      throw new Error(`Strava API error: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    for (const a of data as Array<{
      id?: number | string;
      name?: string;
      type?: string;
      sport_type?: string;
      moving_time: number;
      start_date: string;
      distance?: number;
    }>) {
      const rawType = a.sport_type ?? a.type ?? 'Unknown';
      const sport = mapSportType(rawType);

      activities.push({
        id: String(a.id ?? `${a.start_date}-${a.moving_time}`),
        name: a.name ?? rawType,
        type: rawType,
        sportType: sport,
        movingTimeSeconds: a.moving_time,
        distanceMeters: typeof a.distance === 'number' ? a.distance : undefined,
        startDate: a.start_date,
      });
    }

    if (data.length < perPage) break;
    page++;
  }

  const bySport: VolumeBySport = {
    cycling: 0,
    running: 0,
    swimming: 0,
    other: 0,
  };

  const monthlyMap = new Map<string, { total: number; bySport: VolumeBySport }>();
  const dailyMap = new Map<string, ActivitySummary[]>();

  for (const a of activities) {
    const sport = mapSportType(a.type);
    bySport[sport] += a.movingTimeSeconds;

    const month = a.startDate.slice(0, 7); // YYYY-MM
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        total: 0,
        bySport: { cycling: 0, running: 0, swimming: 0, other: 0 },
      });
    }
    const entry = monthlyMap.get(month)!;
    entry.total += a.movingTimeSeconds;
    entry.bySport[sport] += a.movingTimeSeconds;

    const day = a.startDate.slice(0, 10); // YYYY-MM-DD
    if (!dailyMap.has(day)) {
      dailyMap.set(day, []);
    }
    dailyMap.get(day)!.push(a);
  }

  const totalSeconds = activities.reduce((s, a) => s + a.movingTimeSeconds, 0);
  const monthly: MonthlyVolume[] = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { total, bySport }]) => ({
      month,
      totalSeconds: total,
      bySport,
    }));

  const daily: DailyActivities[] = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, activitiesForDay]) => ({
      date,
      activities: activitiesForDay,
    }));

  return {
    connected: true,
    source: 'strava',
    totalSeconds,
    bySport,
    monthly,
    daily,
    lastUpdated: new Date().toISOString(),
  };
}
