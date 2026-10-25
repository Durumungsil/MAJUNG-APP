"use client";

import { useGroupByParam } from "@/entities/group";
import { SurveyForm } from "@/features/submit-survey";
import { CloseHeader, ErrorState, Screen, Skeleton } from "@/shared/ui";

type SurveyPageProps = {
  groupId: string;
};

export default function SurveyPage({ groupId }: SurveyPageProps) {
  const { data: group, isPending, isError, refetch } = useGroupByParam(groupId);

  function handleRetry() {
    void refetch();
  }

  return (
    <Screen className="gap-7">
      <CloseHeader closeHref={`/groups/${groupId}`} />
      {isPending ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-14" />
          <Skeleton className="h-8" />
        </div>
      ) : isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <SurveyForm groupId={group.id} submittedHref={`/groups/${group.id}/survey/waiting`} />
      )}
    </Screen>
  );
}
