"use client";

import { notFound, useRouter } from "next/navigation";
import {
  ExtremePlaceConfirm,
  findRouletteCandidate,
  isRouletteKind,
} from "@/features/extreme-roulette";

type ExtremePlaceDetailPageProps = {
  groupId: string;
  kind: string;
  placeId: string;
};

export default function ExtremePlaceDetailPage({
  groupId,
  kind,
  placeId,
}: ExtremePlaceDetailPageProps) {
  const router = useRouter();

  if (!isRouletteKind(kind)) notFound();
  const place = findRouletteCandidate(kind, Number(placeId));
  if (!place) notFound();

  function handleConfirmed() {
    router.push(`/groups/${groupId}/extreme/play`);
  }

  function handleClose() {
    router.push(`/groups/${groupId}/extreme/roulette/${kind}`);
  }

  return (
    <main className="flex flex-1 flex-col">
      <ExtremePlaceConfirm
        kind={kind}
        place={place}
        onConfirmed={handleConfirmed}
        onClose={handleClose}
      />
    </main>
  );
}
