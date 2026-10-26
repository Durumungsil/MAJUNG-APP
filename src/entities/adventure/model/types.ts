import type { LatLngLiteral } from "@/shared/model/lat-lng";

/** 커리큘럼 상태: 생성됨 / 진행 중 / 그날 미션 모두 완료 */
export type AdventureStatus = "READY" | "IN_PROGRESS" | "COMPLETED";

/** 미션 상태: 차례 전 / 진행 가능 / 완료 */
export type MissionStatus = "LOCKED" | "AVAILABLE" | "COMPLETED";

export type CreatedAdventure = {
  processId: number;
  status: AdventureStatus;
  missionCount: number;
  firstMissionId: number;
};

export type MissionProgress = {
  id: number;
  order: number;
  status: MissionStatus;
  /** ISO 날짜시간. 완료한 미션에만 있음 */
  completedAt: string | null;
};

export type AdventureProcess = {
  id: number;
  status: AdventureStatus;
  completedCount: number;
  totalCount: number;
  /** 진행 가능한 미션이 없으면 null */
  currentMissionId: number | null;
  missions: MissionProgress[];
};

/** 오늘 진행할 미션. 정답이 드러나지 않도록 장소 정보는 없음 */
export type CurrentMission = {
  id: number;
  order: number;
  status: MissionStatus;
  title: string;
  objective: string;
  hintCount: number;
  /** ISO 날짜시간. 아직 시작하지 않았으면 null */
  startedAt: string | null;
};

export type MissionHint = {
  missionId: number;
  /** 로드뷰를 띄울 미션 장소 좌표 */
  location: LatLngLiteral;
  /** 로드뷰를 보여줄 시간(초) */
  viewSeconds: number;
  hintCount: number;
};

export type CompletedMission = {
  missionId: number;
  status: MissionStatus;
  /** 마지막 미션이면 null */
  nextMissionId: number | null;
  completedAt: string;
};
