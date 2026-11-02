"use client";

import { notFound } from "next/navigation";
import { getGroupRole, parseGroupId, useGroup } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { useEndModeExit } from "@/features/end-mode";
import { ExtremeBoard, type RouletteKind } from "@/features/extreme-roulette";
import { ModeTitle, Screen, Toast } from "@/shared/ui";

type ExtremeMainPageProps = {
  groupId: string;
};

export default function ExtremeMainPage({ groupId: groupIdParam }: ExtremeMainPageProps) {
  const groupId = parseGroupId(groupIdParam);
  if (groupId === null) notFound();
  const { data: group } = useGroup(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  // 룰렛 돌리기·확정은 대표자만 함. 그룹을 불러오기 전에는 버튼을 보여주지 않음
  const isLeader = group !== undefined && getGroupRole(group, userId) === "leader";
  const { exit, isExiting, toastMessage } = useEndModeExit({ groupId, isLeader });

  function getRouletteHref(kind: RouletteKind) {
    return `/groups/${groupId}/extreme/roulette/${kind}`;
  }

  return (
    <Screen>
      <ModeTitle className="mt-7.75">EXTREME MODE</ModeTitle>
      <div className="mt-12 flex flex-1 flex-col">
        <ExtremeBoard
          groupId={groupId}
          canSpin={isLeader}
          getRouletteHref={getRouletteHref}
          onExit={exit}
          isExiting={isExiting}
        />
      </div>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </Screen>
  );
}
