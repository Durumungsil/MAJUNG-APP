import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/api";
import type {
  MyPreference,
  PreferenceSummary,
  TransportType,
  TravelCategory,
} from "../model/types";
import { preferenceKeys } from "./query-keys";

/** GET /preferences/me 응답 (snake_case 그대로) */
type MyPreferenceResponse = {
  user_id: number;
  transport_types: TransportType[];
  food_preferences: { food: string; score: number }[];
  allergies: string[];
  travel_categories: TravelCategory[];
  budget: { max: number | null };
  loaded_from_previous: boolean;
  updated_at: string;
};

/** GET /preferences/summary 응답 (snake_case 그대로) */
type PreferenceSummaryResponse = {
  group_id: number;
  transport_types: TransportType[];
  food_preferences: string[];
  travel_categories: TravelCategory[];
  budget: { min: number | null; max: number | null; aggregation: string };
  allergies: string[];
  completed_member_count: number;
  member_count: number;
};

/** 내 취향 조회 - 현재 회차에 없으면 이전 회차 취향을 불러옴 */
export async function fetchMyPreference(groupId: number): Promise<MyPreference> {
  const data = await apiRequest<MyPreferenceResponse>(`/api/v1/groups/${groupId}/preferences/me`);
  return {
    transportTypes: data.transport_types,
    foodPreferences: data.food_preferences,
    allergies: data.allergies,
    travelCategories: data.travel_categories,
    budgetMax: data.budget.max,
    loadedFromPrevious: data.loaded_from_previous,
  };
}

/** 취향 통합 - 그룹 멤버 취향의 집계 결과 */
export async function fetchPreferenceSummary(groupId: number): Promise<PreferenceSummary> {
  const data = await apiRequest<PreferenceSummaryResponse>(
    `/api/v1/groups/${groupId}/preferences/summary`,
  );
  return {
    transportTypes: data.transport_types,
    foodPreferences: data.food_preferences,
    travelCategories: data.travel_categories,
    allergies: data.allergies,
    budget: { min: data.budget.min, max: data.budget.max },
    completedMemberCount: data.completed_member_count,
    memberCount: data.member_count,
  };
}

/**
 * 취향 통합 대기 화면에서 다른 멤버의 입력 진행 상황을 주기적으로 확인함.
 * groupId가 아직 없으면(null) 요청하지 않음
 */
export function usePreferenceSummary(groupId: number | null, refetchInterval?: number) {
  return useQuery({
    queryKey: preferenceKeys.summary(groupId ?? 0),
    queryFn: () => fetchPreferenceSummary(groupId ?? 0),
    enabled: groupId !== null,
    refetchInterval,
  });
}
