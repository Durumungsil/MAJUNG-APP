"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { useAdventureStore, useCurrentMission, type MissionHint } from "@/entities/adventure";
import { parseGroupId } from "@/entities/group";
import {
  formatRemainingHintTime,
  HintExpiredModal,
  HINT_VIEW_SECONDS,
  HintIntroModal,
  useHintCountdown,
  useMissionHint,
} from "@/features/view-place-hint";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
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
  const setHintTarget = useAdventureStore((state) => state.setHintTarget);
  const { toastMessage, showToast } = useToast();

  const [hint, setHint] = useState<MissionHint | null>(null);
  const [roadviewStatus, setRoadviewStatus] = useState<KakaoRoadviewStatus>("loading");
  const { remainingSeconds, isStarted, isExpired, start } = useHintCountdown(HINT_VIEW_SECONDS);

  function handleHintStartClick() {
    if (mission == null) {
      showToast(ERROR_MESSAGES.noCurrentMission);
      return;
    }
    requestHint(mission.id, {
      onSuccess: (result) => {
        setHint(result);
        setHintTarget({ missionId: result.missionId, location: result.location });
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
        limitSeconds={HINT_VIEW_SECONDS}
        cancelHref={mapHref}
        onStartClick={handleHintStartClick}
        isStarting={isMissionPending || isHintPending}
      />
      <HintExpiredModal open={isExpired} backHref={mapHref} />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </main>
  );
}
