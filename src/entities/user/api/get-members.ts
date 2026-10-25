import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/api";
import { sortLeaderFirst } from "../lib/sort-members";
import type { Member } from "../model/types";
import { userKeys } from "./query-keys";

/** GET /api/v1/groups/{groupId}/members 응답 (snake_case 그대로) */
type GroupMembersResponse = {
  group_id: number;
  members: {
    user_id: number;
    user_name: string;
    is_owner: boolean;
    // preferences_completed도 내려오지만 누가 설문을 마쳤는지 드러나지 않도록 쓰지 않음
    joined_at: string;
  }[];
  count: number;
};

/** 리더가 맨 앞에 오도록 정렬된 그룹 멤버 목록 */
export async function fetchGroupMembers(groupId: number): Promise<Member[]> {
  const data = await apiRequest<GroupMembersResponse>(`/api/v1/groups/${groupId}/members`);
  return sortLeaderFirst(
    data.members.map((member) => ({
      id: member.user_id,
      nickname: member.user_name,
      avatarUrl: null,
      isLeader: member.is_owner,
    })),
  );
}

/** groupId가 아직 없으면(null) 요청하지 않음 */
export function useGroupMembers(groupId: number | null) {
  return useQuery({
    queryKey: userKeys.groupMembers(groupId ?? 0),
    queryFn: () => fetchGroupMembers(groupId ?? 0),
    enabled: groupId !== null,
  });
}
