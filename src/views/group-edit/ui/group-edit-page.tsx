import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { EditGroupForm } from "@/features/edit-group";
import { BackHeader, Screen } from "@/shared/ui";

type GroupEditPageProps = {
  groupId: string;
};

export default function GroupEditPage({ groupId }: GroupEditPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  return (
    <Screen>
      <BackHeader backHref={`/groups/${group.id}`} size="sm" title="그룹 수정하기" />
      <EditGroupForm group={group} />
    </Screen>
  );
}
