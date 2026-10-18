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
      <div className="flex flex-col gap-13">
        <BackHeader backHref={`/groups/${group.id}`} />
        <GroupTitleBar group={group} />
      </div>
      <ul className="flex flex-col gap-[12px]" aria-label="그룹 멤버">
        {members.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </ul>
    </Screen>
  );
}
