import type { TimelineStop } from "@/entities/journey";
import type { PlaceDetails } from "@/entities/place";
import type { LatLng } from "@/shared/model";

export type LocatedStop = TimelineStop & { location: LatLng };

/**
 * 일정 좌표가 비어 있으면(서버 캐시 만료) Google SDK로 받은 좌표로 채움.
 * 그래도 좌표가 없는 장소는 지도에 그릴 수 없으므로 뺌
 */
export function toLocatedStops(
  stops: readonly TimelineStop[],
  detailsById: ReadonlyMap<string, PlaceDetails>,
): LocatedStop[] {
  return stops.flatMap((stop) => {
    const location = stop.location ?? detailsById.get(stop.placeId)?.location ?? null;
    return location ? [{ ...stop, location }] : [];
  });
}
