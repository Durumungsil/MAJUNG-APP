"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { KAKAO_MAP_APP_KEY } from "@/shared/config/env";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { cn } from "@/shared/lib";
import {
  getKakaoMaps,
  type KakaoMap as KakaoMapInstance,
  type KakaoMapsNamespace as KakaoMaps,
} from "@/shared/lib/kakao-maps";
import type { LatLng } from "@/shared/model";
import KakaoSdkLoader from "../kakao-sdk-loader";
import { RouteMapContext } from "./route-map-context";

const DEFAULT_LEVEL = 5;
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

type LoadedMap = { maps: KakaoMaps; map: KakaoMapInstance };

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
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [loaded, setLoaded] = useState<LoadedMap | null>(null);
  const [failed, setFailed] = useState(false);

  // 배열 참조가 아니라 좌표 내용이 바뀔 때만 범위를 다시 맞추기 위한 키
  const fitKey = serializePoints(fitPoints);

  function handleSdkReady() {
    setIsSdkReady(true);
  }

  function handleSdkError() {
    setFailed(true);
  }

  useEffect(() => {
    const maps = getKakaoMaps();
    const container = containerRef.current;
    if (!isSdkReady || !maps || !container) return;
    const map = new maps.Map(container, {
      center: new maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
      level: DEFAULT_LEVEL,
    });
    setLoaded({ maps, map });
  }, [isSdkReady]);

  useEffect(() => {
    const points = deserializePoints(fitKey);
    if (!loaded || points.length === 0) return;
    const { maps, map } = loaded;
    const bounds = new maps.LatLngBounds();
    points.forEach(({ lat, lng }) => bounds.extend(new maps.LatLng(lat, lng)));
    map.setBounds(
      bounds,
      BOUNDS_PADDING_PX,
      BOUNDS_PADDING_PX,
      BOUNDS_PADDING_PX,
      BOUNDS_PADDING_PX,
    );
  }, [loaded, fitKey]);

  // next/script는 실패한 src를 캐시해 같은 화면에서 다시 불러오지 않으므로 새로고침으로 재시도
  function handleRetryClick() {
    window.location.reload();
  }

  const showError = failed || !KAKAO_MAP_APP_KEY;

  return (
    <div className={cn("relative overflow-hidden bg-natural-300", className)}>
      <KakaoSdkLoader onReady={handleSdkReady} onError={handleSdkError} />
      <div ref={containerRef} role="region" aria-label={label} className="absolute inset-0" />
      {!loaded && !showError && (
        <div aria-hidden className="absolute inset-0 animate-pulse bg-natural-300" />
      )}
      {showError && (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-s text-text-secondary"
        >
          <p>{ERROR_MESSAGES.mapLoadFailed}</p>
          {KAKAO_MAP_APP_KEY && (
            <button
              type="button"
              onClick={handleRetryClick}
              className="rounded-lg bg-primary-300 px-4 py-1 text-xs text-black"
            >
              다시 시도
            </button>
          )}
        </div>
      )}
      {loaded && <RouteMapContext value={loaded}>{children}</RouteMapContext>}
    </div>
  );
}
