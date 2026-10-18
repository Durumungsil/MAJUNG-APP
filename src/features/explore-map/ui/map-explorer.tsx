"use client";

import { useMemo, useState } from "react";
import type { TimelineStop } from "@/entities/journey";
import { PlaceDetailSheet, getNearbyPlaces, type Place } from "@/entities/place";
import { MapPinIcon, RecommendPinIcon } from "@/shared/assets";
import { RouteMap, MapOverlay, MapPolyline, type BottomSheetSnap } from "@/shared/ui";
import MapMarkerButton from "./map-marker-button";

/** 겹칠 때 위에 보일 순서 */
const Z_INDEX = { nearby: 1, route: 2, activeRoute: 3 } as const;

type MapExplorerProps = {
  stops: TimelineStop[];
};

export default function MapExplorer({ stops }: MapExplorerProps) {
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [previewPlace, setPreviewPlace] = useState<Place | null>(null);
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");

  const activeStop = stops.find((stop) => stop.id === activeStopId) ?? null;
  const nearbyPlaces = useMemo(
    () => (activeStop ? getNearbyPlaces(activeStop.location) : []),
    [activeStop],
  );
  const routePath = useMemo(() => stops.map((stop) => stop.location), [stops]);

  function handleStopMarkerClick(stopId: string) {
    setActiveStopId((prev) => (prev === stopId ? null : stopId));
    setPreviewPlace(null);
  }

  function handleNearbyMarkerClick(place: Place) {
    setPreviewPlace(place);
    setSnap("peek");
  }

  function handleSheetClose() {
    setPreviewPlace(null);
  }

  // TODO: 일정에 장소 추가 API 연동
  function handlePlaceSelect() {
    setPreviewPlace(null);
  }

  return (
    <>
      <RouteMap fitPoints={routePath} label="여행 일정 지도" className="aspect-[402/674] w-full">
        <MapPolyline path={routePath} colorClassName="text-primary-700" />
        {nearbyPlaces.map((place) => (
          <MapOverlay key={place.id} position={place.location} zIndex={Z_INDEX.nearby}>
            <MapMarkerButton
              label={`추천 장소 ${place.name} 보기`}
              pressed={previewPlace?.id === place.id}
              onClick={() => handleNearbyMarkerClick(place)}
            >
              <RecommendPinIcon className="h-[32.24px] w-[22.76px]" />
            </MapMarkerButton>
          </MapOverlay>
        ))}
        {stops.map((stop) => {
          const isActive = stop.id === activeStopId;
          return (
            <MapOverlay
              key={stop.id}
              position={stop.location}
              zIndex={isActive ? Z_INDEX.activeRoute : Z_INDEX.route}
            >
              <MapMarkerButton
                label={`${stop.placeName} 주변 추천 장소 보기`}
                pressed={isActive}
                onClick={() => handleStopMarkerClick(stop.id)}
              >
                <MapPinIcon
                  variant={isActive ? "active" : "default"}
                  className="h-[47.78px] w-[33.72px]"
                />
              </MapMarkerButton>
            </MapOverlay>
          );
        })}
      </RouteMap>
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
