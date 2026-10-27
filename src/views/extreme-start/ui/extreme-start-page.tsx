"use client";

import { useGroupByParam } from "@/entities/group";
import { Button, ErrorState, ModeTitle, Screen, Skeleton } from "@/shared/ui";

type ExtremeStartPageProps = {
  groupId: string;
};

export default function ExtremeStartPage({ groupId }: ExtremeStartPageProps) {
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

  // TODO: 익스트림 모드 시작 API가 생기면 시작 요청 후 이동
  return (
    <Screen className="items-center">
      <ModeTitle size="lg" className="mt-59.25">
        EXTREME
        <br />
        MODE
      </ModeTitle>
      <Button size="xl" href={`/groups/${group.id}/extreme/play`} className="mt-41.75">
        익스트림 모드 시작하기
      </Button>
    </Screen>
  );
}
