import { StoryTimelinePage } from "@/views/story-timeline";

export default async function Page({ params }: PageProps<"/groups/[groupId]/story/timeline">) {
  const { groupId } = await params;
  return <StoryTimelinePage groupId={groupId} />;
}
