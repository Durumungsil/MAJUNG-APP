import type { JourneyStop } from "../model/journey-stop";

export function isJourneyStopCompleted(stop: JourneyStop): boolean {
  return stop.endedAt !== null;
}

export function getDurationMinutes(stop: JourneyStop): number | null {
  if (stop.startedAt === null || stop.endedAt === null) return null;
  return Math.floor((stop.endedAt.getTime() - stop.startedAt.getTime()) / 60_000);
}

export function formatRank(rank: JourneyStop["rank"]): string {
  return `랭크: ${rank ?? "-"}`;
}

export function formatDuration(minutes: number | null): string {
  if (minutes === null) return "-시간 --분 소요";
  return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분 소요`;
}

export function formatEndedAt(endedAt: JourneyStop["endedAt"]): string {
  if (endedAt === null) return "종료: --시 --분";
  return `종료: ${endedAt.getHours()}시 ${endedAt.getMinutes()}분`;
}

export function completeStopAt(stops: JourneyStop[], index: number, endedAt: Date): JourneyStop[] {
  return stops.map((stop, i) => (i === index ? { ...stop, endedAt } : stop));
}

export function startStopAt(stops: JourneyStop[], index: number, startedAt: Date): JourneyStop[] {
  return stops.map((stop, i) => (i === index ? { ...stop, startedAt } : stop));
}
