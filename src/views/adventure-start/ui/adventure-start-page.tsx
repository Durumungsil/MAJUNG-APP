"use client";

import { useGroupByParam } from "@/entities/group";
import { StartAdventureButton } from "@/features/start-adventure";
import { ErrorState, ModeTitle, Screen, Skeleton } from "@/shared/ui";

type AdventureStartPageProps = {
  groupId: string;
};

export default function AdventureStartPage({ groupId }: AdventureStartPageProps) {
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

  return (
    <Screen className="items-center">
      <ModeTitle size="lg" className="mt-59.25">
        ADVENTURE
        <br />
        MODE
      </ModeTitle>
      <StartAdventureButton groupId={group.id} className="mt-41.75" />
    </Screen>
  );
}
