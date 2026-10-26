import { AdventureMainView } from "@/views/adventure-main";

export default async function Page({ params }: PageProps<"/groups/[groupId]/adventure/map">) {
  const { groupId } = await params;
  return <AdventureMainView groupId={groupId} />;
}
