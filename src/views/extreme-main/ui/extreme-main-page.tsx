"use client";

import { notFound } from "next/navigation";
import { parseGroupId } from "@/entities/group";
import { ExtremeBoard, type RouletteKind } from "@/features/extreme-roulette";
import { ModeTitle, Screen } from "@/shared/ui";

type ExtremeMainPageProps = {
  groupId: string;
};

export default function ExtremeMainPage({ groupId: groupIdParam }: ExtremeMainPageProps) {
  const groupId = parseGroupId(groupIdParam);
  if (groupId === null) notFound();

  function getRouletteHref(kind: RouletteKind) {
    return `/groups/${groupId}/extreme/roulette/${kind}`;
  }

  return (
    <Screen>
      <ModeTitle className="mt-7.75">EXTREME MODE</ModeTitle>
      <div className="mt-12 flex flex-1 flex-col">
        <ExtremeBoard
          groupId={groupId}
          getRouletteHref={getRouletteHref}
          exitHref={`/groups/${groupId}`}
        />
      </div>
    </Screen>
  );
}
