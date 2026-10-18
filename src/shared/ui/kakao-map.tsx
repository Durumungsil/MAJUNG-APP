"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getKakaoMaps, type KakaoMap as KakaoMapInstance } from "@/shared/lib/kakao-maps";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import KakaoSdkLoader from "./kakao-sdk-loader";

interface KakaoMapProps {
  center: LatLngLiteral;
  level?: number;
  marker?: ReactNode;
  className?: string;
}

export default function KakaoMap({ center, level = 3, marker, className }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  const [markerElement] = useState<HTMLDivElement | null>(() =>
    typeof document === "undefined" ? null : document.createElement("div"),
  );
  const hasMarker = Boolean(marker);

  function handleSdkReady() {
    setIsSdkReady(true);
  }

  useEffect(() => {
    const maps = getKakaoMaps();
    if (!isSdkReady || !maps || !containerRef.current) return;
    setMap(new maps.Map(containerRef.current, { center: new maps.LatLng(0, 0) }));
  }, [isSdkReady]);

  useEffect(() => {
    const maps = getKakaoMaps();
    if (!map || !maps) return;
    map.setCenter(new maps.LatLng(center.lat, center.lng));
    map.setLevel(level);
  }, [map, center.lat, center.lng, level]);

  useEffect(() => {
    const maps = getKakaoMaps();
    if (!map || !maps || !markerElement || !hasMarker) return;
    const overlay = new maps.CustomOverlay({
      position: new maps.LatLng(center.lat, center.lng),
      content: markerElement,
      xAnchor: 0.5,
      yAnchor: 0.5,
      map,
    });
    return () => overlay.setMap(null);
  }, [map, markerElement, hasMarker, center.lat, center.lng]);

  return (
    <>
      <KakaoSdkLoader onReady={handleSdkReady} />
      <div ref={containerRef} className={`bg-natural-300 ${className ?? ""}`} />
      {map &&
        markerElement &&
        marker &&
        createPortal(<div className="w-max">{marker}</div>, markerElement)}
    </>
  );
}
