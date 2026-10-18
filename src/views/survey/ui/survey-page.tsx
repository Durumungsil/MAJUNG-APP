import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { SurveyForm } from "@/features/submit-survey";
import { CloseHeader, Screen } from "@/shared/ui";

type SurveyPageProps = {
  groupId: string;
};

export default function SurveyPage({ groupId }: SurveyPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  return (
    <Screen className="gap-8.5">
      <CloseHeader closeHref={`/groups/${group.id}`} />
      <SurveyForm submittedHref={`/groups/${group.id}/survey/waiting`} />
    </Screen>
  );
}
