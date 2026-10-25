import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, verifyInviteCode } from "@/entities/group";
import { apiRequest } from "@/shared/api";

/** 그룹 참여 - 초대 코드를 함께 보내 검증받음 */
export function joinGroup(groupId: number, inviteCode: string) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}/invitations`, {
    method: "POST",
    body: { invite_code: inviteCode },
  });
}

/** 초대 코드로 그룹을 찾고, 아직 멤버가 아니면 참여까지 마친 뒤 그룹 ID를 돌려줌 */
async function joinByInviteCode(inviteCode: string): Promise<number> {
  const preview = await verifyInviteCode(inviteCode);
  if (preview.joinable) await joinGroup(preview.groupId, inviteCode);
  return preview.groupId;
}

export function useJoinGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinByInviteCode,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.all }),
  });
}
