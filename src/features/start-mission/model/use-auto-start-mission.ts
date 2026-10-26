"use client";

import { useEffect, useRef } from "react";
import type { CurrentMission } from "@/entities/adventure";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import { useStartMission } from "../api/start-mission";

type AutoStartMissionOptions = {
  groupId: number;
  mission: CurrentMission | null | undefined;
  position: LatLngLiteral | null;
  /** 장소를 찾는 단계일 때만 시작함 (성공 모달·주변 둘러보기 중에는 다음 미션을 시작하지 않음) */
  enabled: boolean;
  onError: (error: unknown) => void;
};

/** 아직 시작하지 않은 미션이면 현재 위치를 출발점으로 미션을 시작함. 미션마다 한 번만 요청 */
export function useAutoStartMission({
  groupId,
  mission,
  position,
  enabled,
  onError,
}: AutoStartMissionOptions) {
  const { mutate } = useStartMission(groupId);
  const requestedMissionIdRef = useRef<number | null>(null);
  const missionId = mission?.id ?? null;
  const isNotStarted = mission != null && mission.startedAt === null;

  useEffect(() => {
    if (!enabled || !isNotStarted || missionId === null || position === null) return;
    if (requestedMissionIdRef.current === missionId) return;
    requestedMissionIdRef.current = missionId;
    mutate({ missionId, position }, { onError });
  }, [enabled, isNotStarted, missionId, position, mutate, onError]);
}
