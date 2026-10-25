"use client";

import {
  GroupTitleBar,
  TRIP_STATUS_LABEL,
  TripPeriodCard,
  formatExpiresAt,
  getGroupRole,
  useGroupByParam,
  useGroupTrips,
  useInviteCode,
  useMyGroups,
  type Group,
} from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { AvatarStack, findLeaderName, useGroupMembers } from "@/entities/user";
import { Button, CopyButton, ErrorState, InfoRow, Screen, Skeleton, TextLink } from "@/shared/ui";
import { getPrimaryAction } from "../lib/primary-action";
import GroupDetailHeader from "./group-detail-header";

type GroupDetailPageProps = {
  groupId: string;
};

export default function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <GroupDetailSkeleton />;
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return <GroupDetailContent group={group} />;
}

function GroupDetailContent({ group }: { group: Group }) {
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  const role = getGroupRole(group, userId);
  const isLeader = role === "leader";

  const { data: members } = useGroupMembers(group.id);
  const { data: trips } = useGroupTrips(group.id);
  const { data: inviteCode } = useInviteCode(group.id, isLeader);
  // 상세 응답에는 내 설문 여부가 없어서 그룹 목록(대부분 캐시에 있음)에서 가져옴
  const { data: myGroups } = useMyGroups();
  const myPreferencesCompleted = myGroups?.find(
    (item) => item.id === group.id,
  )?.myPreferencesCompleted;

  const leaderName = members ? findLeaderName(members) : null;
  const inviteExpiresAt = inviteCode?.expiresAt ? formatExpiresAt(inviteCode.expiresAt) : null;
  const primaryAction = getPrimaryAction({ group, isLeader, myPreferencesCompleted });

  return (
    <Screen>
      <GroupDetailHeader groupId={group.id} role={role} />
      <div className="mt-8 flex flex-col gap-10">
        <GroupTitleBar group={group} />
        <dl className="flex flex-col gap-6">
          <InfoRow label="그룹 리더">
            <span className="text-black">{leaderName ?? "-"}</span>
          </InfoRow>
          <InfoRow label="여행 장소">{group.region ?? "-"}</InfoRow>
          <InfoRow label="여행 상태">
            {group.status ? TRIP_STATUS_LABEL[group.status] : "-"}
          </InfoRow>
          <InfoRow label="여행 횟수">
            {trips ? (
              <TextLink href={`/groups/${group.id}/trips`} className="text-m">
                {trips.length}
              </TextLink>
            ) : (
              "-"
            )}
          </InfoRow>
          {isLeader && (
            <InfoRow label="초대 코드">
              {inviteCode ? (
                <span className="flex flex-col items-end">
                  <span className="flex items-center gap-2">
                    {inviteCode.code}
                    <CopyButton value={inviteCode.code} label="초대 코드 복사" className="size-4" />
                  </span>
                  {inviteExpiresAt && (
                    <span className="text-xxs text-text-muted">{inviteExpiresAt}</span>
                  )}
                </span>
              ) : (
                "-"
              )}
            </InfoRow>
          )}
        </dl>
      </div>
      <div className="mt-12.5">
        <TripPeriodCard group={group} />
      </div>
      {!isLeader && members && (
        <div className="mt-8">
          <AvatarStack members={members} />
        </div>
      )}
      {primaryAction && (
        <Button href={primaryAction.href} size="xl" className={isLeader ? "mt-20" : "mt-10"}>
          {primaryAction.label}
        </Button>
      )}
    </Screen>
  );
}

function GroupDetailSkeleton() {
  return (
    <Screen>
      <Skeleton className="h-6 w-6" />
      <div className="mt-8 flex flex-col gap-10">
        <Skeleton className="h-12" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
      <Skeleton className="mt-12.5 h-32" />
    </Screen>
  );
}
