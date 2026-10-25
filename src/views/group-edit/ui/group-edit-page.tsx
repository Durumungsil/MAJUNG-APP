"use client";

import { useGroupByParam } from "@/entities/group";
import { EditGroupForm } from "@/features/edit-group";
import { BackHeader, ErrorState, Screen, Skeleton } from "@/shared/ui";

type GroupEditPageProps = {
  groupId: string;
};

export default function GroupEditPage({ groupId }: GroupEditPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  return (
    <Screen>
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="그룹 수정하기" />
      {isPending ? (
        <div className="mt-12.5 flex flex-col gap-6">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      ) : isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        // 불러온 값으로 폼 기본값을 채우므로 그룹이 바뀌면 폼을 새로 만듦
        <EditGroupForm key={group.id} group={group} />
      )}
    </Screen>
  );
}
