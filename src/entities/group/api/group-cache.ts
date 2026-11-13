import type { QueryClient } from "@tanstack/react-query";
import type { Group } from "../model/types";
import { groupKeys } from "./query-keys";

type GroupPatch = Partial<Group> | ((group: Group) => Partial<Group>);

/**
 * 요청 결과로 확실히 알 수 있는 값을 그룹 상세 캐시에 바로 반영함.
 * 다시 받기가 끝나길 기다리지 않고 다음 화면으로 넘어가도 바뀐 상태(모드·여행 상태 등)로 그려지게 함.
 * 캐시가 아직 없으면 아무것도 하지 않음 (다음 화면에서 새로 받음)
 */
export function patchGroupDetail(queryClient: QueryClient, groupId: number, patch: GroupPatch) {
  queryClient.setQueryData<Group>(groupKeys.detail(groupId), (group) =>
    group ? { ...group, ...(typeof patch === "function" ? patch(group) : patch) } : group,
  );
}
