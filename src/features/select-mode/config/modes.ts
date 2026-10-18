import type { TravelMode } from "../model/types";

export const TRAVEL_MODES: TravelMode[] = [
  { id: "extreme", name: "EXTREME" },
  {
    id: "story",
    name: "STORY",
    description: "스토리 모드는 AI가 여행 계획을 확정해주는 모드예요!",
  },
  { id: "adventure", name: "ADVENTURE" },
];

export const DEFAULT_MODE_INDEX = 1;
