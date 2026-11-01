import type { PlaceCategory } from "../model/types";

export const placeKeys = {
  all: ["places"] as const,
  /** 그룹의 추천 목록 전체 (카테고리 무관). 선택을 저장하면 통째로 초기화함 */
  recommendations: (groupId: number) => [...placeKeys.all, "recommendations", groupId] as const,
  recommendationList: (groupId: number, category: PlaceCategory | null) =>
    [...placeKeys.recommendations(groupId), category ?? "ALL"] as const,
  nearby: (groupId: number, placeId: string) =>
    [...placeKeys.all, "nearby", groupId, placeId] as const,
  details: (placeId: string) => [...placeKeys.all, "details", placeId] as const,
  photo: (placeId: string) => [...placeKeys.all, "photo", placeId] as const,
};
