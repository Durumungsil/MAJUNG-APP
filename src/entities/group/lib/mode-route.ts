import type { Group } from "../model/types";

/** 모드별 시작 화면. 화면이 아직 없는 모드(EXTREME)나 모드 미선택이면 그룹 상세로 돌아감 */
export function getModeStartHref(group: Pick<Group, "id" | "mode">): string {
  switch (group.mode) {
    case "STORY":
      return `/groups/${group.id}/story`;
    case "ADVENTURE":
      return `/groups/${group.id}/adventure`;
    default:
      return `/groups/${group.id}`;
  }
}
