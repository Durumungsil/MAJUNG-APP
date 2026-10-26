import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ItineraryDay } from "@/entities/journey";
import { placeKeys } from "@/entities/place";
import { apiRequest } from "@/shared/api";
import { toSelectionPayload } from "../lib/selection-payload";

/** 여행지 선택 저장 - 저장할 때마다 현재 회차의 선택을 통째로 교체함 */
export function saveDestinationSelection(groupId: number, days: readonly ItineraryDay[]) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}/destinations/selection`, {
    method: "PUT",
    body: { destinations: toSelectionPayload(days) },
  });
}

export function useSaveDestinationSelection(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (days: readonly ItineraryDay[]) => saveDestinationSelection(groupId, days),
    // 선택을 저장하면 추천 중심이 선택한 장소 쪽으로 바뀌므로 추천 목록을 다시 받음
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: placeKeys.recommendations(groupId) }),
  });
}
