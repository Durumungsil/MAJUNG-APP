import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adventureKeys, startMission } from "@/entities/adventure";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

type StartMissionValues = {
  missionId: number;
  /** 출발 위치. 서버가 이 위치에서 미션 장소까지의 직선거리로 랭크 기준 시간을 정함 */
  position: LatLngLiteral;
};

export function useStartMission(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ missionId, position }: StartMissionValues) =>
      startMission(groupId, missionId, position),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adventureKeys.currentMission(groupId) }),
  });
}
