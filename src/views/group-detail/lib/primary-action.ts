import { getModeStartHref, TRIP_MODE_NAME, type Group } from "@/entities/group";
import { isTripPeriodOver } from "./trip-period";

export type PrimaryAction = { label: string; href: string };

type PrimaryActionInput = {
  group: Pick<Group, "id" | "tripId" | "status" | "mode" | "endDate">;
  isLeader: boolean;
  myPreferencesCompleted: boolean;
  /** 오늘 날짜(Asia/Seoul) YYYY-MM-DD */
  today: string;
};

/** "스토리 모드 이어서 하기"처럼 어떤 모드를 이어서 하는지 보여줌. 모드를 모르면 "이어서 하기" */
function getContinueLabel(mode: Group["mode"]): string {
  return mode ? `${TRIP_MODE_NAME[mode]} 모드 이어서 하기` : "이어서 하기";
}

/**
 * 그룹 상세 하단 버튼. 여행 상태·모드·내 설문 여부에 따라 다음에 할 일로 안내함.
 * 대표자만 할 수 있는 일(새 여행, 모드 선택)은 멤버에게 보이지 않음
 */
export function getPrimaryAction({
  group,
  isLeader,
  myPreferencesCompleted,
  today,
}: PrimaryActionInput): PrimaryAction | null {
  // 진행 중인 여행이 없거나 끝났으면 새 여행을 시작함
  if (group.tripId === null || group.status === "COMPLETED") {
    return isLeader ? { label: "새 여행 시작하기", href: `/groups/${group.id}/trips/new` } : null;
  }

  // 여행 기간이 끝났으면 모드를 이어서 진행하지 않음
  const canContinue = !isTripPeriodOver(group.endDate, today);

  if (group.status === "IN_PROGRESS") {
    // 스토리모드는 타임라인을 확정하면 IN_PROGRESS가 되므로 확정된 타임라인으로 바로 감
    const href =
      group.mode === "STORY"
        ? `/groups/${group.id}/story/timeline/confirmed`
        : getModeStartHref(group);
    return canContinue ? { label: getContinueLabel(group.mode), href } : null;
  }

  // PLANNING: 모드 선택 → 취향 설문 → 모드 시작 순서
  if (group.mode === null) {
    return isLeader ? { label: "여행 시작하기", href: `/groups/${group.id}/mode` } : null;
  }
  if (!myPreferencesCompleted) {
    return { label: "취향 설문 작성하기", href: `/groups/${group.id}/survey` };
  }
  return canContinue
    ? { label: getContinueLabel(group.mode), href: getModeStartHref(group) }
    : null;
}
