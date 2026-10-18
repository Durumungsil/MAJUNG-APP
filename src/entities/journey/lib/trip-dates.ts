const DAY_MS = 24 * 60 * 60 * 1000;

/** "2026-10-03" ~ "2026-10-05" → ["2026-10-03", "2026-10-04", "2026-10-05"] */
export function getTripDates(startDate: string, endDate: string): string[] {
  const start = Date.parse(`${startDate}T00:00:00Z`);
  const end = Date.parse(`${endDate}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return [startDate];

  const dayCount = Math.round((end - start) / DAY_MS) + 1;
  return Array.from({ length: dayCount }, (_, index) =>
    new Date(start + index * DAY_MS).toISOString().slice(0, 10),
  );
}
