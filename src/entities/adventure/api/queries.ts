import { useQuery } from "@tanstack/react-query";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import { roundPosition } from "../lib/round-position";
import { fetchAdventureProcess, fetchCurrentMission, fetchMissionDistance } from "./adventure-api";
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

/**
 * 힌트를 쓴 미션의 남은 거리(m). missionId가 null(힌트 안 씀)이거나 위치가 없으면 요청하지 않음.
 * 위치가 조금씩 바뀔 때마다 요청하지 않도록 좌표를 반올림해 key로 쓰고, 새 값이 올 때까지 이전 거리를 보여줌
 */
export function useMissionDistance(
  groupId: number,
  missionId: number | null,
  position: LatLngLiteral | null,
) {
  const roundedPosition = position && roundPosition(position);
  return useQuery({
    queryKey: adventureKeys.distance(groupId, missionId ?? 0, roundedPosition),
    queryFn: () =>
      fetchMissionDistance(groupId, missionId ?? 0, roundedPosition ?? { lat: 0, lng: 0 }),
    enabled: missionId !== null && roundedPosition !== null,
    // 같은 미션일 때만 이전 거리를 이어서 보여줌 (다음·교체된 미션에 이전 장소 거리가 남지 않게)
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey[3] === missionId ? previousData : undefined,
    staleTime: Infinity,
  });
}
