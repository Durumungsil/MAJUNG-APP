const METERS_PER_KILOMETER = 1000;

/** 200 → "200m", 1234 → "1.2km" */
export function formatDistance(meters: number): string {
  if (meters < METERS_PER_KILOMETER) return `${Math.round(meters)}m`;
  return `${(meters / METERS_PER_KILOMETER).toFixed(1)}km`;
}
