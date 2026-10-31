"use client";

import { useEffect, useState, type RefObject } from "react";
import { GOOGLE_MAP_ID } from "@/shared/config/env";
import {
  hasGoogleMapsConfig,
  loadGoogleMaps,
  subscribeGoogleMapsAuthFailure,
  type GoogleMapsLibraries,
} from "./google-maps";

export type LoadedGoogleMap = {
  map: google.maps.Map;
  libraries: GoogleMapsLibraries;
};

type UseGoogleMapResult = {
  loaded: LoadedGoogleMap | null;
  /** SDK 로드 실패, 키 인증 실패, 키·지도 ID 없음 */
  failed: boolean;
};

/** 컨테이너에 구글 지도를 만듦. 중심·확대 수준은 지도가 만들어진 뒤 쓰는 쪽에서 정함 */
export function useGoogleMap(containerRef: RefObject<HTMLDivElement | null>): UseGoogleMapResult {
  const [loaded, setLoaded] = useState<LoadedGoogleMap | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const isConfigured = hasGoogleMapsConfig();

  useEffect(() => {
    const container = containerRef.current;
    if (!isConfigured || !container) return;

    let isCancelled = false;
    function handleFailure() {
      if (!isCancelled) setLoadFailed(true);
    }
    const unsubscribe = subscribeGoogleMapsAuthFailure(handleFailure);

    loadGoogleMaps()
      .then((libraries) => {
        if (isCancelled) return;
        const map = new libraries.maps.Map(container, {
          mapId: GOOGLE_MAP_ID,
          // 카카오맵처럼 지도 위 기본 버튼 없이, 한 손가락으로 움직이고, 구글 장소 아이콘은 눌리지 않게 함
          disableDefaultUI: true,
          gestureHandling: "greedy",
          clickableIcons: false,
        });
        setLoaded({ map, libraries });
      })
      .catch(handleFailure);

    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, [containerRef, isConfigured]);

  return { loaded, failed: !isConfigured || loadFailed };
}
