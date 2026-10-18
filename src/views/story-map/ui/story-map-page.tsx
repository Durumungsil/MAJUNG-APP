import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { ScheduleHeader, getJourneyStops } from "@/entities/journey";
import { MapExplorer } from "@/features/explore-map";
import { TextLink } from "@/shared/ui";

type StoryMapPageProps = {
  groupId: string;
};

export default function StoryMapPage({ groupId }: StoryMapPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  const stops = getJourneyStops(group.id);

  return (
    <main className="flex flex-1 flex-col pb-[calc(var(--safe-bottom)+--spacing(11))]">
      <MapExplorer stops={stops} />
      <div className="mt-8 flex flex-col gap-5 px-page">
        <ScheduleHeader
          startDate={group.startDate}
          endDate={group.endDate}
          action={<TextLink href={`/groups/${group.id}/story/timeline`}>타임라인 보기</TextLink>}
        />
        <p className="text-s text-text-primary">
          장소를 선택하면 그 주변의 또 다른 장소들을 추천해요
        </p>
      </div>
    </main>
  );
}
