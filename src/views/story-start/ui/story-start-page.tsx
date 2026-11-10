"use client";

import { useGroupByParam } from "@/entities/group";
import { Button, CloseHeader, ErrorState, ModeTitle, Screen, Skeleton } from "@/shared/ui";

type StoryStartPageProps = {
  groupId: string;
};

export default function StoryStartPage({ groupId }: StoryStartPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  // 모드 시작 전에는 그룹 상세로 나갈 수 있음
  const closeHref = `/groups/${groupId}`;

  function handleRetry() {
    void refetch();
  }

  if (isPending) {
    return (
      <Screen>
        <CloseHeader closeHref={closeHref} />
        <Skeleton className="mt-5 h-40" />
      </Screen>
    );
  }
  if (isError) {
    return (
      <Screen>
        <CloseHeader closeHref={closeHref} />
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return (
    <Screen className="items-center">
      {/* 헤더 높이(아이콘 size-4)만큼 제목 위 여백을 줄여 기존 위치를 유지함 */}
      <div className="self-stretch">
        <CloseHeader closeHref={closeHref} />
      </div>
      <ModeTitle size="lg" className="mt-55.25">
        STORY MODE
      </ModeTitle>
      <Button size="xl" href={`/groups/${group.id}/story/places`} className="mt-57.25">
        스토리모드 시작하기
      </Button>
    </Screen>
  );
}
