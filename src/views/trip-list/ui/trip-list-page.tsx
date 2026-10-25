"use client";

import { GroupTitleBar, TripCard, useGroupByParam, useGroupTrips } from "@/entities/group";
import { BackHeader, ErrorState, Screen, Skeleton } from "@/shared/ui";

type TripListPageProps = {
  groupId: string;
};

const SKELETON_CARD_COUNT = 2;

export default function TripListPage({ groupId }: TripListPageProps) {
  const groupQuery = useGroupByParam(groupId);
  const tripsQuery = useGroupTrips(groupQuery.data?.id ?? null);
  const group = groupQuery.data;
  const trips = tripsQuery.data;
  const isError = groupQuery.isError || tripsQuery.isError;

  function handleRetry() {
    if (groupQuery.isError) void groupQuery.refetch();
    if (tripsQuery.isError) void tripsQuery.refetch();
  }

  return (
    <Screen className="gap-8">
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="지난 여행 보기" />
      {group ? <GroupTitleBar group={group} /> : <Skeleton className="h-12" />}
      {isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <ol className="flex flex-col gap-5" aria-label="여행 목록">
          {trips
            ? // 최신순으로 내려오므로 회차 번호는 뒤에서부터 셈
              trips.map((trip, index) => (
                <li key={trip.id}>
                  <TripCard trip={trip} order={trips.length - index} />
                </li>
              ))
            : Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
                <li key={index}>
                  <Skeleton className="h-21" />
                </li>
              ))}
        </ol>
      )}
    </Screen>
  );
}
