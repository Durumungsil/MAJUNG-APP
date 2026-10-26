import type { TimelineStop } from "@/entities/journey";
import { moveItem } from "./move-item";

/**
 * 장소 순서만 바꾸고 시간 칸은 그대로 둠.
 * (09:00~11:00 칸에 있던 장소를 끌어 옮기면 그 칸에는 다음 장소가 들어옴)
 */
export function reorderStopPlaces(
  stops: readonly TimelineStop[],
  from: number,
  to: number,
): TimelineStop[] {
  const places = moveItem(
    stops.map(({ id, destinationId, placeName, location }) => ({
      id,
      destinationId,
      placeName,
      location,
    })),
    from,
    to,
  );
  return stops.map((stop, index) => ({ ...stop, ...places[index] }));
}
