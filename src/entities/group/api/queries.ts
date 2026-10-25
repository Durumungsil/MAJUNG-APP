import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { isApiError } from "@/shared/api";
import { parseGroupId } from "../lib/group-role";
import { fetchGroup, fetchInviteCode, fetchMyGroups, fetchTrips } from "./group-api";
import { groupKeys } from "./query-keys";

export function useMyGroups() {
  return useQuery({ queryKey: groupKeys.list(), queryFn: fetchMyGroups });
}

export function useGroup(groupId: number) {
  return useQuery({ queryKey: groupKeys.detail(groupId), queryFn: () => fetchGroup(groupId) });
}

/**
 * 라우트의 groupId로 그룹 상세를 조회함.
 * ID 형식이 틀렸거나, 없는 그룹(404)이거나, 내가 속하지 않은 그룹(403)이면 404 화면을 보여줌
 */
export function useGroupByParam(groupIdParam: string) {
  const groupId = parseGroupId(groupIdParam);
  const query = useQuery({
    queryKey: groupKeys.detail(groupId ?? 0),
    queryFn: () => fetchGroup(groupId ?? 0),
    enabled: groupId !== null,
  });

  if (groupId === null || isApiError(query.error, 403, 404)) notFound();

  return query;
}

/** 초대 코드는 그룹 리더 화면에서만 쓰므로 enabled로 요청 여부를 정함 */
export function useInviteCode(groupId: number, enabled: boolean) {
  return useQuery({
    queryKey: groupKeys.inviteCode(groupId),
    queryFn: () => fetchInviteCode(groupId),
    enabled,
  });
}

/** groupId가 아직 없으면(null) 요청하지 않음 */
export function useGroupTrips(groupId: number | null) {
  return useQuery({
    queryKey: groupKeys.trips(groupId ?? 0),
    queryFn: () => fetchTrips(groupId ?? 0),
    enabled: groupId !== null,
  });
}
