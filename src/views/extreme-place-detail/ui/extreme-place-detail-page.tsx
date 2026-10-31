"use client";

import { notFound, useRouter } from "next/navigation";
import { parseGroupId } from "@/entities/group";
import {
  ExtremePlaceConfirm,
  isRouletteKind,
  parseRouletteId,
  useExtremeConflictRedirect,
  useRouletteResult,
} from "@/features/extreme-roulette";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Skeleton, Toast } from "@/shared/ui";

type ExtremePlaceDetailPageProps = {
  groupId: string;
  kind: string;
  rouletteId: string;
};

export default function ExtremePlaceDetailPage({
  groupId: groupIdParam,
  kind,
  rouletteId: rouletteIdParam,
}: ExtremePlaceDetailPageProps) {
  const groupId = parseGroupId(groupIdParam);
  const rouletteId = parseRouletteId(rouletteIdParam);
  if (groupId === null || rouletteId === null || !isRouletteKind(kind)) notFound();

  const router = useRouter();
  const {
    data: result,
    isPending,
    isError,
    error,
    refetch,
  } = useRouletteResult(groupId, rouletteId);
  const { isConflict, toastMessage } = useExtremeConflictRedirect(error, groupId);

  function handleConfirmed() {
    router.push(`/groups/${groupId}/extreme/navigate/${rouletteId}`);
  }

  function handleClose() {
    router.push(`/groups/${groupId}/extreme/roulette/${kind}`);
  }

  function handleRetry() {
    void refetch();
  }

  if (isApiError(error, 404)) notFound();
  if (isConflict) return <Toast open={toastMessage !== null} message={toastMessage ?? ""} />;
  if (isPending) {
    return (
      <main className="flex h-dvh flex-col overflow-hidden">
        <Skeleton className="min-h-0 w-full flex-1 rounded-none" />
        <div className="flex flex-col gap-3 px-8 pt-6 pb-[calc(var(--safe-bottom)+--spacing(11))]">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-5 w-full" />
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
  // 다른 종류 룰렛의 결과를 주소로 직접 연 경우
  if (result.kind !== kind) notFound();

  return (
    <main className="flex h-dvh flex-col overflow-hidden">
      <ExtremePlaceConfirm
        groupId={groupId}
        result={result}
        onConfirmed={handleConfirmed}
        onClose={handleClose}
      />
    </main>
  );
}
