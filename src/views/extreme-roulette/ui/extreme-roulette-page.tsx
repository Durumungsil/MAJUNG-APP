"use client";

import { notFound } from "next/navigation";
import { getGroupRole, parseGroupId, useGroup } from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import {
  ExtremeRoulette,
  getSpinBlock,
  isRouletteKind,
  type RouletteResult,
} from "@/features/extreme-roulette";
import { ModeTitle, Screen } from "@/shared/ui";

type ExtremeRoulettePageProps = {
  groupId: string;
  kind: string;
};

export default function ExtremeRoulettePage({
  groupId: groupIdParam,
  kind,
}: ExtremeRoulettePageProps) {
  const groupId = parseGroupId(groupIdParam);
  if (groupId === null || !isRouletteKind(kind)) notFound();
  const { data: group } = useGroup(groupId);
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  // 룰렛 돌리기·확정은 대표자만 함. 그룹을 불러오기 전에는 버튼을 보여주지 않음
  const isLeader = group !== undefined && getGroupRole(group, userId) === "leader";
  const spinBlock = getSpinBlock(group, isLeader);

  function getDetailHref(result: RouletteResult) {
    return `/groups/${groupId}/extreme/roulette/${kind}/${result.id}`;
  }

  return (
    <Screen>
      <ModeTitle className="mt-7.75">EXTREME MODE</ModeTitle>
      <div className="mt-7.75">
        <ExtremeRoulette
          groupId={groupId}
          kind={kind}
          spinBlock={spinBlock}
          getDetailHref={getDetailHref}
        />
      </div>
    </Screen>
  );
}
