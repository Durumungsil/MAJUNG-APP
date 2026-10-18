"use client";

import { useState } from "react";
import { getMockMissionLocation, useJourneyStore } from "@/entities/journey";
import {
  formatRemainingHintTime,
  HintExpiredModal,
  HintIntroModal,
  MOCK_HINT_VIEW_LIMIT_SECONDS,
  useHintCountdown,
} from "@/features/view-place-hint";
import { useCurrentPosition } from "@/shared/lib/use-current-position";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import { Spinner } from "@/shared/ui";
import KakaoRoadview, { type KakaoRoadviewStatus } from "@/shared/ui/kakao-roadview";

export default function AdventureHintView() {
  const { position } = useCurrentPosition();
  const currentIndex = useJourneyStore((state) => state.currentIndex);

  // TODO: API 연동 시 힌트 API 응답(위도·경도, 최대 시청 시간)으로 교체.
  const [hintLocation, setHintLocation] = useState<LatLngLiteral | null>(null);
  const [roadviewStatus, setRoadviewStatus] = useState<KakaoRoadviewStatus>("loading");
  const hintLimitSeconds = MOCK_HINT_VIEW_LIMIT_SECONDS;
  const { remainingSeconds, isStarted, isExpired, start } = useHintCountdown(hintLimitSeconds);

  function handleHintStartClick() {
    setHintLocation(getMockMissionLocation(currentIndex, position));
    start();
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 flex-col items-center px-page pt-[max(--spacing(16),calc(--spacing(5)+var(--safe-top)))] pb-4">
        <h1 className="text-point text-primary-400">ADVENTURE MODE</h1>
        <p className="text-s text-text-primary">{formatRemainingHintTime(remainingSeconds)}</p>
      </header>

      <section className="mb-[max(--spacing(19),calc(--spacing(10.5)+var(--safe-bottom)))] relative min-h-0 flex-1 bg-natural-500">
        {isStarted && !isExpired && (
          <>
            <KakaoRoadview
              position={hintLocation}
              onStatusChange={setRoadviewStatus}
              className="absolute inset-0"
            />
            {roadviewStatus === "loading" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Spinner />
                <p className="text-l text-white">힌트 장소를 불러오는 중이에요</p>
              </div>
            )}
            {roadviewStatus === "empty" && (
              <p className="absolute inset-0 flex items-center justify-center text-l text-white">
                로드뷰 사진이 없는 장소예요
              </p>
            )}
          </>
        )}
      </section>

      <HintIntroModal
        open={!isStarted}
        limitSeconds={hintLimitSeconds}
        cancelHref="/adventure"
        onStartClick={handleHintStartClick}
      />
      <HintExpiredModal open={isExpired} backHref="/adventure" />
    </main>
  );
}
