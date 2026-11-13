import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, patchGroupDetail } from "@/entities/group";
import { apiRequest, isApiError } from "@/shared/api";

/** POST /api/v1/groups/{groupId}/itineraries/{itineraryId}/confirm 응답 (snake_case 그대로) */
type ConfirmTimelineResponse = {
  group_id: number;
  trip_id: number;
  itinerary_id: number;
  status: "IN_PROGRESS";
  confirmed_at: string;
};

/**
 * 타임라인 확정 - 스토리모드 여행 회차를 IN_PROGRESS로 바꿈. 대표자만 가능(403).
 * 이미 확정했거나 스토리모드가 아니면 409이고, 확정 뒤에는 여행지 선택 저장·타임라인 생성이 409가 됨
 */
export function confirmTimeline(groupId: number, itineraryId: number) {
  return apiRequest<ConfirmTimelineResponse>(
    `/api/v1/groups/${groupId}/itineraries/${itineraryId}/confirm`,
    { method: "POST" },
  );
}

export function useConfirmTimeline(groupId: number, itineraryId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => confirmTimeline(groupId, itineraryId),
    // 여행 상태가 IN_PROGRESS로 바뀌어 그룹 상세의 다음 할 일이 달라짐
    // 확정 상태를 캐시에 바로 넣고, 다시 받기는 기다리지 않아 확정 화면으로 바로 넘어감
    onSuccess: (response) => {
      patchGroupDetail(queryClient, groupId, { status: response.status });
      void queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
    // 409는 다른 기기에서 먼저 확정한 경우일 수 있어 그룹 상태를 다시 받아 화면을 맞춤
    onError: (error) => {
      if (isApiError(error, 409)) return queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}
