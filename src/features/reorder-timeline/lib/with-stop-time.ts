import type { Itinerary, TimelineStop } from "@/entities/journey";
import { canPlaceSlot, toTimeSlot, type TimeSlot } from "./time-slot";

/** 하루 방문 중 하나의 시간을 바꾸고 시작 시각 순으로 다시 정렬함 */
export function withDayStopTime(
  stops: readonly TimelineStop[],
  stopId: string,
  startTime: string,
  endTime: string,
): TimelineStop[] {
  return stops
    .map((stop) => (stop.id === stopId ? { ...stop, startTime, endTime } : stop))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

/** 방문 하나의 시간을 바꾼 타임라인 */
export function withStopTime(
  itinerary: Itinerary,
  stopId: string,
  startTime: string,
  endTime: string,
): Itinerary {
  return {
    ...itinerary,
    days: itinerary.days.map((day) =>
      day.stops.some((stop) => stop.id === stopId)
        ? { ...day, stops: withDayStopTime(day.stops, stopId, startTime, endTime) }
        : day,
    ),
  };
}

/**
 * 시트에 입력한 시간을 저장해도 되는지 확인하고 구간으로 바꿈.
 * 종료가 시작보다 빠르거나, 하루 일정 범위를 벗어나거나, 그날 다른 방문과 겹치면 null
 */
export function toEditedSlot(
  dayStops: readonly TimelineStop[],
  stopId: string,
  startTime: string,
  endTime: string,
  dayRange: TimeSlot,
): TimeSlot | null {
  const slot = toTimeSlot(startTime, endTime);
  if (slot === null) return null;
  const others = dayStops
    .filter((stop) => stop.id !== stopId)
    .map((stop) => toTimeSlot(stop.startTime, stop.endTime))
    .filter((other): other is TimeSlot => other !== null);
  return canPlaceSlot(slot, others, dayRange) ? slot : null;
}
