import { StoryTimelineConfirmedPage } from "@/views/story-timeline-confirmed";

export default async function Page({
  params,
}: PageProps<"/groups/[groupId]/story/timeline/confirmed">) {
  const { groupId } = await params;
  return <StoryTimelineConfirmedPage groupId={groupId} />;
}
