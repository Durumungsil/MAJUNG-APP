export type GroupRole = "leader" | "member";

export type TripMode = "STORY" | "ADVENTURE" | "EXTREME";

/** 여행 회차 상태: 계획 중 / 여행 중 / 종료 */
export type TripStatus = "PLANNING" | "IN_PROGRESS" | "COMPLETED";

/** 그룹 목록의 한 항목. 여행 관련 값은 현재 여행 회차 기준이며 회차가 없으면 null */
export type GroupSummary = {
  id: number;
  name: string;
  region: string | null;
  tripId: number | null;
  mode: TripMode | null;
  memberCount: number;
  maxMembers: number;
  /** YYYY-MM-DD */
  startDate: string | null;
  /** YYYY-MM-DD */
  endDate: string | null;
  myPreferencesCompleted: boolean;
};

/** 그룹 상세. 여행 관련 값은 현재 여행 회차 기준이며 회차가 없으면 null */
export type Group = {
  id: number;
  name: string;
  region: string | null;
  memberCount: number;
  maxMembers: number;
  ownerId: number;
  tripId: number | null;
  status: TripStatus | null;
  mode: TripMode | null;
  /** 취향 입력을 마친 멤버 수 (누가 했는지는 알 수 없음) */
  preferencesCompletedCount: number;
  /** YYYY-MM-DD */
  startDate: string | null;
  /** YYYY-MM-DD */
  endDate: string | null;
};

export type Trip = {
  id: number;
  region: string;
  mode: TripMode | null;
  status: TripStatus;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
};

export type InviteCode = {
  groupId: number;
  groupName: string;
  code: string;
  /** ISO 날짜시간 */
  expiresAt: string | null;
};

/** 초대 코드로 미리 본 그룹 정보 */
export type InvitationPreview = {
  groupId: number;
  groupName: string;
  region: string | null;
  memberCount: number;
  maxMembers: number;
  /** 이미 이 그룹의 멤버면 false */
  joinable: boolean;
};

export type GroupFormValues = {
  name: string;
  destination: string;
  maxMembers: string;
  startDate: string;
  endDate: string;
};
