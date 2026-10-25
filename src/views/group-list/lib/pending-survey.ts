import type { GroupSummary } from "@/entities/group";

/**
 * 내가 아직 취향 설문을 내지 않은 첫 그룹 (설문 요청 배너용).
 * 진행 중인 여행 회차가 없으면 설문을 저장할 수 없으므로 제외함
 */
export function findPendingSurveyGroup(groups: GroupSummary[]): GroupSummary | undefined {
  return groups.find((group) => group.tripId !== null && !group.myPreferencesCompleted);
}
