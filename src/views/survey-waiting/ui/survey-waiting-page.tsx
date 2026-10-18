import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { Button, Screen, Spinner } from "@/shared/ui";

type SurveyWaitingPageProps = {
  groupId: string;
};

export default function SurveyWaitingPage({ groupId }: SurveyWaitingPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  return (
    <Screen className="items-center">
      <div className="mt-9.75 flex flex-col items-center gap-16">
        <Spinner />
        <p className="text-center text-xl text-text-primary">
          친구들이 취향 설문지를
          <br />
          입력하고 있어요!
        </p>
      </div>
      <Button href={`/groups/${group.id}`} className="mt-auto">
        그만두기
      </Button>
    </Screen>
  );
}
