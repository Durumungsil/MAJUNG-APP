import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip, groupKeys, patchGroupDetail } from "@/entities/group";

type StartTripValues = {
  region: string;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
};

/** 여행 회차 생성 - 대표자만 가능, 끝나지 않은 여행이 있으면 409 */
export function useStartTrip(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: StartTripValues) => createTrip(groupId, values),
    // 새 회차를 캐시에 바로 넣고, 다시 받기는 기다리지 않아 모드 선택 화면으로 바로 넘어감
    onSuccess: (trip) => {
      patchGroupDetail(queryClient, groupId, {
        tripId: trip.id,
        status: trip.status,
        mode: trip.mode,
        region: trip.region,
        startDate: trip.startDate,
        endDate: trip.endDate,
        preferencesCompletedCount: 0,
        myPreferencesCompleted: false,
      });
      void queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}
