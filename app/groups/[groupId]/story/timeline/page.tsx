import { StoryTimelinePage } from "@/views/story-timeline";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/groups/[groupId]/story/timeline">) {
  const { groupId } = await params;
  const { itineraryId } = await searchParams;
  return <StoryTimelinePage groupId={groupId} itineraryId={itineraryId} />;
}
