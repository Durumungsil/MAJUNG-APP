"use client";

import { useGroupByParam } from "@/entities/group";
import { Button, CloseHeader, ErrorState, ModeTitle, Screen } from "@/shared/ui";
import ExtremeStartSkeleton from "./extreme-start-skeleton";

type ExtremeStartPageProps = {
  groupId: string;
};

export default function ExtremeStartPage({ groupId }: ExtremeStartPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  // 모드 시작 전에는 그룹 상세로 나갈 수 있음
  const closeHref = `/groups/${groupId}`;

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <ExtremeStartSkeleton groupId={groupId} />;
  if (isError) {
    return (
      <Screen>
        <CloseHeader closeHref={closeHref} />
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  // TODO: 익스트림 모드 시작 API가 생기면 시작 요청 후 이동
  return (
    <Screen className="items-center">
      {/* 헤더 높이(아이콘 size-4)만큼 제목 위 여백을 줄여 기존 위치를 유지함 */}
      <div className="self-stretch">
        <CloseHeader closeHref={closeHref} />
      </div>
      <ModeTitle size="lg" className="mt-55.25">
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
