import type { Place } from "@/entities/place";
import { MOCK_ROULETTE_CANDIDATES } from "../config/mock-candidates";
import type { RouletteKind } from "../model/types";

// TODO: 룰렛 API 연동 시 api/ 세그먼트의 쿼리로 교체
export function getRouletteCandidates(kind: RouletteKind): Place[] {
  return MOCK_ROULETTE_CANDIDATES[kind];
}

export function findRouletteCandidate(kind: RouletteKind, placeId: number): Place | null {
  return getRouletteCandidates(kind).find((place) => place.id === placeId) ?? null;
}
