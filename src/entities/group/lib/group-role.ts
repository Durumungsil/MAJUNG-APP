import type { Group, GroupRole } from "../model/types";

/** 그룹 방장(owner)이면 리더 */
export function getGroupRole(group: Pick<Group, "ownerId">, userId: number | null): GroupRole {
  return userId !== null && group.ownerId === userId ? "leader" : "member";
}

/** 라우트의 groupId 문자열을 백엔드 ID(양의 정수)로 바꿈. 형식이 틀리면 null */
export function parseGroupId(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
