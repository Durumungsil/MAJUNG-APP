import { useMutation, useQueryClient } from "@tanstack/react-query";
import { journeyKeys, toItinerary, type ItineraryResponse } from "@/entities/journey";
import { apiRequest } from "@/shared/api";

/**
 * AI 타임라인 생성 - 선택한 장소로 현재 여행 회차의 타임라인을 만듦 (다시 만들면 이전 타임라인은 지워짐).
 * 교통수단·하루 일정 시간은 보내지 않아 서버 기본값(그룹 취향 최다 교통수단, 09:00~21:00)을 씀
 */
export async function generateTimeline(groupId: number, destinationIds: number[]) {
  const data = await apiRequest<ItineraryResponse>(
    `/api/v1/groups/${groupId}/itineraries/timeline`,
    { method: "POST", body: { destination_ids: destinationIds } },
  );
  return toItinerary(data);
}

export function useGenerateTimeline(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (destinationIds: number[]) => generateTimeline(groupId, destinationIds),
    // 생성 응답이 조회 응답과 같은 형태라 캐시에 바로 넣어 타임라인 화면의 조회 요청을 줄임
    onSuccess: (itinerary) =>
      queryClient.setQueryData(journeyKeys.itinerary(groupId, itinerary.id), itinerary),
  });
}
