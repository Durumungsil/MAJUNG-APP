import type { TravelMode } from "../model/types";

export const TRAVEL_MODES: TravelMode[] = [
  {
    id: "extreme",
    name: "EXTREME",
    description:
      "익스트림 모드는 룰렛으로 장소와 음식을 정해요. 두근거리는 룰렛 게임을 즐겨보아요.",
  },
  {
    id: "story",
    name: "STORY",
    description: "스토리 모드는 AI가 여행 계획을 확정해주는 모드예요!",
  },
  {
    id: "adventure",
    name: "ADVENTURE",
    description: "모험 모드는 숨겨진 장소를 힌트로 찾아가는 게임 모드예요!",
  },
];

export const DEFAULT_MODE_INDEX = 1;
