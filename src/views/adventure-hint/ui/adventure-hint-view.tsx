"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCurrentMission, type MissionHint } from "@/entities/adventure";
import { getGroupRole, parseGroupId, useGroup } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import {
  formatRemainingHintTime,
  HintExpiredModal,
  DEFAULT_HINT_VIEW_SECONDS,
  HintIntroModal,
  useHintCountdown,
  useMissionHint,
  useReplaceMission,
} from "@/features/view-place-hint";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { TOAST_DURATION_MS, useToast } from "@/shared/lib";
import { Button, Spinner, Toast } from "@/shared/ui";
import KakaoRoadview, { type KakaoRoadviewStatus } from "@/shared/ui/kakao-roadview";

interface AdventureHintViewProps {
  groupId: string;
}

function getHintErrorMessage(error: unknown): string {
  if (isApiError(error, 404, 409)) return ERROR_MESSAGES.hintUnavailable;
  return ERROR_MESSAGES.requestFailed;
}

export default function AdventureHintView({ groupId: groupIdParam }: AdventureHintViewProps) {
  const groupId = parseGroupId(groupIdParam);
  if (groupId === null) notFound();

  const mapHref = `/groups/${groupId}/adventure/map`;
  const { data: mission, isPending: isMissionPending } = useCurrentMission(groupId);
  const { mutate: requestHint, isPending: isHintPending } = useMissionHint(groupId);
  const { mutate: replaceMission } = useReplaceMission(groupId);
  const { toastMessage, showToast } = useToast();
  const router = useRouter();
  const { data: group } = useGroup(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  const isMember = group !== undefined && getGroupRole(group, userId) === "member";
  /** 힌트 하나당 교체는 한 번만 요청함 */
  const replaceRequestedRef = useRef<MissionHint | null>(null);

  const [hint, setHint] = useState<MissionHint | null>(null);
  const [roadviewStatus, setRoadviewStatus] = useState<KakaoRoadviewStatus>("loading");
  // 서버가 내려준 표시 시간(view_seconds)으로 카운트다운함. 힌트를 받기 전에는 서버 기본값으로 안내
  const hintLimitSeconds = hint?.viewSeconds ?? DEFAULT_HINT_VIEW_SECONDS;
  const { remainingSeconds, isStarted, isExpired, start } = useHintCountdown(hintLimitSeconds);

  // 힌트는 대표자만 봄. 멤버가 주소로 들어오면 지도 화면으로 돌려보냄 (힌트 횟수가 중복으로 오르지 않게)
  useEffect(() => {
    if (isMember) router.replace(mapHref);
  }, [isMember, router, mapHref]);

  // 실제로 파노라마가 없을 때(empty)만 교체함. SDK 로드 실패 같은 지도 장애는 loading에 머물러 교체하지 않음
  useEffect(() => {
    if (roadviewStatus !== "empty" || hint === null || replaceRequestedRef.current === hint) return;
    replaceRequestedRef.current = hint;
    replaceMission(hint.missionId, {
      onSuccess: () => {
        // 교체된 미션은 시작·힌트 기록이 없으므로 지도 화면으로 돌아가 현재 위치에서 다시 시작함
        showToast(ERROR_MESSAGES.missionReplaced);
        setTimeout(() => router.replace(mapHref), TOAST_DURATION_MS);
      },
      onError: (error) =>
        showToast(
          isApiError(error, 409)
            ? ERROR_MESSAGES.missionReplaceUnavailable
            : ERROR_MESSAGES.requestFailed,
        ),
    });
  }, [roadviewStatus, hint, replaceMission, showToast, router, mapHref]);

  function handleHintStartClick() {
    if (isMember) return;
    if (mission == null) {
      showToast(ERROR_MESSAGES.noCurrentMission);
      return;
    }
    requestHint(mission.id, {
      onSuccess: (result) => {
        setHint(result);
        start();
      },
      onError: (error) => showToast(getHintErrorMessage(error)),
    });
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 flex-col items-center px-page pt-[max(--spacing(16),calc(--spacing(5)+var(--safe-top)))] pb-4">
        <h1 className="text-point text-primary-400">ADVENTURE MODE</h1>
        <p className="text-s text-text-primary">{formatRemainingHintTime(remainingSeconds)}</p>
      </header>

      <section className="relative min-h-0 flex-1 bg-natural-500">
        {isStarted && !isExpired && (
          <>
            <KakaoRoadview
              position={hint?.location ?? null}
              onStatusChange={setRoadviewStatus}
              className="absolute inset-0"
            />
            {roadviewStatus === "loading" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Spinner />
                <p className="text-l text-white">힌트 장소를 불러오는 중이에요</p>
              </div>
            )}
            {roadviewStatus === "empty" && (
              <p className="absolute inset-0 flex items-center justify-center text-l text-white">
                로드뷰 사진이 없는 장소예요
              </p>
            )}
          </>
        )}
      </section>

      <nav className="flex shrink-0 flex-col px-page pt-4 pb-[max(--spacing(7.5),var(--safe-bottom))]">
        {/* 뒤로 가기로 힌트 화면에 돌아오지 않도록 replace로 이동 (다시 들어오면 힌트 횟수가 또 오름) */}
        <Button href={mapHref} replace size="xl">
          힌트 종료하기
        </Button>
      </nav>

      <HintIntroModal
        open={!isStarted}
        limitSeconds={hintLimitSeconds}
        cancelHref={mapHref}
        onStartClick={handleHintStartClick}
        isStarting={isMissionPending || isHintPending}
      />
      <HintExpiredModal open={isExpired} backHref={mapHref} />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </main>
  );
}
