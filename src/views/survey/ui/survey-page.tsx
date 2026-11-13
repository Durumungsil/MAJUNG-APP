"use client";

import { useGroupByParam } from "@/entities/group";
import { SurveyForm } from "@/features/submit-survey";
import { CloseHeader, ErrorState, Screen } from "@/shared/ui";
import SurveySkeleton from "./survey-skeleton";

type SurveyPageProps = {
  groupId: string;
};

export default function SurveyPage({ groupId }: SurveyPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  if (isPending) return <SurveySkeleton groupId={groupId} />;

  return (
    <Screen className="gap-7">
      <CloseHeader closeHref={`/groups/${groupId}`} />
      {isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <SurveyForm groupId={group.id} submittedHref={`/groups/${group.id}/survey/waiting`} />
      )}
    </Screen>
  );
}
