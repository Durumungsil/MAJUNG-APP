import { AdventureJourneyView } from "@/views/adventure-journey";

export default async function Page({ params }: PageProps<"/groups/[groupId]/adventure/journey">) {
  const { groupId } = await params;
  return <AdventureJourneyView groupId={groupId} />;
}
