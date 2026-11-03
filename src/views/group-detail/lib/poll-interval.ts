import { GROUP_POLL_INTERVAL_MS, isTripEnded, type Group } from "@/entities/group";

type PollTarget = Pick<Group, "tripId" | "status" | "mode">;

/** 대표자가 모드를 고르기를 기다리는 단계인지 (고르면 멤버에게 설문 버튼이 나타남) */
function isWaitingForMode(group: PollTarget): boolean {
  return group.tripId !== null && group.status === "PLANNING" && group.mode === null;
}

/**
 * 그룹 상세를 다시 조회할 주기. 대표자의 다음 행동을 기다리는 동안만 조회함
 * - 모드 선택 대기
 * - 멤버: 여행이 없거나 끝나서 대표자가 새 여행을 시작하기를 기다릴 때
 */
export function getGroupPollInterval(group: PollTarget | undefined, isMember: boolean) {
  if (!group) return false;
  const isWaiting = isWaitingForMode(group) || (isMember && isTripEnded(group));
  return isWaiting ? GROUP_POLL_INTERVAL_MS : false;
}
