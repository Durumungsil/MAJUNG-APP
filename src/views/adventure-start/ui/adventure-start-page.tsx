"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CURRENT_MISSION_POLLING_MS, useCurrentMission } from "@/entities/adventure";
import { getGroupRole, useGroupByParam } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { StartAdventureButton } from "@/features/start-adventure";
import { ErrorState, ModeTitle, Screen, Skeleton } from "@/shared/ui";

type AdventureStartPageProps = {
  groupId: string;
};

export default function AdventureStartPage({ groupId }: AdventureStartPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);

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

  return null;
}
