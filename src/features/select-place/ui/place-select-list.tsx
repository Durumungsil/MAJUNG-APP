"use client";

import { useState } from "react";
import { PlaceCard, PlaceDetailSheet, type Place } from "@/entities/place";
import { Button, type BottomSheetSnap } from "@/shared/ui";

type PlaceSelectListProps = {
  places: Place[];
  nextHref: string;
};

export default function PlaceSelectList({ places, nextHref }: PlaceSelectListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewPlace, setPreviewPlace] = useState<Place | null>(null);
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");

  function handlePlaceClick(place: Place) {
    setPreviewPlace(place);
    setSnap("peek");
  }

  function handleSheetClose() {
    setPreviewPlace(null);
  }

  function handlePlaceSelect(place: Place) {
    setSelectedIds((prev) => new Set(prev).add(place.id));
    setPreviewPlace(null);
  }

  return (
    <>
      <ul className="flex flex-col gap-5">
        {places.map((place) => (
          <li key={place.id}>
            <PlaceCard
              place={place}
              selected={selectedIds.has(place.id) || previewPlace?.id === place.id}
              onClick={() => handlePlaceClick(place)}
            />
          </li>
        ))}
      </ul>
      <Button size="xl" href={nextHref} className="mt-10">
        타임라인 생성하기
      </Button>
      <PlaceDetailSheet
        place={previewPlace}
        snap={snap}
        onSnapChange={setSnap}
        onClose={handleSheetClose}
        onSelect={handlePlaceSelect}
      />
    </>
  );
}
