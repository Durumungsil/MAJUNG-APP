import type { Place } from "@/entities/place";

/** 익스트림 모드 룰렛 종류: 장소 / 음식점 */
export type RouletteKind = "place" | "food";

/** 룰렛 추첨 결과 */
export type RouletteResult = {
  id: number;
  kind: RouletteKind;
  place: Place;
};

/** 종류별로 확정한 룰렛 결과. 아직 확정하지 않았으면 null */
export type ConfirmedRoulettes = Record<RouletteKind, RouletteResult | null>;
