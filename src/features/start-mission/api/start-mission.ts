import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adventureKeys, startMission } from "@/entities/adventure";
import { isApiError } from "@/shared/api";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

type StartMissionValues = {
  missionId: number;
  /** 출발 위치. 서버가 이 위치에서 미션 장소까지의 직선거리로 랭크 기준 시간을 정함 */
  position: LatLngLiteral;
};

/** 미션 시작 - 409(이미 완료됨 등)는 다른 기기에서 먼저 진행한 것이므로 현재 미션을 다시 받아 화면을 맞춤 */
export function useStartMission(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ missionId, position }: StartMissionValues) =>
      startMission(groupId, missionId, position),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adventureKeys.currentMission(groupId) }),
    onError: (error) => {
      if (isApiError(error, 409))
        return queryClient.invalidateQueries({ queryKey: adventureKeys.currentMission(groupId) });
    },
  });
}
