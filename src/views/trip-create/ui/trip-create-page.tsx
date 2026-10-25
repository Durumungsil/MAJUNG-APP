"use client";

import { GroupTitleBar, useGroupByParam } from "@/entities/group";
import { StartTripForm } from "@/features/start-trip";
import { BackHeader, ErrorState, Screen, Skeleton } from "@/shared/ui";

type TripCreatePageProps = {
  groupId: string;
};

export default function TripCreatePage({ groupId }: TripCreatePageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  return (
    <Screen>
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="새 여행 시작하기" />
      {isPending ? (
        <div className="mt-8 flex flex-col gap-6">
          <Skeleton className="h-12" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      ) : isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <>
          <GroupTitleBar group={group} className="mt-8" />
          <StartTripForm groupId={group.id} defaultRegion={group.region ?? undefined} />
        </>
      )}
    </Screen>
  );
}
