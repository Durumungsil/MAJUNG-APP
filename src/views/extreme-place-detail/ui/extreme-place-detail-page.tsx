"use client";

import { notFound, useRouter } from "next/navigation";
import { getGroupRole, parseGroupId, useGroup } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import {
  ExtremePlaceConfirm,
  isRouletteKind,
  parseRouletteId,
  useExtremeConflictRedirect,
  useRouletteResult,
} from "@/features/extreme-roulette";
import { isApiError } from "@/shared/api";
import { ErrorState, Screen, Toast } from "@/shared/ui";
import ExtremePlaceDetailSkeleton from "./extreme-place-detail-skeleton";
import { usePrefetchRoute } from "@/shared/lib";

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
  const { data: group } = useGroup(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  // 룰렛 돌리기·확정은 대표자만 함. 그룹을 불러오기 전에는 버튼을 보여주지 않음
  const isLeader = group !== undefined && getGroupRole(group, userId) === "leader";
  const {
    data: result,
    isPending,
    isError,
    error,
    refetch,
  } = useRouletteResult(groupId, rouletteId);
  const { isConflict, toastMessage } = useExtremeConflictRedirect(error, groupId);

  const navigateHref = `/groups/${groupId}/extreme/navigate/${rouletteId}`;
  const rouletteHref = `/groups/${groupId}/extreme/roulette/${kind}`;
  usePrefetchRoute(navigateHref);
  usePrefetchRoute(rouletteHref);

  function handleConfirmed() {
    router.push(navigateHref);
  }

  function handleClose() {
    router.push(rouletteHref);
  }

  function handleRetry() {
    void refetch();
  }

  if (isApiError(error, 404)) notFound();
  if (isConflict) return <Toast open={toastMessage !== null} message={toastMessage ?? ""} />;
  if (isPending) return <ExtremePlaceDetailSkeleton />;
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
        canConfirm={isLeader}
        onConfirmed={handleConfirmed}
        onClose={handleClose}
      />
    </main>
  );
}
