import { StoryTimelineConfirmedPage } from "@/views/story-timeline-confirmed";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/groups/[groupId]/story/timeline/confirmed">) {
  const { groupId } = await params;
  const { itineraryId } = await searchParams;
  return <StoryTimelineConfirmedPage groupId={groupId} itineraryId={itineraryId} />;
}
