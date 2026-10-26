import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adventureKeys,
  createAdventureProcess,
  fetchCurrentMission,
  getTodayInSeoul,
  loadProcessId,
  saveProcessId,
} from "@/entities/adventure";
import { ApiError, isApiError } from "@/shared/api";
import { ADVENTURE_MISSION_COUNT } from "../config/mission-count";

/**
 * 오늘 날짜의 모험 커리큘럼을 만듦.
 * 커리큘럼은 날짜마다 하나라서 다른 멤버가 먼저 만들었으면 409가 오는데, 이때 오늘 미션이 있으면 그대로 이어서 진행함
 */
async function startAdventure(groupId: number): Promise<void> {
  const travelDate = getTodayInSeoul();
  try {
    const created = await createAdventureProcess(groupId, {
      travelDate,
      missionCount: ADVENTURE_MISSION_COUNT,
    });
    saveProcessId(groupId, travelDate, created.processId);
    return;
  } catch (error) {
    if (!isApiError(error, 409)) throw error;
  }

  // 409는 "이미 있음" 말고도 모험모드가 아니거나 장소 후보가 부족할 때도 오므로, 이어서 할 미션이 있는지로 구분함
  const currentMission = await fetchCurrentMission(groupId);
  if (currentMission === null && loadProcessId(groupId, travelDate) === null) {
    throw new ApiError(409);
  }
}

export function useStartAdventure(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => startAdventure(groupId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adventureKeys.group(groupId) }),
  });
}
