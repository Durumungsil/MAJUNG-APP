"use client";

import { useEffect, useRef, useState } from "react";
import { getKakaoMaps } from "@/shared/lib/kakao-maps";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import KakaoSdkLoader from "./kakao-sdk-loader";

const PANORAMA_SEARCH_RADIUS_METERS = 50;

export type KakaoRoadviewStatus = "loading" | "ready" | "empty";

interface KakaoRoadviewProps {
  position: LatLngLiteral | null;
  onStatusChange?: (status: KakaoRoadviewStatus) => void;
  className?: string;
}

export default function KakaoRoadview({ position, onStatusChange, className }: KakaoRoadviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const lat = position?.lat ?? null;
  const lng = position?.lng ?? null;

  function handleSdkReady() {
    setIsSdkReady(true);
  }

  useEffect(() => {
    const maps = getKakaoMaps();
    const container = containerRef.current;
    if (!isSdkReady || !maps || !container) return;
    if (lat === null || lng === null) {
      onStatusChange?.("empty");
      return;
    }

    let isCancelled = false;
    const roadview = new maps.Roadview(container);
    const latLng = new maps.LatLng(lat, lng);
    onStatusChange?.("loading");

    new maps.RoadviewClient().getNearestPanoId(latLng, PANORAMA_SEARCH_RADIUS_METERS, (panoId) => {
      if (isCancelled) return;
      if (panoId === null) {
        onStatusChange?.("empty");
        return;
      }
      maps.event.addListener(roadview, "init", () => {
        if (!isCancelled) onStatusChange?.("ready");
      });
      roadview.setPanoId(panoId, latLng);
    });

    return () => {
      isCancelled = true;
      container.replaceChildren();
    };
  }, [isSdkReady, lat, lng, onStatusChange]);

  return (
    <>
      <KakaoSdkLoader onReady={handleSdkReady} />
      <div ref={containerRef} className={className} />
    </>
  );
}
