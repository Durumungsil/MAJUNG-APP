import type { JourneyStop } from "../model/types";

/** { startTime: "09:00", endTime: "11:00" } → "09:00 ~ 11:00" */
export function formatTimeRange({
  startTime,
  endTime,
}: Pick<JourneyStop, "startTime" | "endTime">): string {
  return `${startTime} ~ ${endTime}`;
}
