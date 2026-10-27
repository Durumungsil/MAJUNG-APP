"use client";

import { notFound } from "next/navigation";
import { parseGroupId } from "@/entities/group";
import { ExtremeRoulette, isRouletteKind, type RouletteResult } from "@/features/extreme-roulette";
import { Screen } from "@/shared/ui";

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

  function getDetailHref(result: RouletteResult) {
    return `/groups/${groupId}/extreme/roulette/${kind}/${result.id}`;
  }

  return (
    <Screen className="justify-center">
      <ExtremeRoulette groupId={groupId} kind={kind} getDetailHref={getDetailHref} />
    </Screen>
  );
}
