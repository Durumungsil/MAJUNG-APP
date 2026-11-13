import { useMutation, useQueryClient } from "@tanstack/react-query";
import { journeyKeys, type Itinerary } from "@/entities/journey";
import { apiRequest } from "@/shared/api";
import { formatMinutes, type TimeSlot } from "../lib/time-slot";
import type { TimePatch } from "../lib/plan-time-patches";
import { withStopTime } from "../lib/with-stop-time";

/** PATCH /itineraries/{itineraryId}/items/{itemId} 응답 (필요한 필드만) */
type UpdateItemResponse = {
  item_id: number;
  start_at: string;
  end_at: string;
  /** 바꾼 시간에 장소가 영업하지 않는 구간이 있으면 true (저장은 됨) */
  has_conflict: boolean;
};

/**
 * 타임라인 항목 수정 - 방문(VISIT)의 시작·종료 시각만 보냄.
 * 하루 일정 범위를 벗어나거나 같은 날 다른 방문과 겹치면 400
 */
export function updateStopTime(
  groupId: number,
  itineraryId: number,
  stopId: string,
  slot: TimeSlot,
) {
  return apiRequest<UpdateItemResponse>(
    `/api/v1/groups/${groupId}/itineraries/${itineraryId}/items/${stopId}`,
    {
      method: "PATCH",
      body: { start_at: formatMinutes(slot.start), end_at: formatMinutes(slot.end) },
    },
  );
}

/** 저장된 시간을 캐시에 바로 반영함. 확정 화면은 이 캐시(새로고침 뒤에도 남음)를 읽음 */
function useSyncStopTime(groupId: number, itineraryId: number) {
  const queryClient = useQueryClient();
  return (response: UpdateItemResponse) =>
    queryClient.setQueryData<Itinerary>(journeyKeys.itinerary(groupId, itineraryId), (prev) =>
      prev
        ? withStopTime(prev, String(response.item_id), response.start_at, response.end_at)
        : prev,
    );
}

/** 시간 수정 시트에서 방문 하나의 시간을 바로 저장한 뒤 서버 타임라인을 다시 받음 */
export function useUpdateStopTime(groupId: number, itineraryId: number) {
  const queryClient = useQueryClient();
  const syncStopTime = useSyncStopTime(groupId, itineraryId);
  return useMutation({
    mutationFn: ({ id, slot }: TimePatch) => updateStopTime(groupId, itineraryId, id, slot),
    onSuccess: syncStopTime,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: journeyKeys.itinerary(groupId, itineraryId) }),
  });
}

/**
 * 순서를 바꾼 타임라인을 확정할 때 planTimelinePatches가 정한 순서대로 하나씩 저장함.
 * 중간에 실패하면 일부만 저장됐을 수 있으므로 끝나면 성공·실패와 관계없이 서버 타임라인을 다시 받음
 */
export function useSaveTimelineTimes(groupId: number, itineraryId: number) {
  const queryClient = useQueryClient();
  const syncStopTime = useSyncStopTime(groupId, itineraryId);
  return useMutation({
    mutationFn: async (patches: readonly TimePatch[]) => {
      for (const { id, slot } of patches) {
        syncStopTime(await updateStopTime(groupId, itineraryId, id, slot));
      }
    },
    // 저장한 시간은 이미 캐시에 반영했으므로 다시 받기를 기다리지 않고 다음 단계(선택 저장·확정)로 넘어감
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: journeyKeys.itinerary(groupId, itineraryId) });
    },
  });
}
