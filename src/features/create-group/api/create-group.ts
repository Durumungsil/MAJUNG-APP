import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys, type GroupPayload } from "@/entities/group";
import { apiRequest } from "@/shared/api";

/** POST /api/v1/groups 응답 중 화면에서 쓰는 값 (snake_case 그대로) */
type CreateGroupResponse = {
  group_id: number;
  invite_code: string;
};

/** 그룹 생성 - 만든 사람이 리더가 되고 첫 여행 회차도 함께 만들어짐 */
export function createGroup(payload: GroupPayload) {
  return apiRequest<CreateGroupResponse>("/api/v1/groups", {
    method: "POST",
    body: {
      group_name: payload.groupName,
      region: payload.region,
      max_members: payload.maxMembers,
      travel_start_date: payload.startDate,
      travel_end_date: payload.endDate,
    },
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.list() }),
  });
}
