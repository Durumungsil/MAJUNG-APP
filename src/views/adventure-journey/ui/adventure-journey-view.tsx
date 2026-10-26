"use client";

import { notFound } from "next/navigation";
import { useAdventureProcess } from "@/entities/adventure";
import { parseGroupId } from "@/entities/group";
import { JourneyStopCard } from "@/entities/journey";
import { Button, ErrorState, Skeleton } from "@/shared/ui";
import { toJourneyStops } from "../lib/to-journey-stops";
import { useTodayProcessId } from "../model/use-today-process-id";

interface AdventureJourneyViewProps {
  groupId: string;
}

const SKELETON_COUNT = 4;

export default function AdventureJourneyView({ groupId: groupIdParam }: AdventureJourneyViewProps) {
  const groupId = parseGroupId(groupIdParam);
  if (groupId === null) notFound();

  const processId = useTodayProcessId(groupId);
  const { data: process, isPending, isError, refetch } = useAdventureProcess(groupId, processId);

  function handleRetry() {
    void refetch();
  }

  function renderContent() {
    if (processId === null) {
      return (
        <p className="flex flex-1 items-center justify-center text-m text-text-muted">
          오늘 확인할 수 있는 여정이 없어요
        </p>
      );
    }
    if (isPending) {
      return (
        <div className="flex flex-col gap-5 px-page">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} className="h-20" />
          ))}
        </div>
      );
    }
    if (isError) return <ErrorState onRetry={handleRetry} />;

    return (
      <ol className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-page">
        {toJourneyStops(process.missions).map((stop) => (
          <JourneyStopCard
            key={stop.id}
            stop={stop}
            isCurrent={stop.id === String(process.currentMissionId)}
          />
        ))}
      </ol>
    );
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 justify-center px-page pt-[max(--spacing(16),calc(--spacing(5)+var(--safe-top)))] pb-8">
        <h1 className="text-point text-primary-400">ADVENTURE MODE</h1>
      </header>

      {renderContent()}

      <nav className="mt-auto flex shrink-0 flex-col px-page pt-20 pb-[max(--spacing(14),calc(--spacing(5.5)+var(--safe-bottom)))]">
        <Button href={`/groups/${groupId}/adventure/map`} size="xl">
          지도로 가기
        </Button>
      </nav>
    </main>
  );
}
