"use client";

import { GroupTitleBar, getGroupRole, useGroupByParam } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { MemberItem, useGroupMembers } from "@/entities/user";
import { TransferOwnershipButton } from "@/features/transfer-ownership";
import { BackHeader, ErrorState, Screen, Skeleton } from "@/shared/ui";

type GroupMembersPageProps = {
  groupId: string;
};

const SKELETON_MEMBER_COUNT = 3;

export default function GroupMembersPage({ groupId }: GroupMembersPageProps) {
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  const groupQuery = useGroupByParam(groupId);
  const membersQuery = useGroupMembers(groupQuery.data?.id ?? null);
  const group = groupQuery.data;
  const members = membersQuery.data;
  const isError = groupQuery.isError || membersQuery.isError;
  // 대표자만 다른 멤버에게 대표자를 넘길 수 있음
  const isLeader = group !== undefined && getGroupRole(group, userId) === "leader";

  function handleRetry() {
    if (groupQuery.isError) void groupQuery.refetch();
    if (membersQuery.isError) void membersQuery.refetch();
  }

  return (
    <Screen className="gap-11">
      <div className="flex flex-col gap-8">
        <BackHeader backHref={`/groups/${groupId}`} size="sm" title="그룹 멤버 보기" />
        {group ? (
          <GroupTitleBar group={group} className="h-14.5" />
        ) : (
          <Skeleton className="h-14.5" />
        )}
      </div>
      {isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <ul className="flex flex-col gap-3" aria-label="그룹 멤버">
          {members && group
            ? members.map((member) => (
                <MemberItem
                  key={member.id}
                  member={member}
                  action={
                    isLeader &&
                    !member.isLeader && (
                      <TransferOwnershipButton groupId={group.id} member={member} />
                    )
                  }
                />
              ))
            : Array.from({ length: SKELETON_MEMBER_COUNT }, (_, index) => (
                <li key={index}>
                  <Skeleton className="h-19.5" />
                </li>
              ))}
        </ul>
      )}
    </Screen>
  );
}
