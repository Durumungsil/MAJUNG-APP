import type { TripMode, TripStatus } from "../model/types";

// 백엔드 JSON이 snake_case라서 응답 타입은 필드 이름을 그대로 따름. 화면에서는 model/types로 변환해서 씀

export type GroupListResponse = {
  items: {
    group_id: number;
    group_name: string;
    region: string | null;
    trip_id: number | null;
    mode: TripMode | null;
    member_count: number;
    max_members: number;
    travel_start_date: string | null;
    travel_end_date: string | null;
    my_preferences_completed: boolean;
  }[];
};

export type GroupDetailResponse = {
  group_id: number;
  group_name: string;
  region: string | null;
  max_members: number;
  member_count: number;
  owner_id: number;
  trip_id: number | null;
  status: TripStatus | null;
  mode: TripMode | null;
  preferences_completed: number;
  travel_start_date: string | null;
  travel_end_date: string | null;
};

export type InviteCodeResponse = {
  group_id: number;
  group_name: string;
  invite_code: string;
  expires_at: string | null;
};

export type VerifyInviteCodeResponse = {
  group_id: number;
  group_name: string;
  region: string | null;
  member_count: number;
  max_members: number;
  joinable: boolean;
  expires_at: string | null;
};

export type TripResponse = {
  trip_id: number;
  group_id: number;
  region: string;
  mode: TripMode | null;
  status: TripStatus;
  travel_start_date: string;
  travel_end_date: string;
  created_at: string;
};

export type TripListResponse = {
  group_id: number;
  items: Omit<TripResponse, "group_id" | "created_at">[];
};

export type CreateTripRequest = {
  region: string;
  travel_start_date: string;
  travel_end_date: string;
};
