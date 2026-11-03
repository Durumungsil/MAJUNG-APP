import { useQuery } from "@tanstack/react-query";
import { PERSISTED_QUERY_OPTIONS } from "@/shared/api";
import { fetchItinerary } from "./itinerary-api";
import { journeyKeys } from "./query-keys";

/** itineraryId가 없으면(null) 요청하지 않음. AI가 만든 결과라 새로고침 뒤에도 남김 */
export function useItinerary(groupId: number, itineraryId: number | null) {
  return useQuery({
    queryKey: journeyKeys.itinerary(groupId, itineraryId ?? 0),
    queryFn: () => fetchItinerary(groupId, itineraryId ?? 0),
    enabled: itineraryId !== null,
    ...PERSISTED_QUERY_OPTIONS,
  });
}
