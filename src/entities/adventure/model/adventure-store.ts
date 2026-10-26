import { create } from "zustand";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

/** 미션 진행 단계: 장소 찾는 중 / 성공 모달 / 주변 둘러보는 중 */
export type MissionPhase = "searching" | "succeeded" | "exploring";

type SucceededMission = {
  order: number;
  /** 마지막 미션이면 false */
  hasNext: boolean;
};

type HintTarget = {
  missionId: number;
  location: LatLngLiteral;
};

interface AdventureState {
  phase: MissionPhase;
  succeededMission: SucceededMission | null;
  /** 마지막으로 본 힌트 장소. 남은 거리 표시에만 씀 */
  hintTarget: HintTarget | null;
  succeed: (mission: SucceededMission) => void;
  exploreAround: () => void;
  searchNext: () => void;
  setHintTarget: (target: HintTarget) => void;
}

// 화면 흐름만 브라우저 메모리에 둠 (새로고침 시 초기화). 미션 데이터는 서버(TanStack Query)가 단일 출처
export const useAdventureStore = create<AdventureState>()((set) => ({
  phase: "searching",
  succeededMission: null,
  hintTarget: null,

  succeed: (mission) => set({ phase: "succeeded", succeededMission: mission }),

  exploreAround: () =>
    set((state) => (state.phase === "succeeded" ? { phase: "exploring" } : state)),

  searchNext: () => set({ phase: "searching", succeededMission: null }),

  setHintTarget: (target) => set({ hintTarget: target }),
}));
