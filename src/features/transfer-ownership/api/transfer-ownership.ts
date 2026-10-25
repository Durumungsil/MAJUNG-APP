import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys } from "@/entities/group";
import { userKeys } from "@/entities/user";
import { apiRequest } from "@/shared/api";

/** 대표자 변경 - 그룹 설정 수정(PATCH)에 owner_id만 보냄. 지정할 사용자는 그룹 멤버여야 함 */
export function transferOwnership(groupId: number, newOwnerId: number) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}`, {
    method: "PATCH",
    body: { owner_id: newOwnerId },
  });
}

export function useTransferOwnership(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newOwnerId: number) => transferOwnership(groupId, newOwnerId),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: groupKeys.all }),
        queryClient.invalidateQueries({ queryKey: userKeys.groupMembers(groupId) }),
      ]),
  });
}
