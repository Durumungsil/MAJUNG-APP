import { MOCK_JOURNEY_STOPS } from "../config/mock-journey";
import type { JourneyStop } from "../model/types";

// TODO: Supabase 연동 시 실제 요청 + TanStack Query 훅으로 교체
export function getJourneyStops(groupId: string): JourneyStop[] {
  void groupId;
  return MOCK_JOURNEY_STOPS;
}
