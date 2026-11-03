import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { RouletteKind } from "./types";

/** 종류별로 확정한 룰렛 결과 ID. 장소 정보는 룰렛 결과 조회로 다시 받음 (서버가 단일 출처) */
export type ExtremeSelections = Record<RouletteKind, number | null>;

interface ExtremeState {
  /** 그룹 ID별 확정 결과. 다른 그룹에 들어가면 그 그룹의 확정만 보이게 그룹마다 따로 둠 */
  selectionsByGroup: Record<number, ExtremeSelections>;
  confirm: (groupId: number, kind: RouletteKind, rouletteId: number) => void;
  reset: (groupId: number) => void;
}

export const EMPTY_SELECTIONS: ExtremeSelections = { place: null, food: null };

// 확정 API가 없어 대표자가 새로고침해도 확정이 남도록 탭 단위(sessionStorage)로 룰렛 결과 ID만 저장함.
// 알레르기 같은 민감 정보는 저장하지 않음
// TODO: 백엔드에 룰렛 확정 API가 생기면 이 저장소를 없애고 서버(TanStack Query)를 단일 출처로 바꿀 것
export const useExtremeStore = create<ExtremeState>()(
  persist(
    (set) => ({
      selectionsByGroup: {},

      confirm: (groupId, kind, rouletteId) =>
        set((state) => ({
          selectionsByGroup: {
            ...state.selectionsByGroup,
            [groupId]: {
              ...(state.selectionsByGroup[groupId] ?? EMPTY_SELECTIONS),
              [kind]: rouletteId,
            },
          },
        })),

      reset: (groupId) =>
        set((state) => {
          const rest = { ...state.selectionsByGroup };
          delete rest[groupId];
          return { selectionsByGroup: rest };
        }),
    }),
    {
      name: "majung-extreme-selections",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
