"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGroupRole, useGroupByParam, type Group } from "@/entities/group";
import {
  TimelineStopCard,
  getDayStops,
  getTripDates,
  parseItineraryId,
  useItinerary,
  withItineraryId,
  type ItineraryDay,
} from "@/entities/journey";
import { useSessionStore } from "@/entities/session";
import { TimelineEditor } from "@/features/reorder-timeline";
import { useSaveDestinationSelection } from "@/features/select-place";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { ErrorState, Screen, Skeleton, TextLink, Toast } from "@/shared/ui";
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
  const router = useRouter();
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  // 순서 변경·확정은 대표자만 함. 멤버에게는 읽기 전용 목록을 보여줌
  const isLeader = getGroupRole(group, userId) === "leader";
  const { mutate: saveSelection, isPending: isSaving } = useSaveDestinationSelection(group.id);
  const { toastMessage, showToast } = useToast();

  function handleRetry() {
    void refetch();
  }

  // TODO: 바꾼 순서를 타임라인에도 반영하는 방법(PATCH 동작)이 백엔드에서 확정되면 함께 저장
  function handleTimelineConfirm(days: ItineraryDay[]) {
    saveSelection(days, {
      onSuccess: () =>
        router.push(withItineraryId(`/groups/${group.id}/story/timeline/confirmed`, itineraryId)),
      onError: (saveError) => {
        if (isApiError(saveError, 403)) showToast(ERROR_MESSAGES.leaderOnly);
        else if (isApiError(saveError, 409)) showToast(ERROR_MESSAGES.storyUnavailable);
        else showToast(ERROR_MESSAGES.requestFailed);
      },
    });
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
      guide={isLeader ? "장소를 꾹 눌러서 순서를 변경할 수 있어요" : undefined}
      selectedDayIndex={selectedDayIndex}
      onSelectedDayIndexChange={setSelectedDayIndex}
    >
      {isMissing ? (
        <TimelineMissing groupId={group.id} />
      ) : isError || !itinerary ? (
        <ErrorState onRetry={handleRetry} />
      ) : !isLeader ? (
        <ol aria-label="타임라인" className="flex flex-col gap-5">
          {getDayStops(itinerary, dates[selectedDayIndex]).map((stop) => (
            <li key={stop.id}>
              <TimelineStopCard stop={stop} />
            </li>
          ))}
        </ol>
      ) : (
        <TimelineEditor
          initialDays={itinerary.days}
          date={dates[selectedDayIndex]}
          isConfirming={isSaving}
          onConfirm={handleTimelineConfirm}
        />
      )}
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
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
