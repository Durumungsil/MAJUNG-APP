"use client";

import { useGroupByParam, type Group } from "@/entities/group";
import { useRecommendedPlaces } from "@/entities/place";
import { PlaceSelectList } from "@/features/select-place";
import { StoryLayout, useStoryConflictRedirect } from "@/widgets/story-layout";
import { ErrorState, Screen, Skeleton, Toast } from "@/shared/ui";

const GUIDE = "원하는 장소를 선택해 타임라인을 생성하세요";
const SKELETON_CARD_COUNT = 4;

type StoryPlacesPageProps = {
  groupId: string;
};

export default function StoryPlacesPage({ groupId }: StoryPlacesPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <StoryPlacesSkeleton />;
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return <StoryPlacesContent group={group} />;
}

function StoryPlacesContent({ group }: { group: Group }) {
  const {
    data: places,
    error,
    isPending,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useRecommendedPlaces(group.id);
  const { isConflict, toastMessage } = useStoryConflictRedirect(error, group.id);

  function handleRetry() {
    void refetch();
  }

  function handleLoadMore() {
    void fetchNextPage();
  }

  if (isPending || isConflict) {
    return (
      <>
        <StoryPlacesSkeleton />
        <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
      </>
    );
  }

  return (
    <StoryLayout startDate={group.startDate ?? ""} endDate={group.endDate ?? ""} guide={GUIDE}>
      {isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : places.length === 0 ? (
        <p className="mt-24 text-center text-l text-text-primary">추천할 장소가 없어요</p>
      ) : (
        <PlaceSelectList
          places={places}
          nextHref={`/groups/${group.id}/story/timeline`}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={handleLoadMore}
        />
      )}
    </StoryLayout>
  );
}

function StoryPlacesSkeleton() {
  return (
    <Screen>
      <div className="mt-5 flex flex-col gap-5">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-24" />
        ))}
      </div>
    </Screen>
  );
}
