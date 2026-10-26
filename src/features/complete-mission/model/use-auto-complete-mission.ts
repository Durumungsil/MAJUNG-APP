"use client";

import { useEffect, useRef } from "react";
import type { CompletedMission } from "@/entities/adventure";
import { isApiError } from "@/shared/api";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import { useCompleteMission } from "../api/complete-mission";
import { type CompletionAttempt, shouldAttemptCompletion } from "../lib/should-attempt-completion";

type AutoCompleteMissionOptions = {
  groupId: number;
  /** 시작한 미션 ID. 시작 전이면 null */
  missionId: number | null;
  position: LatLngLiteral | null;
  /** 장소를 찾는 단계일 때만 요청함 */
  enabled: boolean;
  onComplete: (result: CompletedMission) => void;
  onError: (error: unknown) => void;
};

/**
 * 현재 위치로 미션 완료를 요청함. 도착 여부는 서버가 판정하고,
 * 아직 멀면(400) 조용히 넘어가서 다음 위치에서 다시 요청함
 */
export function useAutoCompleteMission({
  groupId,
  missionId,
  position,
  enabled,
  onComplete,
  onError,
}: AutoCompleteMissionOptions) {
  const { mutate, isPending } = useCompleteMission(groupId);
  const lastAttemptRef = useRef<(CompletionAttempt & { missionId: number }) | null>(null);

  useEffect(() => {
    if (!enabled || missionId === null || position === null || isPending) return;
    const now = Date.now();
    const lastAttempt =
      lastAttemptRef.current?.missionId === missionId ? lastAttemptRef.current : null;
    if (!shouldAttemptCompletion(lastAttempt, position, now)) return;

    lastAttemptRef.current = { missionId, position, attemptedAt: now };
    mutate(
      { missionId, position },
      {
        onSuccess: onComplete,
        onError: (error) => {
          if (!isApiError(error, 400)) onError(error);
        },
      },
    );
  }, [enabled, missionId, position, isPending, mutate, onComplete, onError]);
}
