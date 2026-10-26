"use client";

import { useState } from "react";
import { useGroupByParam, type Group } from "@/entities/group";
import { getTripDates, parseItineraryId, useItinerary, withItineraryId } from "@/entities/journey";
import { TimelineEditor } from "@/features/reorder-timeline";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Skeleton, TextLink } from "@/shared/ui";
import { StoryLayout, TimelineMissing } from "@/widgets/story-layout";

const SKELETON_CARD_COUNT = 4;

type StoryTimelinePageProps = {
  groupId: string;
  itineraryId: string | string[] | undefined;
};

export default function StoryTimelinePage({ groupId, itineraryId }: StoryTimelinePageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <StoryTimelineSkeleton />;
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return <StoryTimelineContent group={group} itineraryId={parseItineraryId(itineraryId)} />;
}

function StoryTimelineContent({
  group,
  itineraryId,
}: {
  group: Group;
  itineraryId: number | null;
}) {
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

  if (!isMissing && isPending) return <StoryTimelineSkeleton />;

  return (
    <StoryLayout
      startDate={group.startDate ?? ""}
      endDate={group.endDate ?? ""}
      action={
        <TextLink href={withItineraryId(`/groups/${group.id}/story/map`, itineraryId)}>
          지도로 보기
        </TextLink>
      }
      guide="장소를 꾹 눌러서 순서를 변경할 수 있어요"
      selectedDayIndex={selectedDayIndex}
      onSelectedDayIndexChange={setSelectedDayIndex}
    >
      {isMissing ? (
        <TimelineMissing groupId={group.id} />
      ) : isError || !itinerary ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <TimelineEditor
          initialDays={itinerary.days}
          date={dates[selectedDayIndex]}
          confirmHref={withItineraryId(`/groups/${group.id}/story/timeline/confirmed`, itineraryId)}
        />
      )}
    </StoryLayout>
  );
}

function StoryTimelineSkeleton() {
  return (
    <Screen>
      <div className="mt-5 flex flex-col gap-5">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-15" />
        ))}
      </div>
    </Screen>
  );
}
