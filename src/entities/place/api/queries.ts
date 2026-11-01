import { useInfiniteQuery, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { isApiError } from "@/shared/api";
import {
  PLACE_DETAILS_GC_MS,
  RECOMMENDATION_PAGE_SIZE,
  RECOMMENDATION_STALE_MS,
} from "../config/constants";
import type { Place, PlaceCategory, PlaceDetails } from "../model/types";
import { fetchPlaceDetails, fetchPlacePhoto } from "./google-place-api";
import { fetchNearbyPlaces, fetchRecommendedPlaces } from "./place-api";
import { placeKeys } from "./query-keys";

/** 유료 Google 요청을 다시 보내지 않도록 자동 갱신을 끔 */
const NO_AUTO_REFETCH = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** Google 장소 상세는 바뀌지 않으므로 메모리에 있는 동안 다시 요청하지 않음. 실패해도 재시도하지 않음 */
const GOOGLE_PLACE_QUERY_OPTIONS = {
  staleTime: Infinity,
  gcTime: PLACE_DETAILS_GC_MS,
  retry: false,
} as const;

/**
 * 추천 장소 목록 (무한 스크롤). 카테고리마다 결과·cursor를 따로 둬서 탭을 바꾸면 첫 페이지부터 받음.
 * loadMore는 cursor가 만료(400)되면 목록을 첫 페이지부터 다시 받음
 */
export function useRecommendedPlaces(groupId: number, category: PlaceCategory | null) {
  const queryClient = useQueryClient();
  const queryKey = placeKeys.recommendationList(groupId, category);
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchRecommendedPlaces(groupId, {
        category,
        limit: RECOMMENDATION_PAGE_SIZE,
        cursor: pageParam,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data.pages.flatMap((page) => page.places),
    staleTime: RECOMMENDATION_STALE_MS,
    ...NO_AUTO_REFETCH,
  });

  async function loadMore() {
    const result = await query.fetchNextPage();
    if (result.isFetchNextPageError && isApiError(result.error, 400)) {
      await queryClient.resetQueries({ queryKey });
    }
  }

  return { ...query, loadMore };
}

/** 기준 장소 주변 추천. 기준 장소가 바뀌면 key가 바뀌어 이전 결과를 쓰지 않음. null이면 요청하지 않음 */
export function useNearbyPlaces(groupId: number, placeId: string | null) {
  return useQuery({
    queryKey: placeKeys.nearby(groupId, placeId ?? ""),
    queryFn: () => fetchNearbyPlaces(groupId, placeId ?? ""),
    enabled: placeId !== null,
    staleTime: RECOMMENDATION_STALE_MS,
    ...NO_AUTO_REFETCH,
  });
}

/** Google 장소 이름·좌표. placeId가 null이면 요청하지 않음 */
export function usePlaceDetails(placeId: string | null) {
  return useQuery({
    queryKey: placeKeys.details(placeId ?? ""),
    queryFn: () => fetchPlaceDetails(placeId ?? ""),
    enabled: placeId !== null,
    ...GOOGLE_PLACE_QUERY_OPTIONS,
  });
}

/** 여러 장소의 이름·좌표. 아직 못 받았거나 실패한 장소는 결과에 없음 */
export function usePlaceDetailsMap(placeIds: readonly string[]): ReadonlyMap<string, PlaceDetails> {
  return useQueries({
    queries: placeIds.map((placeId) => ({
      queryKey: placeKeys.details(placeId),
      queryFn: () => fetchPlaceDetails(placeId),
      ...GOOGLE_PLACE_QUERY_OPTIONS,
    })),
    combine: (results) =>
      new Map(
        results.flatMap((result, index) =>
          result.data ? [[placeIds[index], result.data] as const] : [],
        ),
      ),
  });
}

/** 상세 화면 사진 1장. 목록에서는 쓰지 말 것 (사진 요청은 따로 과금됨) */
export function usePlacePhoto(placeId: string) {
  return useQuery({
    queryKey: placeKeys.photo(placeId),
    queryFn: () => fetchPlacePhoto(placeId),
    ...GOOGLE_PLACE_QUERY_OPTIONS,
  });
}

/**
 * 응답에 이름·좌표가 없는 장소(일정·룰렛)를 Google SDK로 채움.
 * 이미 둘 다 있으면(추천 결과) 요청하지 않음
 */
export function useResolvedPlace(place: Place | null) {
  const needsDetails = place !== null && (place.name === null || place.location === null);
  const { data, isPending, isError, refetch } = usePlaceDetails(needsDetails ? place.id : null);

  return {
    name: place?.name ?? data?.name ?? null,
    location: place?.location ?? data?.location ?? null,
    isPending: needsDetails && isPending,
    isError: needsDetails && isError,
    refetch,
  };
}
