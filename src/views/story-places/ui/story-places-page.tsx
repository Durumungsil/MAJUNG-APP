"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGroupRole, useGroupByParam, type Group } from "@/entities/group";
import { getTripDates, withItineraryId, type Itinerary } from "@/entities/journey";
import { useRecommendedPlaces } from "@/entities/place";
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
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const dates = getTripDates(group.startDate ?? "", group.endDate ?? "");
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
    void fetchNextPage();
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
        else if (isApiError(saveError, 409)) showToast(ERROR_MESSAGES.storyUnavailable);
        else showToast(ERROR_MESSAGES.requestFailed);
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

  if (isPending || isConflict) {
    return (
      <>
        <StoryPlacesSkeleton />
        <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
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
      {isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : places.length === 0 ? (
        <p className="mt-24 text-center text-l text-text-primary">추천할 장소가 없어요</p>
      ) : (
        <PlaceSelectList
          places={places}
          date={dates[selectedDayIndex]}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={handleLoadMore}
          canSubmit={isLeader}
          isSubmitting={isSaving || isGenerating}
          onSubmit={handleTimelineSubmit}
        />
      )}
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
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-24" />
        ))}
      </div>
    </Screen>
  );
}
