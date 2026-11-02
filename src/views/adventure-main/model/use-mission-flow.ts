"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  formatDistance,
  useAdventureStore,
  useCurrentMission,
  useMissionDistance,
  type CompletedMission,
} from "@/entities/adventure";
import { useAutoCompleteMission } from "@/features/complete-mission";
import { useAutoStartMission } from "@/features/start-mission";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { useCurrentPosition } from "@/shared/lib/use-current-position";
import { CURRENT_MISSION_POLLING_MS } from "../config/polling";

/**
 * 모험모드 메인 화면의 미션 흐름.
 * 장소 찾는 중이면 아직 시작 안 한 미션을 현재 위치에서 시작하고, 시작한 미션은 위치가 바뀔 때마다 서버에 도착 판정을 요청함
 */
export function useMissionFlow(groupId: number) {
  const router = useRouter();
  const { position, accuracyMeters } = useCurrentPosition();
  const currentMissionQuery = useCurrentMission(groupId, CURRENT_MISSION_POLLING_MS);
  const mission = currentMissionQuery.data ?? null;

  const phase = useAdventureStore((state) => state.phase);
  const succeededMission = useAdventureStore((state) => state.succeededMission);
  const succeed = useAdventureStore((state) => state.succeed);
  const exploreAround = useAdventureStore((state) => state.exploreAround);
  const searchNext = useAdventureStore((state) => state.searchNext);

  const { toastMessage, showToast } = useToast();
  const isSearching = phase === "searching";
  const missionOrder = mission?.order ?? null;

  const handleMissionError = useCallback(
    () => showToast(ERROR_MESSAGES.requestFailed),
    [showToast],
  );

  const handleMissionComplete = useCallback(
    (result: CompletedMission) => {
      succeed({ order: missionOrder ?? 1, hasNext: result.nextMissionId !== null });
    },
    [succeed, missionOrder],
  );

  useAutoStartMission({
    groupId,
    mission,
    position,
    enabled: isSearching,
    onError: handleMissionError,
  });

  // 남은 거리는 힌트를 쓴 미션만 서버가 알려줌 (안 쓰면 409)
  const { data: remainingMeters } = useMissionDistance(
    groupId,
    mission !== null && mission.hintCount > 0 && isSearching ? mission.id : null,
    position,
  );

  useAutoCompleteMission({
    groupId,
    missionId: mission !== null && mission.startedAt !== null ? mission.id : null,
    position,
    accuracyMeters,
    enabled: isSearching,
    onComplete: handleMissionComplete,
    onError: handleMissionError,
  });

  function goToNextPlace() {
    searchNext();
    // 마지막 미션까지 끝냈으면 다음 장소 대신 여정 화면으로 보냄
    if (succeededMission?.hasNext === false) router.push(`/groups/${groupId}/adventure/journey`);
  }

  return {
    position,
    currentMissionQuery,
    mission,
    phase,
    succeededMission,
    remainingDistanceLabel: remainingMeters === undefined ? null : formatDistance(remainingMeters),
    toastMessage,
    exploreAround,
    goToNextPlace,
  };
}
