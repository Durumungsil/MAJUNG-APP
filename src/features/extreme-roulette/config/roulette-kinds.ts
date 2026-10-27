import type { RouletteType } from "../api/dto";
import type { RouletteKind } from "../model/types";

type RouletteKindCopy = {
  /** 룰렛 화면 제목 */
  title: string;
  description: string;
  /** 룰렛 화면 하단 버튼 */
  spinLabel: string;
  /** 익스트림 메인 카드 버튼 */
  cardSpinLabel: string;
  /** 익스트림 메인 카드에서 아직 고르지 않았을 때 */
  emptyLabel: string;
};

/** Figma 문구 (장소 룰렛 / 음식 룰렛 / 익스트림 모드 시작) */
export const ROULETTE_KIND_COPY: Record<RouletteKind, RouletteKindCopy> = {
  place: {
    title: "장소 룰렛",
    description: "최소 조건만 참고하여 랜덤으로 여행을 제시해요",
    spinLabel: "랜덤 장소 보기",
    cardSpinLabel: "장소 룰렛 돌리기",
    emptyLabel: "장소를 선택해요!",
  },
  food: {
    title: "음식점 룰렛",
    description: "최소 조건만 참고하여 랜덤으로 음식점을 제시해요",
    spinLabel: "랜덤 음식점 보기",
    cardSpinLabel: "음식 룰렛 돌리기",
    emptyLabel: "음식점을 선택해요!",
  },
};

export const ROULETTE_KINDS: RouletteKind[] = ["place", "food"];

/** 룰렛 종류별 추첨 API 경로 (/api/v2/groups/{groupId}/roulette/ 뒤) */
export const ROULETTE_DRAW_PATH: Record<RouletteKind, string> = {
  place: "destinations",
  food: "restaurants",
};

/** 백엔드 룰렛 종류 → 화면 룰렛 종류 */
export const ROULETTE_KIND_BY_TYPE: Record<RouletteType, RouletteKind> = {
  DESTINATION: "place",
  RESTAURANT: "food",
};
