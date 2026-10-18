import { GroupMembersPage } from "@/views/group-members";

export default async function Page({ params }: PageProps<"/groups/[groupId]/members">) {
  const { groupId } = await params;
  return <GroupMembersPage groupId={groupId} />;
}
