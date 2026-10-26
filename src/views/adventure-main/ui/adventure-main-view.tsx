"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { parseGroupId } from "@/entities/group";
import MapIcon from "@/shared/assets/icons/map-icon";
import PathDistanceIcon from "@/shared/assets/icons/path-distance-icon";
import SearchIcon from "@/shared/assets/icons/search-icon";
import CurrentLocationMarker from "@/shared/assets/markers/current-location-marker";
import { MissionSuccessModal } from "@/features/complete-mission";
import { Button, ErrorState, Screen, Skeleton, Toast } from "@/shared/ui";
import KakaoMap from "@/shared/ui/kakao-map";
import { DEFAULT_MAP_CENTER } from "../config/default-center";
import { useMissionFlow } from "../model/use-mission-flow";

interface AdventureMainViewProps {
  groupId: string;
}

export default function AdventureMainView({ groupId: groupIdParam }: AdventureMainViewProps) {
  const groupId = parseGroupId(groupIdParam);
  if (groupId === null) notFound();

  const {
    position,
    currentMissionQuery,
    mission,
    phase,
    succeededMission,
    remainingDistanceLabel,
    toastMessage,
    exploreAround,
    goToNextPlace,
  } = useMissionFlow(groupId);

  function handleRetry() {
    void currentMissionQuery.refetch();
  }

  function handleMissionModalClose() {
    exploreAround();
  }

  function handleNextPlaceClick() {
    goToNextPlace();
  }

  if (currentMissionQuery.isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <section className="relative min-h-0 flex-1">
        <KakaoMap
          center={position ?? DEFAULT_MAP_CENTER}
          marker={position ? <CurrentLocationMarker /> : undefined}
          className="absolute inset-0"
        />

        {remainingDistanceLabel !== null && (
          <p className="absolute right-4.5 bottom-4 z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-secondary-400 py-1 pr-4 pl-3 text-l text-text-primary">
            <PathDistanceIcon />
            남은 거리: {remainingDistanceLabel}
          </p>
        )}
      </section>

      <nav className="flex shrink-0 flex-col items-center gap-3 px-8 pt-5 pb-[max(--spacing(7.5),var(--safe-bottom))]">
        <div className="flex w-full flex-col gap-4">
          <Button href={`/groups/${groupId}/adventure/journey`} size="xl" icon={<MapIcon />}>
            나의 여정 보기
          </Button>
          {currentMissionQuery.isPending ? (
            <Skeleton className="h-11 w-full" />
          ) : phase === "exploring" ? (
            <Button size="xl" icon={<SearchIcon />} onClick={handleNextPlaceClick}>
              다음 장소 찾기
            </Button>
          ) : mission === null ? (
            <Button size="xl" icon={<SearchIcon />} disabled>
              장소 힌트 보기
            </Button>
          ) : (
            <Button href={`/groups/${groupId}/adventure/hint`} size="xl" icon={<SearchIcon />}>
              장소 힌트 보기
            </Button>
          )}
        </div>
        <Link href={`/groups/${groupId}`} className="text-l text-text-muted">
          모험 모드 종료하기
        </Link>
      </nav>

      <MissionSuccessModal
        open={phase === "succeeded"}
        missionNumber={succeededMission?.order ?? 1}
        onClose={handleMissionModalClose}
        onNextPlaceClick={handleNextPlaceClick}
      />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </main>
  );
}
