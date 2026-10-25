import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupKeys } from "@/entities/group";
import { fetchMyPreference, preferenceKeys } from "@/entities/preference";
import { apiRequest } from "@/shared/api";
import type { PreferencePayload } from "../lib/preference-payload";

/** 그룹 의견 수집 (PUT) - 기존 취향을 통째로 교체함 */
export function savePreference(groupId: number, payload: PreferencePayload) {
  return apiRequest<unknown>(`/api/v1/groups/${groupId}/preferences`, {
    method: "PUT",
    body: {
      transport_types: payload.transportTypes,
      food_preferences: payload.foodPreferences,
      allergies: payload.allergies,
      travel_categories: payload.travelCategories,
      budget: { max: payload.budgetMax },
    },
  });
}

export function useSavePreference(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PreferencePayload) => savePreference(groupId, payload),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: preferenceKeys.summary(groupId) }),
        queryClient.invalidateQueries({ queryKey: groupKeys.all }),
      ]),
  });
}

/**
 * "이전 취향 설문지 불러오기" - 버튼을 눌렀을 때 한 번만 요청함.
 * 민감 정보라 쿼리 캐시에 남기지 않도록 mutation으로 받아 폼 기본값으로만 씀
 */
export function useLoadPreviousPreference(groupId: number) {
  return useMutation({ mutationFn: () => fetchMyPreference(groupId) });
}
