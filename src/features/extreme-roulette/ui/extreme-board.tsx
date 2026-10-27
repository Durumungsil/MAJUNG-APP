"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ROULETTE_KINDS } from "../config/roulette-kinds";
import { useExtremeStore } from "../model/extreme-store";
import type { RouletteKind } from "../model/types";
import ExtremeSelectionCard from "./extreme-selection-card";

type ExtremeBoardProps = {
  getRouletteHref: (kind: RouletteKind) => string;
  /** 종료 후 이동할 경로 */
  exitHref: string;
};

/** 익스트림 메인: 장소·음식점 카드와 종료 버튼 */
export default function ExtremeBoard({ getRouletteHref, exitHref }: ExtremeBoardProps) {
  const router = useRouter();
  const selections = useExtremeStore((state) => state.selections);
  const reset = useExtremeStore((state) => state.reset);

  // TODO: 익스트림 모드 종료 API 연동
  function handleExitClick() {
    reset();
    router.push(exitHref);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-10.5">
        {ROULETTE_KINDS.map((kind) => (
          <ExtremeSelectionCard
            key={kind}
            kind={kind}
            place={selections[kind]}
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
