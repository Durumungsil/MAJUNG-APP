"use client";

import { notFound } from "next/navigation";
import { parseGroupId } from "@/entities/group";
import {
  ExtremeNavigation,
  parseRouletteId,
  useExtremeConflictRedirect,
  useRouletteResult,
} from "@/features/extreme-roulette";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Skeleton, Toast } from "@/shared/ui";

type ExtremeNavigationPageProps = {
  groupId: string;
  rouletteId: string;
};

export default function ExtremeNavigationPage({
  groupId: groupIdParam,
  rouletteId: rouletteIdParam,
}: ExtremeNavigationPageProps) {
  const groupId = parseGroupId(groupIdParam);
  const rouletteId = parseRouletteId(rouletteIdParam);
  if (groupId === null || rouletteId === null) notFound();

  const {
    data: result,
    isPending,
    isError,
    error,
    refetch,
  } = useRouletteResult(groupId, rouletteId);
  const { isConflict, toastMessage } = useExtremeConflictRedirect(error, groupId);

  function handleRetry() {
    void refetch();
  }

  if (isApiError(error, 404)) notFound();
  if (isConflict) return <Toast open={toastMessage !== null} message={toastMessage ?? ""} />;
  if (isPending) {
    return (
      <main className="flex h-dvh flex-col">
        <Skeleton className="min-h-0 flex-1 rounded-none" />
        <div className="px-8 pt-8 pb-[max(--spacing(7.5),var(--safe-bottom))]">
          <Skeleton className="h-12 w-full" />
        </div>
      </main>
    );
  }
  if (isError) {
    return (
      <Screen>
        <ErrorState onRetry={handleRetry} />
      </Screen>
    );
  }

  return <ExtremeNavigation place={result.place} exitHref={`/groups/${groupId}/extreme/play`} />;
}
