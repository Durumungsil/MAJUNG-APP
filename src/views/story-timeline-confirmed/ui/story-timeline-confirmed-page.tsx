import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { JourneyStopCard, getJourneyStops } from "@/entities/journey";
import { TextLink } from "@/shared/ui";
import { StoryLayout } from "@/widgets/story-layout";

type StoryTimelineConfirmedPageProps = {
  groupId: string;
};

export default function StoryTimelineConfirmedPage({ groupId }: StoryTimelineConfirmedPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  const stops = getJourneyStops(group.id);

  return (
    <StoryLayout
      startDate={group.startDate}
      endDate={group.endDate}
      action={<TextLink href={`/groups/${group.id}/story/map`}>지도로 보기</TextLink>}
    >
      <ol aria-label="확정된 타임라인" className="flex flex-col gap-5">
        {stops.map((stop) => (
          <li key={stop.id}>
            <JourneyStopCard stop={stop} />
          </li>
        ))}
      </ol>
    </StoryLayout>
  );
}
