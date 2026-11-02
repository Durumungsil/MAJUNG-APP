"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { useRouletteResult } from "../api/queries";
import { ROULETTE_KINDS } from "../config/roulette-kinds";
import { EMPTY_SELECTIONS, useExtremeStore } from "../model/extreme-store";
import type { RouletteKind } from "../model/types";
import ExtremeSelectionCard from "./extreme-selection-card";

type ExtremeBoardProps = {
  groupId: number;
  getRouletteHref: (kind: RouletteKind) => string;
  /** 종료 후 이동할 경로 */
  exitHref: string;
};

/** 익스트림 메인: 장소·음식점 카드와 종료 버튼 */
export default function ExtremeBoard({ groupId, getRouletteHref, exitHref }: ExtremeBoardProps) {
  const router = useRouter();
  const selections = useExtremeStore(
    (state) => state.selectionsByGroup[groupId] ?? EMPTY_SELECTIONS,
  );
  const reset = useExtremeStore((state) => state.reset);

  // TODO: 익스트림 모드 종료 API 연동
  function handleExitClick() {
    reset(groupId);
    router.push(exitHref);
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
            rouletteHref={getRouletteHref(kind)}
          />
        ))}
      </div>
      <Button size="xl" onClick={handleExitClick} className="mt-auto mb-5">
        익스트림 모드 종료하기
      </Button>
    </div>
  );
}

type ConfirmedSelectionCardProps = {
  groupId: number;
  kind: RouletteKind;
  rouletteId: number | null;
  rouletteHref: string;
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
