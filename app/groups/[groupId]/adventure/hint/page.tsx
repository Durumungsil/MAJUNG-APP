import { AdventureHintView } from "@/views/adventure-hint";

export default async function Page({ params }: PageProps<"/groups/[groupId]/adventure/hint">) {
  const { groupId } = await params;
  return <AdventureHintView groupId={groupId} />;
}
