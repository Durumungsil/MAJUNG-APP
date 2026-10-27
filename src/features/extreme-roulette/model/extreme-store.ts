import { create } from "zustand";
import type { Place } from "@/entities/place";
import type { RouletteKind } from "./types";

interface ExtremeState {
  /** 룰렛으로 확정한 장소·음식점 */
  selections: Record<RouletteKind, Place | null>;
  confirm: (kind: RouletteKind, place: Place) => void;
  reset: () => void;
}

const INITIAL_SELECTIONS: Record<RouletteKind, Place | null> = { place: null, food: null };

// 게임 진행 상태만 브라우저 메모리에 둠 (새로고침 시 초기화)
// TODO: 확정 API가 생기면 확정 결과는 서버(TanStack Query)를 단일 출처로 바꿀 것
export const useExtremeStore = create<ExtremeState>()((set) => ({
  selections: INITIAL_SELECTIONS,

  confirm: (kind, place) =>
    set((state) => ({ selections: { ...state.selections, [kind]: place } })),

  reset: () => set({ selections: INITIAL_SELECTIONS }),
}));
