import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adventureKeys, completeMission } from "@/entities/adventure";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

type CompleteMissionValues = {
  missionId: number;
  position: LatLngLiteral;
};

/** 미션 완료 - 목적지 반경 밖이면 400이고 미션은 그대로 진행 가능 상태로 남음 */
export function useCompleteMission(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ missionId, position }: CompleteMissionValues) =>
      completeMission(groupId, missionId, position),
    // 다음 미션이 열리고 진행도가 바뀌므로 모험 데이터를 모두 다시 받음
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adventureKeys.group(groupId) }),
  });
}
