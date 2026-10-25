/** 그룹 멤버 전원이 취향 입력을 마쳤는지 */
export function isEveryoneDone(summary: { completedMemberCount: number; memberCount: number }) {
  return summary.memberCount > 0 && summary.completedMemberCount >= summary.memberCount;
}
