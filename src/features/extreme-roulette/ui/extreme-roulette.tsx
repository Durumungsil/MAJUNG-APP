"use client";

import type { Place } from "@/entities/place";
import { Button } from "@/shared/ui";
import { ROULETTE_KIND_COPY } from "../config/roulette-kinds";
import { getRouletteCandidates } from "../lib/candidates";
import type { RouletteKind } from "../model/types";
import { useRouletteSpin } from "../model/use-roulette-spin";
import RouletteResultModal from "./roulette-result-modal";
import RouletteWheel from "./roulette-wheel";

type ExtremeRouletteProps = {
  kind: RouletteKind;
  /** 결과 장소의 상세 화면 경로 */
  getDetailHref: (place: Place) => string;
};

/** 장소/음식점 룰렛. 돌리고 나면 결과 모달에서 상세 확인 또는 다시 돌리기 */
export default function ExtremeRoulette({ kind, getDetailHref }: ExtremeRouletteProps) {
  const copy = ROULETTE_KIND_COPY[kind];
  const { rotation, spinning, result, spin, clearResult } = useRouletteSpin(
    getRouletteCandidates(kind),
  );

  function handleSpinClick() {
    spin();
  }

  return (
    <div className="flex flex-col items-center gap-25">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-1 text-center text-text-primary">
          <h1 className="text-xl">{copy.title}</h1>
          <p className="text-s">{copy.description}</p>
        </div>
        <RouletteWheel rotation={rotation} spinning={spinning} onStartClick={handleSpinClick} />
      </div>
      <Button size="xl-compact" onClick={handleSpinClick} disabled={spinning} aria-busy={spinning}>
        {copy.spinLabel}
      </Button>
      <RouletteResultModal
        place={result}
        detailHref={result ? getDetailHref(result) : ""}
        onClose={clearResult}
        onRespinClick={handleSpinClick}
      />
    </div>
  );
}
