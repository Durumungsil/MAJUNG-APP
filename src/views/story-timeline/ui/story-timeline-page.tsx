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
import { PlaceName } from "@/entities/place";
import { useSessionStore } from "@/entities/session";
import { useConfirmTimeline } from "@/features/confirm-timeline";
import {
  TimelineEditor,
  planTimelinePatches,
  toDayRange,
  useSaveTimelineTimes,
} from "@/features/reorder-timeline";
import { useSaveDestinationSelection } from "@/features/select-place";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { usePrefetchRoute, useToast } from "@/shared/lib";
import { ErrorState, Screen, TextLink, Toast } from "@/shared/ui";
import { StoryLayout, TimelineMissing, useConfirmedTimelineRedirect } from "@/widgets/story-layout";
import StoryTimelineSkeleton from "./story-timeline-skeleton";

const LEADER_GUIDE = "장소를 꾹 눌러서 순서를 변경할 수 있어요";
const MEMBER_GUIDE = "방장이 확정하면 시작돼요";

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

  return (
    <StoryTimelineContent
      group={group}
      itineraryId={parseItineraryId(itineraryId)}
      onGroupRefetch={handleRetry}
    />
  );
}

type StoryTimelineContentProps = {
  group: Group;
  itineraryId: number | null;
  /** 409를 받으면 여행 상태(확정 여부)를 다시 받음 */
  onGroupRefetch: () => void;
};

function StoryTimelineContent({ group, itineraryId, onGroupRefetch }: StoryTimelineContentProps) {
  // 내가 확정해서 직접 이동하는 중에는 '이미 확정됨' 안내를 띄우지 않음
  const [hasConfirmed, setHasConfirmed] = useState(false);
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
  const confirmedHref = withItineraryId(
    `/groups/${group.id}/story/timeline/confirmed`,
    itineraryId,
  );
  usePrefetchRoute(confirmedHref);
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  // 순서 변경·확정은 대표자만 함. 멤버에게는 읽기 전용 목록을 보여줌
  const isLeader = getGroupRole(group, userId) === "leader";
  const { mutate: saveSelection, isPending: isSaving } = useSaveDestinationSelection(group.id);
  const { mutate: saveTimes, isPending: isSavingTimes } = useSaveTimelineTimes(
    group.id,
    itineraryId ?? 0,
  );
  const { mutate: confirmTimeline, isPending: isConfirmingTimeline } = useConfirmTimeline(
    group.id,
    itineraryId ?? 0,
  );
  const { toastMessage, showToast } = useToast();
  const { isConfirmed, toastMessage: confirmedToastMessage } = useConfirmedTimelineRedirect({
    group,
    itineraryId,
    enabled: !hasConfirmed,
  });

  function handleRetry() {
    void refetch();
  }

  function handleConflict() {
    // 다른 기기에서 먼저 확정했으면 그룹 상태를 다시 받아 확정 화면으로 보냄
    showToast(ERROR_MESSAGES.storyUnavailable);
    onGroupRefetch();
  }

  function handleConfirmError(confirmError: Error) {
    if (isApiError(confirmError, 403)) showToast(ERROR_MESSAGES.leaderOnly);
    else if (isApiError(confirmError, 409)) handleConflict();
    else showToast(ERROR_MESSAGES.requestFailed);
  }

  function confirmAndContinue() {
    confirmTimeline(undefined, {
      onSuccess: () => {
        setHasConfirmed(true);
        router.push(confirmedHref);
      },
      onError: handleConfirmError,
    });
  }

  // 확정하면 선택 저장이 409가 되므로 선택을 먼저 저장한 뒤 확정함
  function saveSelectionAndContinue(days: ItineraryDay[]) {
    saveSelection(days, {
      onSuccess: confirmAndContinue,
      onError: handleConfirmError,
    });
  }

  /**
   * 꾹 눌러 바꾼 순서는 각 장소의 시간을 새 칸 시간으로 바꿔 타임라인에 저장한 뒤 선택을 저장함.
   * 서버의 타임라인(캐시)과 비교해 바뀐 방문만 보냄
   */
  function handleTimelineConfirm(days: ItineraryDay[]) {
    if (!itinerary) return;
    const dayRange = toDayRange(itinerary.dayStartTime, itinerary.dayEndTime);
    const patches = planTimelinePatches(itinerary.days, days, dayRange);
    if (patches === null) {
      showToast(ERROR_MESSAGES.timelineTimeInvalid);
      return;
    }
    if (patches.length === 0) {
      saveSelectionAndContinue(days);
      return;
    }
    saveTimes(patches, {
      onSuccess: () => saveSelectionAndContinue(days),
      onError: (saveError) => {
        if (isApiError(saveError, 403)) showToast(ERROR_MESSAGES.leaderOnly);
        else if (isApiError(saveError, 400)) showToast(ERROR_MESSAGES.timelineTimeInvalid);
        else showToast(ERROR_MESSAGES.requestFailed);
      },
    });
  }

  if (isConfirmed) {
    return (
      <>
        <StoryTimelineSkeleton />
        <Toast open={confirmedToastMessage !== null} message={confirmedToastMessage ?? ""} />
      </>
    );
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
      guide={isLeader ? LEADER_GUIDE : isMissing ? undefined : MEMBER_GUIDE}
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
              <TimelineStopCard stop={stop} placeName={<PlaceName placeId={stop.placeId} />} />
            </li>
          ))}
        </ol>
      ) : (
        <TimelineEditor
          groupId={group.id}
          itineraryId={itinerary.id}
          initialDays={itinerary.days}
          date={dates[selectedDayIndex]}
          dayRange={toDayRange(itinerary.dayStartTime, itinerary.dayEndTime)}
          isConfirming={isSaving || isSavingTimes || isConfirmingTimeline || hasConfirmed}
          onConfirm={handleTimelineConfirm}
        />
      )}
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </StoryLayout>
  );
}
