import type { Group } from "@/entities/group";

/** 여행 종료일이 지났는지. 날짜가 같은 YYYY-MM-DD 형식이라 문자열 비교로 판단함 */
export function isTripPeriodOver(endDate: string | null, today: string): boolean {
  return endDate !== null && endDate < today;
}

/**
 * 대표자가 그룹 상세 메뉴에서 여행을 끝낼 수 있는지.
 * 모드를 고르지 않은 여행은 서버가 끝내주지 않으므로(409) 메뉴를 보여주지 않음
 */
export function canEndTrip(
  group: Pick<Group, "tripId" | "status" | "mode">,
  isLeader: boolean,
): boolean {
  return (
    isLeader &&
    group.tripId !== null &&
    group.status !== null &&
    group.status !== "COMPLETED" &&
    group.mode !== null
  );
}

type AutoEndTripInput = {
  group: Pick<Group, "tripId" | "status" | "mode" | "endDate">;
  isLeader: boolean;
  /** 오늘 날짜(Asia/Seoul) YYYY-MM-DD */
  today: string;
};

/**
 * 종료일이 지났는데 끝나지 않은 여행을 자동으로 끝낼지.
 * 백엔드는 날짜가 지나도 여행을 끝내지 않고, 끝나지 않은 여행이 있으면 새 여행을 만들 수 없음.
 * 모드 종료는 대표자만 할 수 있고, 모드를 고르지 않은 여행은 서버가 끝내주지 않음(409)
 */
export function shouldAutoEndTrip({ group, isLeader, today }: AutoEndTripInput): boolean {
  return (
    isLeader &&
    group.tripId !== null &&
    group.status !== null &&
    group.status !== "COMPLETED" &&
    group.mode !== null &&
    isTripPeriodOver(group.endDate, today)
  );
}
