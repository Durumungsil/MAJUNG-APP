import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, patchGroupDetail } from "@/entities/group";
import { apiRequest, isApiError } from "@/shared/api";

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
    onSuccess: () => {
      patchGroupDetail(queryClient, groupId, { status: "COMPLETED" });
      void queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
    // 409는 다른 기기에서 이미 끝낸 경우라 그룹 상태를 다시 받아 화면을 맞춤
    onError: (error) => {
      if (isApiError(error, 409)) return queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}
