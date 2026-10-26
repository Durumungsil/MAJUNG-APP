import { StoryMapPage } from "@/views/story-map";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/groups/[groupId]/story/map">) {
  const { groupId } = await params;
  const { itineraryId } = await searchParams;
  return <StoryMapPage groupId={groupId} itineraryId={itineraryId} />;
}
