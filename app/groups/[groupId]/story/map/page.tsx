import { StoryMapPage } from "@/views/story-map";

export default async function Page({ params }: PageProps<"/groups/[groupId]/story/map">) {
  const { groupId } = await params;
  return <StoryMapPage groupId={groupId} />;
}
