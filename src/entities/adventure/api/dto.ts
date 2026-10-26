import type { AdventureStatus, MissionStatus } from "../model/types";

// 백엔드 JSON이 snake_case라서 요청·응답 타입은 필드 이름을 그대로 따름. 화면에서는 model/types로 변환해서 씀

export type CreateAdventureRequest = {
  /** YYYY-MM-DD */
  travel_date: string;
  mission_count: number;
};

export type CreateAdventureResponse = {
  process_id: number;
  group_id: number;
  status: AdventureStatus;
  mission_count: number;
  destination_count: number;
  first_mission_id: number;
  created_at: string;
};

export type AdventureProcessResponse = {
  process_id: number;
  status: AdventureStatus;
  progress: { completed: number; total: number };
  current_mission_id: number | null;
  missions: {
    mission_id: number;
    order: number;
    status: MissionStatus;
    /** 완료한 미션에만 내려옴 */
    completed_at?: string;
  }[];
};

export type CurrentMissionResponse = {
  mission_id: number;
  order: number;
  status: MissionStatus;
  title: string;
  objective: string;
  hint_count: number;
  started_at: string | null;
};

export type MissionLocationRequest = {
  latitude: number;
  longitude: number;
};

export type StartMissionResponse = {
  mission_id: number;
  started_at: string;
};

export type MissionHintResponse = {
  mission_id: number;
  latitude: number;
  longitude: number;
  view_seconds: number;
  hint_count: number;
};

export type CompleteMissionRequest = MissionLocationRequest & {
  /** ISO 날짜시간. 선택값이며 서버는 저장·랭크 계산에 서버 시각을 씀 */
  completed_at?: string;
};

export type CompleteMissionResponse = {
  mission_id: number;
  status: MissionStatus;
  next_mission_id: number | null;
  completed_at: string;
};
