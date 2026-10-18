import { StoryStartPage } from "@/views/story-start";

export default async function Page({ params }: PageProps<"/groups/[groupId]/story">) {
  const { groupId } = await params;
  return <StoryStartPage groupId={groupId} />;
}
