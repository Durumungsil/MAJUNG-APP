import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { getJourneyStops } from "@/entities/journey";
import { TimelineEditor } from "@/features/reorder-timeline";
import { TextLink } from "@/shared/ui";
import { StoryLayout } from "@/widgets/story-layout";

type StoryTimelinePageProps = {
  groupId: string;
};

export default function StoryTimelinePage({ groupId }: StoryTimelinePageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  const stops = getJourneyStops(group.id);

  return (
    <StoryLayout
      startDate={group.startDate}
      endDate={group.endDate}
      action={<TextLink href={`/groups/${group.id}/story/map`}>지도로 보기</TextLink>}
      guide="장소를 꾹 눌러서 순서를 변경할 수 있어요"
    >
      <TimelineEditor
        initialStops={stops}
        confirmHref={`/groups/${group.id}/story/timeline/confirmed`}
      />
    </StoryLayout>
  );
}
