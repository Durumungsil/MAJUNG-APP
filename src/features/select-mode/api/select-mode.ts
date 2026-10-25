import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, type TripMode } from "@/entities/group";
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.all }),
  });
}
