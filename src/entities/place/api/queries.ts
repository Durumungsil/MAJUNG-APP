import { useInfiniteQuery } from "@tanstack/react-query";
import { RECOMMENDATION_PAGE_SIZE } from "../config/constants";
import { fetchRecommendedPlaces } from "./place-api";
import { placeKeys } from "./query-keys";

/** 추천 장소 목록 (무한 스크롤). 페이지를 이어 붙인 목록은 select로 펼침 */
export function useRecommendedPlaces(groupId: number) {
  return useInfiniteQuery({
    queryKey: placeKeys.recommendations(groupId),
    queryFn: ({ pageParam }) =>
      fetchRecommendedPlaces(groupId, RECOMMENDATION_PAGE_SIZE, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data.pages.flatMap((page) => page.places),
  });
}
