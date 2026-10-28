"use client";

import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Toast } from "@/shared/ui";
import { useDrawRoulette } from "../api/queries";
import { ROULETTE_KIND_COPY } from "../config/roulette-kinds";
import type { RouletteKind, RouletteResult } from "../model/types";
import { useRouletteSpin } from "../model/use-roulette-spin";
import RouletteResultModal from "./roulette-result-modal";
import RouletteWheel from "./roulette-wheel";

type ExtremeRouletteProps = {
  groupId: number;
  kind: RouletteKind;
  /** 결과 장소의 상세 화면 경로 */
  getDetailHref: (result: RouletteResult) => string;
};

/** 장소/음식점 룰렛. 돌리고 나면 결과 모달에서 상세 확인 또는 다시 돌리기 */
export default function ExtremeRoulette({ groupId, kind, getDetailHref }: ExtremeRouletteProps) {
  const copy = ROULETTE_KIND_COPY[kind];
  const { mutateAsync: draw } = useDrawRoulette(groupId, kind);
  const { toastMessage, showToast } = useToast();

  // 409는 익스트림 모드가 아닐 때도 오지만 상태 코드만으로는 구분할 수 없음.
  // 메인 화면은 그룹 모드로 이미 걸러서 들어오므로 후보 소진으로 안내함
  function handleDrawError(error: unknown) {
    showToast(
      isApiError(error, 409) ? ERROR_MESSAGES.rouletteNoCandidate : ERROR_MESSAGES.requestFailed,
    );
  }

  const { rotation, spinning, result, spin, clearResult } = useRouletteSpin({
    draw,
    onError: handleDrawError,
  });

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
        place={result?.place ?? null}
        detailHref={result ? getDetailHref(result) : ""}
        onClose={clearResult}
        onRespinClick={handleSpinClick}
      />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </div>
  );
}
