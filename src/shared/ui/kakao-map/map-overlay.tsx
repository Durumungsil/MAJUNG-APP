"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { LatLng } from "@/shared/model";
import { useKakaoMapContext } from "./kakao-map-context";

type MapOverlayProps = {
  position: LatLng;
  zIndex?: number;
  /** 지도 좌표에 놓을 React 요소. 아래 가운데가 좌표를 가리킴 */
  children: ReactNode;
};

/** 카카오맵 CustomOverlay 위에 React 요소를 그림 */
export default function MapOverlay({ position, zIndex = 0, children }: MapOverlayProps) {
  const { maps, map } = useKakaoMapContext();
  const [container] = useState(() => document.createElement("div"));
  const { lat, lng } = position;

  useEffect(() => {
    const overlay = new maps.CustomOverlay({
      content: container,
      position: new maps.LatLng(lat, lng),
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex,
      clickable: true,
    });
    overlay.setMap(map);
    return () => overlay.setMap(null);
  }, [maps, map, container, lat, lng, zIndex]);

  return createPortal(children, container);
}
