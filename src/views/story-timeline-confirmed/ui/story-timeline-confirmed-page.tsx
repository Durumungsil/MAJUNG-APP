"use client";

import { useState } from "react";
import { getGroupRole, useGroupByParam, type Group } from "@/entities/group";
import {
  TimelineStopCard,
  getDayStops,
  getTripDates,
  parseItineraryId,
  useItinerary,
  withItineraryId,
} from "@/entities/journey";
import { PlaceName } from "@/entities/place";
import { useSessionStore } from "@/entities/session";
import { useEndModeExit } from "@/features/end-mode";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Skeleton, TextLink, Toast } from "@/shared/ui";
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
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  const isLeader = getGroupRole(group, userId) === "leader";
  const { exit, isExiting, toastMessage } = useEndModeExit({ groupId: group.id, isLeader });

  function handleRetry() {
    void refetch();
  }

  function handleExitClick() {
    void exit();
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
                <TimelineStopCard stop={stop} placeName={<PlaceName placeId={stop.placeId} />} />
              </li>
            ))}
          </ol>
          {/* 대표자는 여행 회차를 끝낸 뒤, 멤버는 끝내지 않고 그룹 상세로 이동함 */}
          <button
            type="button"
            onClick={handleExitClick}
            disabled={isExiting}
            aria-busy={isExiting}
            className="mt-6 self-center whitespace-nowrap text-l text-text-muted"
          >
            스토리 모드 종료하기
          </button>
        </>
      )}
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
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
