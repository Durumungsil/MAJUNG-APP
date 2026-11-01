import type { PreferenceSummary } from "../model/types";

/** 그룹 멤버 전원이 취향 입력을 마쳤는지 */
export function isEveryoneSurveyed(
  summary: Pick<PreferenceSummary, "completedMemberCount" | "memberCount">,
) {
  return summary.memberCount > 0 && summary.completedMemberCount >= summary.memberCount;
}

/**
 * 전원이 입력을 마치고 서버의 취향 프로필 생성도 끝났는지.
 * PENDING·RUNNING이면 프로필을 만드는 중이라 더 기다리고,
 * FAILED여도 서버가 설문 수치로 바로 집계해 추천하므로 넘어감
 */
export function isPreferenceReady(
  summary: Pick<PreferenceSummary, "completedMemberCount" | "memberCount" | "profileStatus">,
) {
  return (
    isEveryoneSurveyed(summary) &&
    (summary.profileStatus === "DONE" || summary.profileStatus === "FAILED")
  );
}
