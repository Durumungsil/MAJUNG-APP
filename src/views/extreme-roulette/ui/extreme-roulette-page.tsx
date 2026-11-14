"use client";

import { notFound } from "next/navigation";
import {
  getGroupRole,
  GROUP_POLL_INTERVAL_MS,
  parseGroupId,
  useGroupByParam,
  type Group,
} from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import {
  ExtremeRoulette,
  getSpinBlock,
  isRouletteKind,
  type RouletteResult,
} from "@/features/extreme-roulette";
import { ModeTitle, Screen } from "@/shared/ui";

function getSurveyPollInterval(group: Group | undefined) {
  return group !== undefined && getSpinBlock(group, true) === "survey"
    ? GROUP_POLL_INTERVAL_MS
    : false;
}

type ExtremeRoulettePageProps = {
  groupId: string;
  kind: string;
};

export default function ExtremeRoulettePage({
  groupId: groupIdParam,
  kind,
}: ExtremeRoulettePageProps) {
  if (!isRouletteKind(kind)) notFound();
  // 다른 멤버가 설문을 내도 이 화면의 그룹 캐시는 그대로라, 설문 때문에 막혀 있는 동안은 주기적으로 다시 조회함
  const { data: group } = useGroupByParam(groupIdParam, getSurveyPollInterval);
  // 형식이 틀린 ID는 useGroupByParam이 404로 보냄
  const groupId = parseGroupId(groupIdParam) ?? 0;
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
