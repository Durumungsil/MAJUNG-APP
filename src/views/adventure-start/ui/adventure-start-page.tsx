"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CURRENT_MISSION_POLLING_MS, useCurrentMission } from "@/entities/adventure";
import { getGroupRole, useGroupByParam } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { StartAdventureButton } from "@/features/start-adventure";
import { CloseHeader, ErrorState, ModeTitle, Screen } from "@/shared/ui";
import AdventureStartSkeleton from "./adventure-start-skeleton";

type AdventureStartPageProps = {
  groupId: string;
};

export default function AdventureStartPage({ groupId }: AdventureStartPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);

  // 모드 시작 전에는 그룹 상세로 나갈 수 있음
  const closeHref = `/groups/${groupId}`;

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <AdventureStartSkeleton groupId={groupId} />;
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
        ADVENTURE
        <br />
        MODE
      </ModeTitle>
      {/* 커리큘럼은 대표자만 만듦. 멤버는 대표자가 시작하면 미션 화면으로 따라 들어감 */}
      {getGroupRole(group, userId) === "leader" ? (
        <StartAdventureButton groupId={group.id} className="mt-41.75" />
      ) : (
        <FollowLeaderStart groupId={group.id} />
      )}
    </Screen>
  );
}

/** 오늘 미션이 생길 때까지 현재 미션을 다시 조회하고, 생기면 미션 화면으로 이동함 */
function FollowLeaderStart({ groupId }: { groupId: number }) {
  const router = useRouter();
  const { data: mission } = useCurrentMission(groupId, CURRENT_MISSION_POLLING_MS);
  const hasMission = mission != null;

  useEffect(() => {
    if (hasMission) router.replace(`/groups/${groupId}/adventure/map`);
  }, [hasMission, groupId, router]);

  return (
    <p className="mt-41.75 text-center text-m text-text-muted">
      대표자가 모험을 시작하면 자동으로 이동해요
    </p>
  );
}
