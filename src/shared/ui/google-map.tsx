"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib";
import { useGoogleMap } from "@/shared/lib/use-google-map";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import MapLoadError from "./map-load-error";

/** 카카오 level 3과 비슷한 확대 수준 (zoom ≈ 20 − level) */
const DEFAULT_ZOOM = 17;

interface GoogleMapProps {
  center: LatLngLiteral;
  zoom?: number;
  /** 중심 좌표에 놓을 요소. 요소의 가운데가 좌표를 가리킴 */
  marker?: ReactNode;
  className?: string;
}

export default function GoogleMap({
  center,
  zoom = DEFAULT_ZOOM,
  marker,
  className,
}: GoogleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { loaded, failed } = useGoogleMap(containerRef);
  const [markerElement] = useState<HTMLDivElement | null>(() =>
    typeof document === "undefined" ? null : document.createElement("div"),
  );
  const hasMarker = Boolean(marker);

  useEffect(() => {
    if (!loaded) return;
    loaded.map.setOptions({ center: { lat: center.lat, lng: center.lng }, zoom });
  }, [loaded, center.lat, center.lng, zoom]);

  useEffect(() => {
    if (!loaded || !markerElement || !hasMarker) return;
    const advancedMarker = new loaded.libraries.marker.AdvancedMarkerElement({
      content: markerElement,
      position: { lat: center.lat, lng: center.lng },
      map: loaded.map,
    });
    return () => {
      advancedMarker.map = null;
    };
  }, [loaded, markerElement, hasMarker, center.lat, center.lng]);

  return (
    <div className={cn("bg-natural-300", className)}>
      {/* cn은 클래스를 병합하지 않으므로, 호출부의 absolute와 겹치지 않게 안쪽에서 relative를 둠 */}
      <div className="relative size-full overflow-hidden">
        <div ref={containerRef} className="absolute inset-0" />
        {failed && <MapLoadError />}
      </div>
      {loaded &&
        markerElement &&
        marker &&
        // AdvancedMarkerElement는 아래 가운데가 좌표이므로, 절반 내려 요소의 가운데가 좌표에 오게 함
        createPortal(<div className="w-max translate-y-1/2">{marker}</div>, markerElement)}
    </div>
  );
}
