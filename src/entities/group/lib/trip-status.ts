import type { Group } from "../model/types";

/** 진행 중인 여행 회차가 없거나 끝났는지 (대표자가 모드를 종료하면 COMPLETED가 됨) */
export function isTripEnded(group: Pick<Group, "tripId" | "status">): boolean {
  return group.tripId === null || group.status === "COMPLETED";
}
