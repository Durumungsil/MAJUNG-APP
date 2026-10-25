import { getModeStartHref, type Group } from "@/entities/group";

export type PrimaryAction = { label: string; href: string };

type PrimaryActionInput = {
  group: Pick<Group, "id" | "tripId" | "status" | "mode">;
  isLeader: boolean;
  /** 아직 모르면 undefined (그룹 목록을 불러오는 중) */
  myPreferencesCompleted: boolean | undefined;
};

/**
 * 그룹 상세 하단 버튼. 여행 상태·모드·내 설문 여부에 따라 다음에 할 일로 안내함.
 * 대표자만 할 수 있는 일(새 여행, 모드 선택)은 멤버에게 보이지 않음
 */
export function getPrimaryAction({
  group,
  isLeader,
  myPreferencesCompleted,
}: PrimaryActionInput): PrimaryAction | null {
  // 진행 중인 여행이 없거나 끝났으면 새 여행을 시작함
  if (group.tripId === null || group.status === "COMPLETED") {
    return isLeader ? { label: "새 여행 시작하기", href: `/groups/${group.id}/trips/new` } : null;
  }

  if (group.status === "IN_PROGRESS") {
    return { label: "이어서 하기", href: getModeStartHref(group) };
  }

  // PLANNING: 모드 선택 → 취향 설문 → 모드 시작 순서
  if (group.mode === null) {
    return isLeader ? { label: "여행 시작하기", href: `/groups/${group.id}/mode` } : null;
  }
  if (myPreferencesCompleted === false) {
    return { label: "취향 설문 작성하기", href: `/groups/${group.id}/survey` };
  }
  if (myPreferencesCompleted === true) {
    return { label: "이어서 하기", href: getModeStartHref(group) };
  }
  return null;
}
