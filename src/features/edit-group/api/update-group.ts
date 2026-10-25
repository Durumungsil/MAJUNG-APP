import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, type GroupPayload } from "@/entities/group";
import { apiRequest } from "@/shared/api";

/** 그룹 설정 수정 (PATCH) - 그룹명·인원은 그룹에, 지역·기간은 진행 중인 여행 회차에 반영됨 */
export function updateGroup(groupId: number, payload: GroupPayload) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}`, {
    method: "PATCH",
    body: {
      group_name: payload.groupName,
      region: payload.region,
      max_members: payload.maxMembers,
      travel_start_date: payload.startDate,
      travel_end_date: payload.endDate,
    },
  });
}

export function useUpdateGroup(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: GroupPayload) => updateGroup(groupId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.all }),
  });
}
