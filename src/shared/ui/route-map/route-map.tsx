"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import { getBoundsLiteral } from "@/shared/lib/google-maps";
import { useGoogleMap } from "@/shared/lib/use-google-map";
import type { LatLng } from "@/shared/model";
import MapLoadError from "../map-load-error";
import { RouteMapContext } from "./route-map-context";

/** 카카오 level 5와 비슷한 확대 수준 (zoom ≈ 20 − level) */
const DEFAULT_ZOOM = 15;
/** 지도 생성 직후 fitPoints 범위로 옮기므로 첫 화면에는 보이지 않는 임시 중심 (서울시청) */
const DEFAULT_CENTER: LatLng = { lat: 37.5665, lng: 126.978 };
const BOUNDS_PADDING_PX = 48;

type RouteMapProps = {
  /** 모두 화면 안에 들어오도록 맞출 좌표들 */
  fitPoints: LatLng[];
  label: string;
  className?: string;
  /** MapOverlay, MapPolyline 등 지도 위 요소 */
  children?: ReactNode;
};

function serializePoints(points: LatLng[]): string {
  return points.map(({ lat, lng }) => `${lat},${lng}`).join("|");
}

function deserializePoints(key: string): LatLng[] {
  if (!key) return [];
  return key.split("|").map((pair) => {
    const [lat, lng] = pair.split(",").map(Number);
    return { lat, lng };
  });
}

export default function RouteMap({ fitPoints, label, className, children }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { loaded, failed } = useGoogleMap(containerRef);

  // 배열 참조가 아니라 좌표 내용이 바뀔 때만 범위를 다시 맞추기 위한 키
  const fitKey = serializePoints(fitPoints);

  useEffect(() => {
    if (!loaded) return;
    const bounds = getBoundsLiteral(deserializePoints(fitKey));
    if (bounds) loaded.map.fitBounds(bounds, BOUNDS_PADDING_PX);
    else loaded.map.setOptions({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
  }, [loaded, fitKey]);

  return (
    <div className={cn("relative overflow-hidden bg-natural-300", className)}>
      <div ref={containerRef} role="region" aria-label={label} className="absolute inset-0" />
      {!loaded && !failed && (
        <div aria-hidden className="absolute inset-0 animate-pulse bg-natural-300" />
      )}
      {failed && <MapLoadError />}
      {loaded && <RouteMapContext value={loaded}>{children}</RouteMapContext>}
    </div>
  );
}
