import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adventureKeys, fetchMissionHint } from "@/entities/adventure";

/**
 * 힌트 제공 - GET이지만 부를 때마다 힌트 사용 횟수가 올라 랭크에 반영되므로,
 * 자동으로 다시 불리지 않도록 쿼리가 아니라 사용자가 누를 때만 실행하는 mutation으로 씀
 */
export function useMissionHint(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (missionId: number) => fetchMissionHint(groupId, missionId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adventureKeys.currentMission(groupId) }),
  });
}
