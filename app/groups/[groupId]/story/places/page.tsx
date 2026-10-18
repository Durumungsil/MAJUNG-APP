import { StoryPlacesPage } from "@/views/story-places";

export default async function Page({ params }: PageProps<"/groups/[groupId]/story/places">) {
  const { groupId } = await params;
  return <StoryPlacesPage groupId={groupId} />;
}
