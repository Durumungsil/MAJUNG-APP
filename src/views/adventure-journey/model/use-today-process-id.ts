"use client";

import { useSyncExternalStore } from "react";
import { getTodayInSeoul, loadProcessId } from "@/entities/adventure";

function subscribe() {
  return () => {};
}

/** 오늘 만든 커리큘럼 ID. 서버 렌더링에서는 저장소를 읽을 수 없으므로 null */
export function useTodayProcessId(groupId: number): number | null {
  return useSyncExternalStore(
    subscribe,
    () => loadProcessId(groupId, getTodayInSeoul()),
    () => null,
  );
}
