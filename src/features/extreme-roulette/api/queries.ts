import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isApiError, PERSISTED_QUERY_OPTIONS } from "@/shared/api";
import type { RouletteKind } from "../model/types";
import { rouletteKeys } from "./query-keys";
import {
  confirmRoulette,
  drawRoulette,
  fetchConfirmedRoulettes,
  fetchGroupAllergies,
  fetchRouletteResult,
} from "./roulette-api";

/** 룰렛 추첨. 결과는 상세·길 안내 화면에서 바로 쓰도록 조회 캐시에 넣어 둠 */
export function useDrawRoulette(groupId: number, kind: RouletteKind) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => drawRoulette(groupId, kind),
    onSuccess: (result) =>
      queryClient.setQueryData(rouletteKeys.result(groupId, result.id), result),
  });
}

/**
 * 룰렛 결과 (상세·길 안내 화면). rouletteId가 없으면(null) 요청하지 않음.
 * 추첨 결과라 다시 만들 수 없으므로 새로고침 뒤에도 남김
 */
export function useRouletteResult(groupId: number, rouletteId: number | null) {
  return useQuery({
    queryKey: rouletteKeys.result(groupId, rouletteId ?? 0),
    queryFn: () => fetchRouletteResult(groupId, rouletteId ?? 0),
    enabled: rouletteId !== null,
    ...PERSISTED_QUERY_OPTIONS,
  });
}

/** 종류별 확정 결과 (익스트림 메인 카드) */
export function useConfirmedRoulettes(
  groupId: number,
  /** 대표자의 확정을 따라가야 하는 멤버만 주기적으로 다시 조회함 */
  refetchInterval?: number,
) {
  return useQuery({
    queryKey: rouletteKeys.confirmed(groupId),
    queryFn: () => fetchConfirmedRoulettes(groupId),
    refetchInterval,
  });
}

/** 룰렛 결과 확정. 메인 카드가 새 확정을 보여주도록 확정 결과를 다시 받음 */
export function useConfirmRoulette(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rouletteId: number) => confirmRoulette(groupId, rouletteId),
    onSuccess: (result) => {
      queryClient.setQueryData(rouletteKeys.result(groupId, result.id), result);
      return queryClient.invalidateQueries({ queryKey: rouletteKeys.confirmed(groupId) });
    },
  });
}

/** 그룹 멤버 알레르기 합집합. 취향 입력이 하나도 없으면(404) 알릴 알레르기가 없는 것으로 봄 */
export function useGroupAllergies(groupId: number, enabled: boolean) {
  return useQuery({
    queryKey: rouletteKeys.allergies(groupId),
    queryFn: async () => {
      try {
        return await fetchGroupAllergies(groupId);
      } catch (error) {
        if (isApiError(error, 404)) return [];
        throw error;
      }
    },
    enabled,
    // 확정 직전에 최신 취향으로 알려야 하므로 화면에 들어올 때마다 다시 받음
    staleTime: 0,
  });
}
