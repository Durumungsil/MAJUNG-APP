import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adventureKeys, replaceMission } from "@/entities/adventure";

/**
 * 로드뷰 미지원 장소의 미션 교체. 교체된 미션은 시작·힌트 기록이 초기화돼 있으므로
 * 현재 미션 캐시를 바꿔 지도 화면에서 다시 시작되게 함
 */
export function useReplaceMission(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (missionId: number) => replaceMission(groupId, missionId),
    onSuccess: (mission) => {
      queryClient.setQueryData(adventureKeys.currentMission(groupId), mission);
      return queryClient.invalidateQueries({ queryKey: adventureKeys.group(groupId) });
    },
  });
}
