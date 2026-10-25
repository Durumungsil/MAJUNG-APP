"use client";

import { useGroupByParam } from "@/entities/group";
import { getRecommendedPlaces } from "@/entities/place";
import { PlaceSelectList } from "@/features/select-place";
import { StoryLayout } from "@/widgets/story-layout";
import { ErrorState, Screen, Skeleton } from "@/shared/ui";

type StoryPlacesPageProps = {
  groupId: string;
};

export default function StoryPlacesPage({ groupId }: StoryPlacesPageProps) {
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

  const places = getRecommendedPlaces(group.id);

  return (
    <StoryLayout
      startDate={group.startDate ?? ""}
      endDate={group.endDate ?? ""}
      guide="원하는 장소를 선택해 타임라인을 생성하세요"
    >
      <PlaceSelectList places={places} nextHref={`/groups/${group.id}/story/timeline`} />
    </StoryLayout>
  );
}
