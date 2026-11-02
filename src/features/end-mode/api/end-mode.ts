import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys } from "@/entities/group";
import { apiRequest } from "@/shared/api";

/**
 * 모드 종료 - 진행 중인 여행 회차를 끝냄 (스토리·모험·익스트림 공통).
 * 대표자만 가능(403)하고, 이미 끝났으면 409
 */
export function endMode(groupId: number) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}/mode/end`, { method: "POST" });
}

export function useEndMode(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => endMode(groupId),
    // 여행 상태가 COMPLETED로 바뀌어 그룹 상세의 다음 할 일(새 여행 시작)이 달라짐
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.all }),
  });
}
