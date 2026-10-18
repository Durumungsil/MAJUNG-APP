import { GroupEditPage } from "@/views/group-edit";

export default async function Page({ params }: PageProps<"/groups/[groupId]/edit">) {
  const { groupId } = await params;
  return <GroupEditPage groupId={groupId} />;
}
