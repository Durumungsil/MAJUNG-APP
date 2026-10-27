"use client";

import { notFound } from "next/navigation";
import type { Place } from "@/entities/place";
import { ExtremeRoulette, isRouletteKind } from "@/features/extreme-roulette";
import { Screen } from "@/shared/ui";

type ExtremeRoulettePageProps = {
  groupId: string;
  kind: string;
};

export default function ExtremeRoulettePage({ groupId, kind }: ExtremeRoulettePageProps) {
  if (!isRouletteKind(kind)) notFound();

  function getDetailHref(place: Place) {
    return `/groups/${groupId}/extreme/roulette/${kind}/${place.id}`;
  }

  return (
    <Screen className="justify-center">
      <ExtremeRoulette kind={kind} getDetailHref={getDetailHref} />
    </Screen>
  );
}
