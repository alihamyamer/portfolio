import type {
  Period,
  ActivitiesResponse,
  VolumeBySport,
  MonthlyVolume,
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
  const activities: Array<{ type: string; moving_time: number; start_date: string }> = [];
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

    activities.push(
      ...data.map((a: { type?: string; sport_type?: string; moving_time: number; start_date: string }) => ({
        type: a.sport_type ?? a.type ?? 'Unknown',
        moving_time: a.moving_time,
        start_date: a.start_date,
      }))
    );

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

  for (const a of activities) {
    const sport = mapSportType(a.type);
    bySport[sport] += a.moving_time;

    const month = a.start_date.slice(0, 7); // YYYY-MM
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        total: 0,
        bySport: { cycling: 0, running: 0, swimming: 0, other: 0 },
      });
    }
    const entry = monthlyMap.get(month)!;
    entry.total += a.moving_time;
    entry.bySport[sport] += a.moving_time;
  }

  const totalSeconds = activities.reduce((s, a) => s + a.moving_time, 0);
  const monthly: MonthlyVolume[] = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { total, bySport }]) => ({
      month,
      totalSeconds: total,
      bySport,
    }));

  return {
    connected: true,
    source: 'strava',
    totalSeconds,
    bySport,
    monthly,
    lastUpdated: new Date().toISOString(),
  };
}
