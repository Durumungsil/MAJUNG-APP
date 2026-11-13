"use client";

import { GroupTitleBar, useGroupByParam } from "@/entities/group";
import { StartTripForm } from "@/features/start-trip";
import { BackHeader, ErrorState, Screen } from "@/shared/ui";
import TripCreateSkeleton from "./trip-create-skeleton";

type TripCreatePageProps = {
  groupId: string;
};

export default function TripCreatePage({ groupId }: TripCreatePageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <TripCreateSkeleton groupId={groupId} />;

  return (
    <Screen>
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="새 여행 시작하기" />
      {isError ? (
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
