"use client";

import { Button, GoogleMapsAttribution } from "@/shared/ui";
import { useConfirmedRoulettes } from "../api/queries";
import { CONFIRMED_ROULETTE_POLLING_MS } from "../config/polling";
import { ROULETTE_KINDS } from "../config/roulette-kinds";
import type { RouletteKind } from "../model/types";
import ExtremeSelectionCard from "./extreme-selection-card";

type ExtremeBoardProps = {
  groupId: number;
  /** 룰렛은 대표자만 돌림. false면 카드의 룰렛 버튼을 숨김 */
  canSpin: boolean;
  getRouletteHref: (kind: RouletteKind) => string;
  /** 종료하기를 누르면 부름. 종료에 성공하면 true */
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
  // 확정은 대표자만 하므로, 멤버 화면만 대표자의 확정을 따라가도록 다시 조회함
  const { data: confirmed } = useConfirmedRoulettes(
    groupId,
    canSpin ? undefined : CONFIRMED_ROULETTE_POLLING_MS,
  );

  function handleExitClick() {
    void onExit();
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-10.5">
        {ROULETTE_KINDS.map((kind) => (
          // 받는 중이거나 못 받으면 확정 전처럼 보임
          <ExtremeSelectionCard
            key={kind}
            kind={kind}
            place={confirmed?.[kind]?.place ?? null}
            rouletteHref={canSpin ? getRouletteHref(kind) : null}
          />
        ))}
      </div>
      {/* 카드의 장소 이름은 Google Places 데이터라 출처를 붙임 */}
      <GoogleMapsAttribution className="mt-3 self-end" />
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
