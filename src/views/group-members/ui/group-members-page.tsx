import { notFound } from "next/navigation";
import { GroupTitleBar, getGroup } from "@/entities/group";
import { MemberItem, getMembers } from "@/entities/user";
import { BackHeader, Screen } from "@/shared/ui";

type GroupMembersPageProps = {
  groupId: string;
};

export default function GroupMembersPage({ groupId }: GroupMembersPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  const members = getMembers(group.id);

  return (
    <Screen className="gap-11">
      <div className="flex flex-col gap-8">
        <BackHeader backHref={`/groups/${group.id}`} size="sm" title="그룹 멤버 보기" />
        <GroupTitleBar group={group} className="h-14.5" />
      </div>
      <ul className="flex flex-col gap-3" aria-label="그룹 멤버">
        {members.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </ul>
    </Screen>
  );
}
