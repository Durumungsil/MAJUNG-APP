import { getModeStartHref, type Group } from "@/entities/group";
import { isTripPeriodOver } from "./trip-period";

export type PrimaryAction = { label: string; href: string };

type PrimaryActionInput = {
  group: Pick<Group, "id" | "tripId" | "status" | "mode" | "endDate">;
  isLeader: boolean;
  /** 아직 모르면 undefined (그룹 목록을 불러오는 중) */
  myPreferencesCompleted: boolean | undefined;
  /** 오늘 날짜(Asia/Seoul) YYYY-MM-DD */
  today: string;
};

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
    return canContinue ? { label: "이어서 하기", href: getModeStartHref(group) } : null;
  }

  // PLANNING: 모드 선택 → 취향 설문 → 모드 시작 순서
  if (group.mode === null) {
    return isLeader ? { label: "여행 시작하기", href: `/groups/${group.id}/mode` } : null;
  }
  if (myPreferencesCompleted === false) {
    return { label: "취향 설문 작성하기", href: `/groups/${group.id}/survey` };
  }
  if (myPreferencesCompleted === true) {
    return canContinue ? { label: "이어서 하기", href: getModeStartHref(group) } : null;
  }
  return null;
}
