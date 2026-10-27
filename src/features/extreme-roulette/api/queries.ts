import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isApiError } from "@/shared/api";
import type { RouletteKind } from "../model/types";
import { rouletteKeys } from "./query-keys";
import { drawRoulette, fetchGroupAllergies, fetchRouletteResult } from "./roulette-api";

/** 룰렛 추첨. 결과는 상세·길 안내 화면에서 바로 쓰도록 조회 캐시에 넣어 둠 */
export function useDrawRoulette(groupId: number, kind: RouletteKind) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => drawRoulette(groupId, kind),
    onSuccess: (result) =>
      queryClient.setQueryData(rouletteKeys.result(groupId, result.id), result),
  });
}

/** 룰렛 결과 (상세·길 안내 화면) */
export function useRouletteResult(groupId: number, rouletteId: number) {
  return useQuery({
    queryKey: rouletteKeys.result(groupId, rouletteId),
    queryFn: () => fetchRouletteResult(groupId, rouletteId),
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
