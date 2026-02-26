import type { Period, ActivitiesResponse } from './types';

export async function getGarminActivities(
  _period: Period,
  _year?: number
): Promise<ActivitiesResponse> {
  // Placeholder: Garmin Connect API requires developer program approval.
  // Returns empty data with connected: false until implementation.
  return {
    connected: false,
    source: 'garmin',
    totalSeconds: 0,
    bySport: {
      cycling: 0,
      running: 0,
      swimming: 0,
      other: 0,
    },
    monthly: [],
    lastUpdated: undefined,
  };
}
