"use client";

import { useMemo, useState } from "react";
import type { TimelineStop } from "@/entities/journey";
import {
  PlaceDetailSheet,
  useNearbyPlaces,
  usePlaceDetailsMap,
  type Place,
} from "@/entities/place";
import { MapPinIcon, RecommendPinIcon } from "@/shared/assets";
import type { LatLng } from "@/shared/model";
import { RouteMap, MapOverlay, MapPolyline, type BottomSheetSnap } from "@/shared/ui";
import { toLocatedStops } from "../lib/located-stops";
import MapMarkerButton from "./map-marker-button";

/** 겹칠 때 위에 보일 순서 */
const Z_INDEX = { nearby: 1, route: 2, activeRoute: 3 } as const;

type LocatedPlace = Place & { location: LatLng };

type MapExplorerProps = {
  groupId: number;
  stops: TimelineStop[];
};

function hasLocation(place: Place): place is LocatedPlace {
  return place.location !== null;
}

export default function MapExplorer({ groupId, stops: allStops }: MapExplorerProps) {
  // 서버 좌표 캐시가 만료된 장소만 Google SDK로 좌표를 다시 받음
  const missingPlaceIds = useMemo(
    () => allStops.filter((stop) => stop.location === null).map((stop) => stop.placeId),
    [allStops],
  );
  const detailsById = usePlaceDetailsMap(missingPlaceIds);
  const stops = useMemo(() => toLocatedStops(allStops, detailsById), [allStops, detailsById]);

  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [previewPlace, setPreviewPlace] = useState<Place | null>(null);
  const [snap, setSnap] = useState<BottomSheetSnap>("peek");

  const activeStop = stops.find((stop) => stop.id === activeStopId) ?? null;
  // 기준 장소가 바뀌면 key가 바뀌어 이전 주변 추천 결과를 쓰지 않음
  const { data: nearby } = useNearbyPlaces(groupId, activeStop?.placeId ?? null);
  const nearbyPlaces = useMemo(
    () => (activeStop ? (nearby ?? []) : []).filter(hasLocation),
    [activeStop, nearby],
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
              label={`추천 장소 ${place.name ?? ""} 보기`}
              pressed={previewPlace?.id === place.id}
              onClick={() => handleNearbyMarkerClick(place)}
            >
              <RecommendPinIcon className="h-[32.24px] w-[22.76px]" />
            </MapMarkerButton>
          </MapOverlay>
        ))}
        {stops.map((stop, index) => {
          const isActive = stop.id === activeStopId;
          return (
            <MapOverlay
              key={stop.id}
              position={stop.location}
              zIndex={isActive ? Z_INDEX.activeRoute : Z_INDEX.route}
            >
              <MapMarkerButton
                label={`${index + 1}번째 장소 주변 추천 장소 보기`}
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
