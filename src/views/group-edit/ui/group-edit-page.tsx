"use client";

import { useGroupByParam } from "@/entities/group";
import { EditGroupForm } from "@/features/edit-group";
import { BackHeader, ErrorState, Screen } from "@/shared/ui";
import GroupEditSkeleton from "./group-edit-skeleton";

type GroupEditPageProps = {
  groupId: string;
};

export default function GroupEditPage({ groupId }: GroupEditPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <GroupEditSkeleton groupId={groupId} />;

  return (
    <Screen>
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="그룹 수정하기" />
      {isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        // 불러온 값으로 폼 기본값을 채우므로 그룹이 바뀌면 폼을 새로 만듦
        <EditGroupForm key={group.id} group={group} />
      )}
    </Screen>
  );
}
