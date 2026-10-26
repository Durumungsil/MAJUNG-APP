import { useQuery } from "@tanstack/react-query";
import { fetchItinerary } from "./itinerary-api";
import { journeyKeys } from "./query-keys";

/** itineraryId가 없으면(null) 요청하지 않음 */
export function useItinerary(groupId: number, itineraryId: number | null) {
  return useQuery({
    queryKey: journeyKeys.itinerary(groupId, itineraryId ?? 0),
    queryFn: () => fetchItinerary(groupId, itineraryId ?? 0),
    enabled: itineraryId !== null,
  });
}
