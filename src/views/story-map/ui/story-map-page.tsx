"use client";

import { useState } from "react";
import { useGroupByParam, type Group } from "@/entities/group";
import {
  ScheduleHeader,
  getDayStops,
  getTripDates,
  parseItineraryId,
  useItinerary,
  withItineraryId,
} from "@/entities/journey";
import { MapExplorer } from "@/features/explore-map";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Skeleton, TextLink } from "@/shared/ui";
import { TimelineMissing } from "@/widgets/story-layout";

type StoryMapPageProps = {
  groupId: string;
  itineraryId: string | string[] | undefined;
};

export default function StoryMapPage({ groupId, itineraryId }: StoryMapPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <StoryMapSkeleton />;
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return <StoryMapContent group={group} itineraryId={parseItineraryId(itineraryId)} />;
}

function StoryMapContent({ group, itineraryId }: { group: Group; itineraryId: number | null }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const {
    data: itinerary,
    error,
    isPending,
    isError,
    refetch,
  } = useItinerary(group.id, itineraryId);
  const dates = getTripDates(group.startDate ?? "", group.endDate ?? "");
  const isMissing = itineraryId === null || isApiError(error, 404);

  function handleRetry() {
    void refetch();
  }

  if (!isMissing && isPending) return <StoryMapSkeleton />;

  return (
    <main className="flex flex-1 flex-col pb-[calc(var(--safe-bottom)+--spacing(11))]">
      {isMissing ? (
        <div className="px-page">
          <TimelineMissing groupId={group.id} canSelectPlaces={group.status !== "IN_PROGRESS"} />
        </div>
      ) : isError || !itinerary ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <>
          <MapExplorer
            // 날짜를 바꾸면 고른 장소·주변 추천을 새로 시작함
            key={dates[selectedDayIndex]}
            groupId={group.id}
            stops={getDayStops(itinerary, dates[selectedDayIndex])}
          />
          <div className="mt-8 flex flex-col gap-5 px-page">
            <ScheduleHeader
              startDate={group.startDate ?? ""}
              endDate={group.endDate ?? ""}
              selectedIndex={selectedDayIndex}
              onSelectedIndexChange={setSelectedDayIndex}
              action={
                <TextLink href={withItineraryId(`/groups/${group.id}/story/timeline`, itineraryId)}>
                  타임라인 보기
                </TextLink>
              }
            />
            <p className="text-s text-text-primary">
              장소를 선택하면 그 주변의 또 다른 장소들을 추천해요
            </p>
          </div>
        </>
      )}
    </main>
  );
}

function StoryMapSkeleton() {
  return (
    <main className="flex flex-1 flex-col">
      <Skeleton className="aspect-[402/674] w-full rounded-none" />
      <div className="mt-8 flex flex-col gap-5 px-page">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    </main>
  );
}
