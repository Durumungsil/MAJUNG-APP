"use client";

import { useGroupByParam } from "@/entities/group";
import { Button, ErrorState, ModeTitle, Screen, Skeleton } from "@/shared/ui";

type StoryStartPageProps = {
  groupId: string;
};

export default function StoryStartPage({ groupId }: StoryStartPageProps) {
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
        STORY MODE
      </ModeTitle>
      <Button size="xl" href={`/groups/${group.id}/story/places`} className="mt-57.25">
        스토리모드 시작하기
      </Button>
    </Screen>
  );
}
