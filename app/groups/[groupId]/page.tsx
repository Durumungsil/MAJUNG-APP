import { GroupDetailPage } from "@/views/group-detail";

export default async function Page({ params }: PageProps<"/groups/[groupId]">) {
  const { groupId } = await params;
  return <GroupDetailPage groupId={groupId} />;
}
