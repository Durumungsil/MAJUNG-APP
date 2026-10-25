import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys } from "@/entities/group";
import { apiRequest } from "@/shared/api";

/** 그룹 탈퇴 */
export function leaveGroup(groupId: number) {
  return apiRequest<null>(`/api/v1/groups/${groupId}/members/me`, { method: "DELETE" });
}

export function useLeaveGroup(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => leaveGroup(groupId),
    onSuccess: () => {
      // 탈퇴한 그룹은 더 이상 조회할 수 없으므로 상세 캐시를 지우고 목록만 새로 받음
      queryClient.removeQueries({ queryKey: groupKeys.detail(groupId) });
      return queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}
