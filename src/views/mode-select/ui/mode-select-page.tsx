"use client";

import { useGroupByParam } from "@/entities/group";
import { ModeSelectForm } from "@/features/select-mode";
import { CloseHeader, ErrorState, Screen, Skeleton } from "@/shared/ui";

type ModeSelectPageProps = {
  groupId: string;
};

export default function ModeSelectPage({ groupId }: ModeSelectPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isError) {
    return (
      <Screen>
        <CloseHeader closeHref={`/groups/${groupId}`} />
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return (
    <Screen className="overflow-x-clip">
      <div className="flex flex-col gap-7">
        <CloseHeader closeHref={`/groups/${groupId}`} />
        {isPending ? (
          <Skeleton className="h-16" />
        ) : (
          <h1 className="text-xl text-text-primary">
            {group.name}로 여행을 시작해요!
            <br />
            계획 방법을 정해볼까요?
          </h1>
        )}
      </div>
      {!isPending && (
        <ModeSelectForm groupId={group.id} confirmHref={`/groups/${group.id}/survey`} />
      )}
    </Screen>
  );
}
