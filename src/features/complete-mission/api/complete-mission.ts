import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adventureKeys, completeMission } from "@/entities/adventure";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

type CompleteMissionValues = {
  missionId: number;
  position: LatLngLiteral;
  /** 실제 GPS 오차 반경(m) */
  accuracyMeters: number;
};

/** 미션 완료 - 위치·정확도·시간·속도 검증에 실패하면 400이고 미션은 그대로 진행 가능 상태로 남음 */
export function useCompleteMission(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ missionId, position, accuracyMeters }: CompleteMissionValues) =>
      completeMission(groupId, missionId, position, accuracyMeters),
    // 다음 미션이 열리고 진행도가 바뀌므로 모험 데이터를 모두 다시 받음
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adventureKeys.group(groupId) }),
  });
}
