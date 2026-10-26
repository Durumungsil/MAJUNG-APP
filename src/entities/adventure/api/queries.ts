import { useQuery } from "@tanstack/react-query";
import { fetchAdventureProcess, fetchCurrentMission } from "./adventure-api";
import { adventureKeys } from "./query-keys";

/** 오늘 진행할 미션. 없으면 data가 null */
export function useCurrentMission(groupId: number) {
  return useQuery({
    queryKey: adventureKeys.currentMission(groupId),
    queryFn: () => fetchCurrentMission(groupId),
  });
}

/** processId를 아직 모르면(null) 요청하지 않음 */
export function useAdventureProcess(groupId: number, processId: number | null) {
  return useQuery({
    queryKey: adventureKeys.process(groupId, processId ?? 0),
    queryFn: () => fetchAdventureProcess(groupId, processId ?? 0),
    enabled: processId !== null,
  });
}
