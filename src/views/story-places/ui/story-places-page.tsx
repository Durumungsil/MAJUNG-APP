import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { getRecommendedPlaces } from "@/entities/place";
import { PlaceSelectList } from "@/features/select-place";
import { StoryLayout } from "@/widgets/story-layout";

type StoryPlacesPageProps = {
  groupId: string;
};

export default function StoryPlacesPage({ groupId }: StoryPlacesPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  const places = getRecommendedPlaces(group.id);

  return (
    <StoryLayout
      startDate={group.startDate}
      endDate={group.endDate}
      guide="원하는 장소를 선택해 타임라인을 생성하세요"
    >
      <PlaceSelectList places={places} nextHref={`/groups/${group.id}/story/timeline`} />
    </StoryLayout>
  );
}
