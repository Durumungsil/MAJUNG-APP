"use client";

import { useGroupByParam } from "@/entities/group";
import { TimelineStopCard, getTimelineStops } from "@/entities/journey";
import { ErrorState, Screen, Skeleton, TextLink } from "@/shared/ui";
import { StoryLayout } from "@/widgets/story-layout";

type StoryTimelineConfirmedPageProps = {
  groupId: string;
};

export default function StoryTimelineConfirmedPage({ groupId }: StoryTimelineConfirmedPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) {
    return (
      <Screen>
        <Skeleton className="mt-5 h-40" />
      </Screen>
    );
  }
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  const stops = getTimelineStops(group.id);

  return (
    <StoryLayout
      startDate={group.startDate ?? ""}
      endDate={group.endDate ?? ""}
      action={<TextLink href={`/groups/${group.id}/story/map`}>지도로 보기</TextLink>}
    >
      <ol aria-label="확정된 타임라인" className="flex flex-col gap-5">
        {stops.map((stop) => (
          <li key={stop.id}>
            <TimelineStopCard stop={stop} />
          </li>
        ))}
      </ol>
    </StoryLayout>
  );
}
