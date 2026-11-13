import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, patchGroupDetail, type TripMode } from "@/entities/group";
import { apiRequest } from "@/shared/api";

/** 모드 선택 - 현재 여행 회차의 모드를 확정함 */
export function selectMode(groupId: number, mode: TripMode) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}/mode`, {
    method: "PATCH",
    body: { mode },
  });
}

export function useSelectMode(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mode: TripMode) => selectMode(groupId, mode),
    // 고른 모드를 캐시에 바로 넣고, 다시 받기는 기다리지 않아 다음 화면으로 바로 넘어감
    onSuccess: (_, mode) => {
      patchGroupDetail(queryClient, groupId, { mode });
      void queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}
