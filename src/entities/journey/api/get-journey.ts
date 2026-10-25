import { MOCK_TIMELINE_STOPS } from "../config/mock-journey";
import type { TimelineStop } from "../model/types";

// TODO: Supabase 연동 시 실제 요청 + TanStack Query 훅으로 교체
export function getTimelineStops(groupId: number): TimelineStop[] {
  void groupId;
  return MOCK_TIMELINE_STOPS;
}
