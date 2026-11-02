"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import {
  formatDistance,
  getMissionChange,
  useAdventureStore,
  useCurrentMission,
  useMissionDistance,
  type CompletedMission,
} from "@/entities/adventure";
import { getGroupRole, useGroup } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { useAutoCompleteMission } from "@/features/complete-mission";
import { useAutoStartMission } from "@/features/start-mission";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { useCurrentPosition } from "@/shared/lib/use-current-position";
import { CURRENT_MISSION_POLLING_MS } from "../config/polling";

/**
 * 모험모드 메인 화면의 미션 흐름.
 * 장소 찾는 중이면 아직 시작 안 한 미션을 현재 위치에서 시작하고, 시작한 미션은 위치가 바뀔 때마다 서버에 도착 판정을 요청함.
 * 미션 시작·도착 인증은 대표자 위치로만 하고, 멤버는 현재 미션을 다시 받아 대표자가 완료한 것을 알아차림
 */
export function useMissionFlow(groupId: number) {
  const router = useRouter();
  const { position, accuracyMeters } = useCurrentPosition();
  const currentMissionQuery = useCurrentMission(groupId, CURRENT_MISSION_POLLING_MS);
  const mission = currentMissionQuery.data ?? null;
  const { data: group } = useGroup(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  // 그룹을 불러오기 전에는 대표자로 보지 않음 (멤버 기기에서 시작·완료 요청이 나가지 않도록)
  const isLeader = group !== undefined && getGroupRole(group, userId) === "leader";

  const phase = useAdventureStore((state) => state.phase);
  const succeededMission = useAdventureStore((state) => state.succeededMission);
  const succeed = useAdventureStore((state) => state.succeed);
  const exploreAround = useAdventureStore((state) => state.exploreAround);
  const searchNext = useAdventureStore((state) => state.searchNext);

  const { toastMessage, showToast } = useToast();
  const isSearching = phase === "searching";
  const missionOrder = mission?.order ?? null;
  /** 이 기기가 찾고 있는 미션의 차례. 다시 받은 현재 미션과 비교해 다른 기기에서 완료된 것을 알아차림 */
  const searchingOrderRef = useRef<number | null>(null);

  const handleMissionError = useCallback(
    () => showToast(ERROR_MESSAGES.requestFailed),
    [showToast],
  );

  const handleMissionComplete = useCallback(
    (result: CompletedMission) => {
      const hasNext = result.nextMissionId !== null;
      // 완료 직후 다시 받은 다음 미션을 다른 기기의 완료로 착각하지 않도록 찾을 차례를 미리 옮김
      searchingOrderRef.current = hasNext && missionOrder !== null ? missionOrder + 1 : null;
      succeed({ order: missionOrder ?? 1, hasNext });
    },
    [succeed, missionOrder],
  );

  // 장소를 찾는 중에 현재 미션의 차례가 넘어갔으면 다른 기기(대표자)가 완료한 것 → 같은 성공 모달을 띄움
  useEffect(() => {
    if (currentMissionQuery.data === undefined) return;
    const current = currentMissionQuery.data;
    const searchingOrder = searchingOrderRef.current;
    if (searchingOrder === null) {
      searchingOrderRef.current = current?.order ?? null;
      return;
    }
    if (!isSearching) return;
    const change = getMissionChange({ order: searchingOrder }, current);
    if (change === "same") return;
    searchingOrderRef.current = current?.order ?? null;
    succeed({ order: searchingOrder, hasNext: change === "advanced" });
  }, [currentMissionQuery.data, isSearching, succeed]);

  useAutoStartMission({
    groupId,
    mission,
    position,
    enabled: isSearching && isLeader,
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
    enabled: isSearching && isLeader,
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
    isLeader,
    phase,
    succeededMission,
    remainingDistanceLabel: remainingMeters === undefined ? null : formatDistance(remainingMeters),
    toastMessage,
    exploreAround,
    goToNextPlace,
  };
}
