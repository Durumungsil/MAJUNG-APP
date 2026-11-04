import type { Group } from "@/entities/group";

/** 룰렛을 돌릴 수 없는 이유: 그룹을 불러오는 중 / 대표자가 아님 / 설문을 다 내지 않음 */
export type SpinBlock = "loading" | "member" | "survey";

/** 룰렛을 돌릴 수 있으면 null */
export function getSpinBlock(
  group: Pick<Group, "memberCount" | "preferencesCompletedCount"> | undefined,
  isLeader: boolean,
): SpinBlock | null {
  if (group === undefined) return "loading";
  if (!isLeader) return "member";
  // 추첨은 멤버 전원의 취향을 합쳐서 쓰므로, 한 명이라도 설문을 안 냈으면 서버가 409로 거절함
  if (group.preferencesCompletedCount < group.memberCount) return "survey";
  return null;
}
