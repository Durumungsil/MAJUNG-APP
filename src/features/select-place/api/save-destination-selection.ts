import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeKeys } from "@/entities/place";
import { apiRequest } from "@/shared/api";
import { toSelectionPayload, type SelectionDay } from "../lib/selection-payload";

/** 여행지 선택 저장 - 저장할 때마다 현재 회차의 선택을 통째로 교체함 */
export function saveDestinationSelection(groupId: number, days: readonly SelectionDay[]) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}/destinations/selection`, {
    method: "PUT",
    body: { destinations: toSelectionPayload(days) },
  });
}

export function useSaveDestinationSelection(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (days: readonly SelectionDay[]) => saveDestinationSelection(groupId, days),
    // 선택을 저장하면 추천 중심이 선택한 장소 쪽으로 바뀌므로, 이전 cursor를 버리고 첫 페이지부터 다시 받음
    // 추천 목록을 다시 받는 동안 기다리면 다음 단계(타임라인 생성·확정)가 늦어지므로 기다리지 않음
    onSuccess: () => {
      void queryClient.resetQueries({ queryKey: placeKeys.recommendations(groupId) });
    },
  });
}
