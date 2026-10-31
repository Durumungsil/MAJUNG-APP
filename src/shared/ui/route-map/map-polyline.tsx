"use client";

import { useEffect, useRef } from "react";
import type { LatLng } from "@/shared/model";
import { useRouteMapContext } from "./route-map-context";

type MapPolylineProps = {
  path: LatLng[];
  /** 선 색을 정할 디자인 토큰 클래스 (예: text-primary-700) */
  colorClassName: string;
  strokeWeight?: number;
};

export default function MapPolyline({ path, colorClassName, strokeWeight = 4 }: MapPolylineProps) {
  const { libraries, map } = useRouteMapContext();
  // 구글 Maps SDK는 색 문자열만 받으므로, 토큰 클래스를 단 요소에서 계산된 색을 읽어 넘김
  const colorProbeRef = useRef<HTMLSpanElement>(null);
  const pathKey = path.map(({ lat, lng }) => `${lat},${lng}`).join("|");

  useEffect(() => {
    const probe = colorProbeRef.current;
    if (!probe || !pathKey) return;

    const polyline = new libraries.maps.Polyline({
      path: pathKey.split("|").map((pair) => {
        const [lat, lng] = pair.split(",").map(Number);
        return { lat, lng };
      }),
      strokeWeight,
      strokeColor: getComputedStyle(probe).color,
      strokeOpacity: 1,
      map,
    });
    return () => polyline.setMap(null);
  }, [libraries, map, pathKey, strokeWeight, colorClassName]);

  return <span ref={colorProbeRef} aria-hidden className={`hidden ${colorClassName}`} />;
}
