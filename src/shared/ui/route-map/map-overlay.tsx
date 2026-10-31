"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { LatLng } from "@/shared/model";
import { useRouteMapContext } from "./route-map-context";

type MapOverlayProps = {
  position: LatLng;
  zIndex?: number;
  /** 지도 좌표에 놓을 React 요소. 아래 가운데가 좌표를 가리킴 */
  children: ReactNode;
};

/** 구글 AdvancedMarkerElement 위에 React 요소를 그림 (기본 기준점이 아래 가운데) */
export default function MapOverlay({ position, zIndex = 0, children }: MapOverlayProps) {
  const { libraries, map } = useRouteMapContext();
  const [container] = useState(() => document.createElement("div"));
  const { lat, lng } = position;

  useEffect(() => {
    const marker = new libraries.marker.AdvancedMarkerElement({
      content: container,
      position: { lat, lng },
      zIndex,
      map,
    });
    return () => {
      marker.map = null;
    };
  }, [libraries, map, container, lat, lng, zIndex]);

  return createPortal(children, container);
}
