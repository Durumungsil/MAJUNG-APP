"use client";

import { ExtremeBoard, type RouletteKind } from "@/features/extreme-roulette";
import { ModeTitle, Screen } from "@/shared/ui";

type ExtremeMainPageProps = {
  groupId: string;
};

export default function ExtremeMainPage({ groupId }: ExtremeMainPageProps) {
  function getRouletteHref(kind: RouletteKind) {
    return `/groups/${groupId}/extreme/roulette/${kind}`;
  }

  return (
    <Screen>
      <ModeTitle className="mt-7.75">EXTREME MODE</ModeTitle>
      <div className="mt-12 flex flex-1 flex-col">
        <ExtremeBoard getRouletteHref={getRouletteHref} exitHref={`/groups/${groupId}`} />
      </div>
    </Screen>
  );
}
