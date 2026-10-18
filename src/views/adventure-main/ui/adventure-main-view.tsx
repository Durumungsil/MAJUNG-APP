"use client";

import { useEffect } from "react";
import { getMockMissionLocation, useJourneyStore } from "@/entities/journey";
import MapIcon from "@/shared/assets/icons/map-icon";
import PathDistanceIcon from "@/shared/assets/icons/path-distance-icon";
import SearchIcon from "@/shared/assets/icons/search-icon";
import CurrentLocationMarker from "@/shared/assets/markers/current-location-marker";
import { useCurrentPosition } from "@/shared/lib/use-current-position";
import { isArrived, MissionSuccessModal } from "@/features/complete-mission";
import { Button } from "@/shared/ui";
import KakaoMap from "@/shared/ui/kakao-map";
import { DEFAULT_MAP_CENTER } from "../config/default-center";

interface AdventureMainViewProps {
  /** 남은 거리 문구 (API 연동 전까지 임시값) */
  remainingDistanceLabel?: string;
}

export default function AdventureMainView({
  remainingDistanceLabel = "200m",
}: AdventureMainViewProps) {
  const { position } = useCurrentPosition();
  const currentIndex = useJourneyStore((state) => state.currentIndex);
  const phase = useJourneyStore((state) => state.phase);
  const completeCurrentMission = useJourneyStore((state) => state.completeCurrentMission);
  const exploreAround = useJourneyStore((state) => state.exploreAround);
  const startNextMission = useJourneyStore((state) => state.startNextMission);

  // TODO: 도착 판정은 백엔드가 할 예정. API 연동 시 위치를 서버로 보내고 판정 결과를 받도록 교체
  const missionTarget = getMockMissionLocation(currentIndex, position);
  const hasArrived = isArrived(position, missionTarget);

  useEffect(() => {
    if (phase === "searching" && hasArrived) completeCurrentMission(new Date());
  }, [phase, hasArrived, completeCurrentMission]);

  function handleMissionModalClose() {
    exploreAround();
  }

  function handleNextPlaceClick() {
    startNextMission(new Date());
  }

  const isExploringAround = phase === "exploring";

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <section className="relative min-h-0 flex-1">
        <KakaoMap
          center={position ?? DEFAULT_MAP_CENTER}
          marker={position ? <CurrentLocationMarker /> : undefined}
          className="absolute inset-0"
        />

        <p className="absolute right-4.5 bottom-4 z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-secondary-400 py-1 pr-4 pl-3 text-l text-text-primary">
          <PathDistanceIcon />
          남은 거리: {remainingDistanceLabel}
        </p>
      </section>

      <nav className="flex shrink-0 flex-col gap-4 px-8 pt-6 pb-[max(--spacing(10),calc(--spacing(5.5)+var(--safe-bottom)))]">
        <Button href="/adventure/journey" size="xl" icon={<MapIcon />}>
          나의 여정 보기
        </Button>
        {isExploringAround ? (
          <Button size="xl" icon={<SearchIcon />} onClick={handleNextPlaceClick}>
            다음 장소 찾기
          </Button>
        ) : (
          <Button href="/adventure/hint" size="xl" icon={<SearchIcon />}>
            장소 힌트 보기
          </Button>
        )}
      </nav>

      <MissionSuccessModal
        open={phase === "succeeded"}
        missionNumber={currentIndex + 1}
        onClose={handleMissionModalClose}
        onNextPlaceClick={handleNextPlaceClick}
      />
    </main>
  );
}
