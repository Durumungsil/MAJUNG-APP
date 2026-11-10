"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGroupRole, useGroupByParam, type Group } from "@/entities/group";
import { getTripDates, withItineraryId, type Itinerary } from "@/entities/journey";
import { PlaceCategoryTabs, useRecommendedPlaces, type PlaceCategory } from "@/entities/place";
import { useSessionStore } from "@/entities/session";
import { useGenerateTimeline } from "@/features/generate-timeline";
import {
  PlaceSelectList,
  useSaveDestinationSelection,
  type SelectionDay,
} from "@/features/select-place";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import {
  StoryLayout,
  useConfirmedTimelineRedirect,
  useStoryConflictRedirect,
} from "@/widgets/story-layout";
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

  return <StoryPlacesContent group={group} onGroupRefetch={handleRetry} />;
}

type StoryPlacesContentProps = {
  group: Group;
  /** 409를 받으면 여행 상태(확정 여부)를 다시 받음 */
  onGroupRefetch: () => void;
};

function StoryPlacesContent({ group, onGroupRefetch }: StoryPlacesContentProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [category, setCategory] = useState<PlaceCategory | null>(null);
  const dates = getTripDates(group.startDate ?? "", group.endDate ?? "");
  const {
    data: places,
    error,
    isPending,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    loadMore,
  } = useRecommendedPlaces(group.id, category);
  const { isConflict, toastMessage } = useStoryConflictRedirect(error, group.id);
  const { isConfirmed, toastMessage: confirmedToastMessage } = useConfirmedTimelineRedirect({
    group,
    itineraryId: null,
  });
  const router = useRouter();
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  const isLeader = getGroupRole(group, userId) === "leader";
  const { mutate: saveSelection, isPending: isSaving } = useSaveDestinationSelection(group.id);
  const { mutate: generateTimeline, isPending: isGenerating } = useGenerateTimeline(group.id);
  const { toastMessage: generateToastMessage, showToast } = useToast();

  function handleRetry() {
    void refetch();
  }

  function handleLoadMore() {
    void loadMore();
  }

  // 일차별 선택을 방문일과 함께 저장한 뒤, 저장한 선택으로 타임라인을 만듦 (서버가 방문일을 지켜 배치함)
  function handleTimelineSubmit(days: SelectionDay[]) {
    saveSelection(days, {
      onSuccess: () =>
        generateTimeline(undefined, {
          onSuccess: handleGenerateSuccess,
          onError: handleGenerateError,
        }),
      onError: (saveError) => {
        if (isApiError(saveError, 403)) showToast(ERROR_MESSAGES.leaderOnly);
        else if (isApiError(saveError, 409)) {
          // 다른 기기에서 먼저 확정했으면 그룹 상태를 다시 받아 확정 화면으로 보냄
          showToast(ERROR_MESSAGES.storyUnavailable);
          onGroupRefetch();
        } else showToast(ERROR_MESSAGES.requestFailed);
      },
    });
  }

  function handleGenerateSuccess(itinerary: Itinerary) {
    router.push(withItineraryId(`/groups/${group.id}/story/timeline`, itinerary.id));
  }

  function handleGenerateError(generateError: Error) {
    // 추천 목록을 받은 뒤라 스토리모드·여행 상태는 확인된 상태. 409는 영업·이동 시간 충돌로 봄
    if (isApiError(generateError, 409)) showToast(ERROR_MESSAGES.timelineConflict);
    else if (isApiError(generateError, 403)) showToast(ERROR_MESSAGES.leaderOnly);
    else showToast(ERROR_MESSAGES.requestFailed);
  }

  // 탭을 바꿀 때마다 화면 전체를 다시 그리지 않도록, 전체 스켈레톤은 처음 들어왔을 때(전체 탭)만 보여줌
  if ((isPending && category === null) || isConflict || isConfirmed) {
    const redirectToastMessage = confirmedToastMessage ?? toastMessage;
    return (
      <>
        <StoryPlacesSkeleton />
        <Toast open={redirectToastMessage !== null} message={redirectToastMessage ?? ""} />
      </>
    );
  }

  return (
    <StoryLayout
      startDate={group.startDate ?? ""}
      endDate={group.endDate ?? ""}
      guide={GUIDE}
      selectedDayIndex={selectedDayIndex}
      onSelectedDayIndexChange={setSelectedDayIndex}
      fillHeight
    >
      <div className="mb-5 shrink-0">
        <PlaceCategoryTabs selected={category} onSelect={setCategory} />
      </div>
      <PlaceSelectList
        places={places ?? []}
        fallback={
          isPending ? (
            <PlaceListSkeleton />
          ) : isError && places === undefined ? (
            <ErrorState onRetry={handleRetry} />
          ) : places.length === 0 ? (
            <p className="mt-24 text-center text-l text-text-primary">추천할 장소가 없어요</p>
          ) : undefined
        }
        date={dates[selectedDayIndex]}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoadMoreError={isFetchNextPageError}
        onLoadMore={handleLoadMore}
        canSubmit={isLeader}
        isSubmitting={isSaving || isGenerating}
        onSubmit={handleTimelineSubmit}
      />
      <Toast open={generateToastMessage !== null} message={generateToastMessage ?? ""} />
    </StoryLayout>
  );
}

function StoryPlacesSkeleton() {
  return (
    <Screen>
      <div className="mt-5 flex flex-col gap-5">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
        <PlaceListSkeleton />
      </div>
    </Screen>
  );
}

function PlaceListSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <Skeleton key={index} className="h-12" />
      ))}
    </div>
  );
}
