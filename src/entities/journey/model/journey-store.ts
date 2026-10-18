import { create } from "zustand";
import { MOCK_JOURNEY_STOPS } from "../config/mock-journey-stops";
import { completeStopAt, startStopAt } from "../lib/journey-stop";
import type { JourneyStop, MissionPhase } from "./journey-stop";

interface JourneyState {
  stops: JourneyStop[];
  currentIndex: number;
  phase: MissionPhase;
  completeCurrentMission: (endedAt: Date) => void;
  exploreAround: () => void;
  startNextMission: (startedAt: Date) => void;
}

// 브라우저 메모리에만 둠 (새로고침 시 초기화). TODO: API 연동 시 서버 데이터로 대체
export const useJourneyStore = create<JourneyState>()((set) => ({
  // TODO: 첫 미션 시작 시각은 모험 시작 시점으로 교체. 지금은 화면을 처음 연 시각
  stops: startStopAt(MOCK_JOURNEY_STOPS, 0, new Date()),
  currentIndex: 0,
  phase: "searching",

  completeCurrentMission: (endedAt) =>
    set((state) =>
      state.phase === "searching"
        ? { stops: completeStopAt(state.stops, state.currentIndex, endedAt), phase: "succeeded" }
        : state,
    ),

  exploreAround: () =>
    set((state) => (state.phase === "succeeded" ? { phase: "exploring" } : state)),

  startNextMission: (startedAt) =>
    set((state) => {
      const nextIndex = state.currentIndex + 1;
      // TODO: 마지막 미션 이후 흐름은 Figma 확정 후 구현
      if (state.phase === "searching" || nextIndex >= state.stops.length) return state;
      return {
        stops: startStopAt(state.stops, nextIndex, startedAt),
        currentIndex: nextIndex,
        phase: "searching",
      };
    }),
}));
