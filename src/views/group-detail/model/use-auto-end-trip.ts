"use client";

import { useEffect, useRef } from "react";
import type { Group } from "@/entities/group";
import { useEndMode } from "@/features/end-mode";
import { getTodayInSeoul } from "@/shared/lib";
import { shouldAutoEndTrip } from "../lib/trip-period";

/**
 * 대표자가 그룹 상세에 들어왔을 때 종료일이 지난 여행이면 모드 종료를 요청함.
 * 끝나면 그룹 상세를 다시 받아 "새 여행 시작하기"로 바뀜. 여행 회차마다 한 번만 요청하고, 실패해도 알리지 않음
 */
export function useAutoEndTrip(group: Group, isLeader: boolean) {
  const { mutate } = useEndMode(group.id);
  const requestedTripIdRef = useRef<number | null>(null);
  const shouldEnd = shouldAutoEndTrip({ group, isLeader, today: getTodayInSeoul() });
  const tripId = group.tripId;

  useEffect(() => {
    if (!shouldEnd || tripId === null || requestedTripIdRef.current === tripId) return;
    requestedTripIdRef.current = tripId;
    mutate();
  }, [shouldEnd, tripId, mutate]);
}
