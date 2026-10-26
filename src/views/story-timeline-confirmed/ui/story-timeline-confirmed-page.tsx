"use client";

import { useState } from "react";
import { useGroupByParam, type Group } from "@/entities/group";
import {
  TimelineStopCard,
  getDayStops,
  getTripDates,
  parseItineraryId,
  useItinerary,
  withItineraryId,
} from "@/entities/journey";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Skeleton, TextLink } from "@/shared/ui";
import { StoryLayout, TimelineMissing } from "@/widgets/story-layout";

const SKELETON_CARD_COUNT = 4;

type StoryTimelineConfirmedPageProps = {
  groupId: string;
  itineraryId: string | string[] | undefined;
};

export default function StoryTimelineConfirmedPage({
  groupId,
  itineraryId,
}: StoryTimelineConfirmedPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <ConfirmedSkeleton />;
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return <ConfirmedContent group={group} itineraryId={parseItineraryId(itineraryId)} />;
}

function ConfirmedContent({ group, itineraryId }: { group: Group; itineraryId: number | null }) {
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

  if (!isMissing && isPending) return <ConfirmedSkeleton />;

  return (
    <StoryLayout
      startDate={group.startDate ?? ""}
      endDate={group.endDate ?? ""}
      action={
        <TextLink href={withItineraryId(`/groups/${group.id}/story/map`, itineraryId)}>
          지도로 보기
        </TextLink>
      }
      selectedDayIndex={selectedDayIndex}
      onSelectedDayIndexChange={setSelectedDayIndex}
    >
      {isMissing ? (
        <TimelineMissing groupId={group.id} />
      ) : isError || !itinerary ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <>
          <ol aria-label="확정된 타임라인" className="flex flex-col gap-5">
            {getDayStops(itinerary, dates[selectedDayIndex]).map((stop) => (
              <li key={stop.id}>
                <TimelineStopCard stop={stop} />
              </li>
            ))}
          </ol>
          {/* TODO: 스토리모드 종료 API가 생기면 종료 요청 후 이동 */}
          <TextLink
            href={`/groups/${group.id}`}
            className="mt-6 self-center text-l text-text-muted no-underline"
          >
            스토리 모드 종료하기
          </TextLink>
        </>
      )}
    </StoryLayout>
  );
}

function ConfirmedSkeleton() {
  return (
    <Screen>
      <div className="mt-5 flex flex-col gap-5">
        <Skeleton className="h-8 w-1/2" />
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-15" />
        ))}
      </div>
    </Screen>
  );
}
