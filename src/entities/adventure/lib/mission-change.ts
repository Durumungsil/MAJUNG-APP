import type { CurrentMission } from "../model/types";

/**
 * 찾던 미션과 다시 받은 현재 미션의 관계
 * - same: 같은 미션 그대로 (미션 교체도 서버가 같은 미션 ID의 장소만 바꾸므로 여기에 해당)
 * - advanced: 찾던 미션이 완료돼 다음 미션이 열림
 * - finished: 찾던 미션이 오늘 마지막이었고 완료됨 (현재 미션 없음)
 */
export type MissionChange = "same" | "advanced" | "finished";

/**
 * 대표자가 진행한 결과를 다른 기기에서 알아차리기 위한 판정.
 * 미션은 차례(order)대로만 열리므로 차례가 올라갔으면 찾던 미션이 완료된 것으로 봄
 */
export function getMissionChange(
  searching: Pick<CurrentMission, "order">,
  current: Pick<CurrentMission, "order"> | null,
): MissionChange {
  if (current === null) return "finished";
  if (current.order > searching.order) return "advanced";
  return "same";
}
