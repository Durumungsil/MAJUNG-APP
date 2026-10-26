import { AdventureStartPage } from "@/views/adventure-start";

export default async function Page({ params }: PageProps<"/groups/[groupId]/adventure">) {
  const { groupId } = await params;
  return <AdventureStartPage groupId={groupId} />;
}
