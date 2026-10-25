"use client";

import { useGroupByParam } from "@/entities/group";
import { getTimelineStops } from "@/entities/journey";
import { TimelineEditor } from "@/features/reorder-timeline";
import { ErrorState, Screen, Skeleton, TextLink } from "@/shared/ui";
import { StoryLayout } from "@/widgets/story-layout";

type StoryTimelinePageProps = {
  groupId: string;
};

export default function StoryTimelinePage({ groupId }: StoryTimelinePageProps) {
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
      guide="장소를 꾹 눌러서 순서를 변경할 수 있어요"
    >
      <TimelineEditor
        initialStops={stops}
        confirmHref={`/groups/${group.id}/story/timeline/confirmed`}
      />
    </StoryLayout>
  );
}
