"use client";

import { useEffect, useState } from "react";
import type { Place } from "@/entities/place";
import { MapPinIcon } from "@/shared/assets";
import CurrentLocationMarker from "@/shared/assets/markers/current-location-marker";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { useCurrentPosition } from "@/shared/lib/use-current-position";
import type { LatLng } from "@/shared/model";
import { Button, MapOverlay, MapPolyline, RouteMap, Toast } from "@/shared/ui";
import { getFocusPoints } from "../lib/focus-points";

/** 겹칠 때 위에 보일 순서 */
const Z_INDEX = { destination: 1, current: 2 } as const;

type ExtremeNavigationProps = {
  place: Place;
  /** 길 안내 종료 후 이동할 경로 */
  exitHref: string;
};

/** 확정한 장소까지 길 안내. 현재 위치와 목적지를 지도에 표시하고 다른 모드처럼 직선 경로로 이어 줌 */
export default function ExtremeNavigation({ place, exitHref }: ExtremeNavigationProps) {
  const { position, status } = useCurrentPosition();
  const { toastMessage, showToast } = useToast();
  // 위치가 바뀔 때마다 지도 범위를 다시 맞추면 사용자가 옮긴 지도가 튀므로 처음 받은 위치로만 맞춤
  const [fitOrigin, setFitOrigin] = useState<LatLng | null>(null);
  if (position && !fitOrigin) setFitOrigin(position);

  const destination = place.location;
  const fitPoints = fitOrigin ? [fitOrigin, destination] : getFocusPoints(destination);
  const locationFailed = status === "denied" || status === "unavailable";

  useEffect(() => {
    if (locationFailed) showToast(ERROR_MESSAGES.currentLocationUnavailable);
  }, [locationFailed, showToast]);

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <section className="relative min-h-0 flex-1">
        <RouteMap
          fitPoints={fitPoints}
          label={`${place.name}까지 길 안내 지도`}
          className="absolute inset-0"
        >
          {position && (
            <MapPolyline path={[position, destination]} colorClassName="text-primary-700" />
          )}
          <MapOverlay position={destination} zIndex={Z_INDEX.destination}>
            <MapPinIcon variant="active" className="h-[47.78px] w-[33.72px]" />
          </MapOverlay>
          {position && (
            <MapOverlay position={position} zIndex={Z_INDEX.current}>
              {/* 오버레이는 아래 가운데가 좌표이므로, 원형 마커는 절반 내려 가운데가 좌표에 오게 함 */}
              <div className="translate-y-1/2">
                <CurrentLocationMarker />
              </div>
            </MapOverlay>
          )}
        </RouteMap>
      </section>
      <nav className="flex shrink-0 flex-col px-8 pt-8 pb-[max(--spacing(7.5),var(--safe-bottom))]">
        <Button size="xl" href={exitHref}>
          길 안내 종료하기
        </Button>
      </nav>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </main>
  );
}
