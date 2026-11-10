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
  /** 사진 1장 (카드 썸네일) */
  photo: (placeId: string) => [...placeKeys.all, "photo", placeId] as const,
  /** 상세 시트 정보 (주소·영업시간·평점·사진·리뷰) */
  detailInfo: (placeId: string) => [...placeKeys.all, "detail-info", placeId] as const,
};
