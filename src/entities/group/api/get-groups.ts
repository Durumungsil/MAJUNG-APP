import { MOCK_GROUPS } from "../config/mock-groups";
import type { Group } from "../model/types";

// TODO: Supabase 연동 시 실제 요청 + TanStack Query 훅으로 교체
export function getGroups(): Group[] {
  return MOCK_GROUPS;
}

export function getGroup(groupId: string): Group | undefined {
  return MOCK_GROUPS.find((group) => group.id === groupId);
}

export function findGroupByInviteCode(inviteCode: string): Group | undefined {
  const normalized = inviteCode.trim().toUpperCase();
  return MOCK_GROUPS.find((group) => group.inviteCode === normalized);
}
