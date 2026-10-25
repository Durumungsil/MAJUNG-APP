import type { Member } from "../model/types";

/** 리더가 맨 앞에 오도록 정렬 (나머지는 원래 순서 유지) */
export function sortLeaderFirst(members: Member[]): Member[] {
  return [...members].sort((a, b) => Number(b.isLeader) - Number(a.isLeader));
}

/** 그룹 리더의 이름 */
export function findLeaderName(members: Member[]): string | null {
  return members.find((member) => member.isLeader)?.nickname ?? null;
}
