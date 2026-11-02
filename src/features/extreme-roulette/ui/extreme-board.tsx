"use client";

import { Button } from "@/shared/ui";
import { useRouletteResult } from "../api/queries";
import { ROULETTE_KINDS } from "../config/roulette-kinds";
import { EMPTY_SELECTIONS, useExtremeStore } from "../model/extreme-store";
import type { RouletteKind } from "../model/types";
import ExtremeSelectionCard from "./extreme-selection-card";

type ExtremeBoardProps = {
  groupId: number;
  /** 룰렛은 대표자만 돌림. false면 카드의 룰렛 버튼을 숨김 */
  canSpin: boolean;
  getRouletteHref: (kind: RouletteKind) => string;
  /** 종료하기를 누르면 부름. 종료에 성공하면 true (이 기기의 확정 기록을 지움) */
  onExit: () => Promise<boolean>;
  /** 종료 요청 중이면 버튼에 진행 상태를 표시함 */
  isExiting: boolean;
};

/** 익스트림 메인: 장소·음식점 카드와 종료 버튼 */
export default function ExtremeBoard({
  groupId,
  canSpin,
  getRouletteHref,
  onExit,
  isExiting,
}: ExtremeBoardProps) {
  const selections = useExtremeStore(
    (state) => state.selectionsByGroup[groupId] ?? EMPTY_SELECTIONS,
  );
  const reset = useExtremeStore((state) => state.reset);

  async function handleExitClick() {
    if (await onExit()) reset(groupId);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-10.5">
        {ROULETTE_KINDS.map((kind) => (
          <ConfirmedSelectionCard
            key={kind}
            groupId={groupId}
            kind={kind}
            rouletteId={selections[kind]}
            rouletteHref={canSpin ? getRouletteHref(kind) : null}
          />
        ))}
      </div>
      <Button
        size="xl"
        onClick={handleExitClick}
        disabled={isExiting}
        aria-busy={isExiting}
        className="mt-auto mb-5"
      >
        익스트림 모드 종료하기
      </Button>
    </div>
  );
}

type ConfirmedSelectionCardProps = {
  groupId: number;
  kind: RouletteKind;
  rouletteId: number | null;
  rouletteHref: string | null;
};

/** 확정한 룰렛 결과 ID로 장소를 다시 받아 카드에 보여줌. 받는 중이거나 못 받으면 확정 전처럼 보임 */
function ConfirmedSelectionCard({
  groupId,
  kind,
  rouletteId,
  rouletteHref,
}: ConfirmedSelectionCardProps) {
  const { data: result } = useRouletteResult(groupId, rouletteId);

  return (
    <ExtremeSelectionCard kind={kind} place={result?.place ?? null} rouletteHref={rouletteHref} />
  );
}
