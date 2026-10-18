import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { Button, ModeTitle, Screen } from "@/shared/ui";

type StoryStartPageProps = {
  groupId: string;
};

export default function StoryStartPage({ groupId }: StoryStartPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  return (
    <Screen className="items-center">
      <ModeTitle size="lg" className="mt-59.25">
        STORY MODE
      </ModeTitle>
      <Button size="xl" href={`/groups/${group.id}/story/places`} className="mt-57.25">
        스토리모드 시작하기
      </Button>
    </Screen>
  );
}
