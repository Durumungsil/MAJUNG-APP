import { notFound } from "next/navigation";
import { GroupTitleBar, TripPeriodCard, getGroup } from "@/entities/group";
import { AvatarStack, getMembers } from "@/entities/user";
import { Button, CopyButton, InfoRow, Screen } from "@/shared/ui";
import GroupDetailHeader from "./group-detail-header";

type GroupDetailPageProps = {
  groupId: string;
};

export default function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  const isLeader = group.myRole === "leader";
  const members = getMembers(group.id);

  return (
    <Screen>
      <GroupDetailHeader groupId={group.id} role={group.myRole} />
      <div className="mt-8 flex flex-col gap-10">
        <GroupTitleBar group={group} />
        <dl className="flex flex-col gap-6">
          <InfoRow label="그룹 리더">
            <span className="text-black">{group.leaderName}</span>
          </InfoRow>
          <InfoRow label="여행 장소">{group.destination}</InfoRow>
          <InfoRow label="여행 횟수">{group.tripCount}</InfoRow>
          {isLeader && (
            <InfoRow label="초대 코드">
              <span className="flex items-center gap-2">
                {group.inviteCode}
                <CopyButton value={group.inviteCode} label="초대 코드 복사" className="size-4" />
              </span>
            </InfoRow>
          )}
        </dl>
      </div>
      <div className="mt-12.5">
        <TripPeriodCard group={group} />
      </div>
      {isLeader ? (
        <Button href={`/groups/${group.id}/mode`} size="xl" className="mt-20">
          여행 시작하기
        </Button>
      ) : (
        <div className="mt-8">
          <AvatarStack members={members} />
        </div>
      )}
    </Screen>
  );
}
