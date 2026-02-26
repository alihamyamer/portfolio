export type Period = 'last_4_weeks' | 'last_90_days' | 'ytd';

export interface ActivitySummary {
  id: string;
  type: string;
  sportType: string;
  movingTimeSeconds: number;
  distanceMeters?: number;
  startDate: string;
}

export interface VolumeBySport {
  cycling: number; // seconds
  running: number;
  swimming: number;
  other: number;
}

export interface MonthlyVolume {
  month: string; // YYYY-MM
  totalSeconds: number;
  bySport: VolumeBySport;
}

export interface ActivitiesResponse {
  connected: boolean;
  source: 'strava' | 'garmin';
  totalSeconds: number;
  bySport: VolumeBySport;
  monthly: MonthlyVolume[];
  lastUpdated?: string;
}

export interface ActivityProvider {
  name: 'strava' | 'garmin';
  isConnected(): Promise<boolean>;
  getActivities(period: Period, year?: number): Promise<ActivitiesResponse>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
