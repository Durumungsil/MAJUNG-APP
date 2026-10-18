"use client";

import { createContext, useContext } from "react";
import type { KakaoMap, KakaoMapsNamespace as KakaoMaps } from "@/shared/lib/kakao-maps";

type RouteMapContextValue = {
  maps: KakaoMaps;
  map: KakaoMap;
};

export const RouteMapContext = createContext<RouteMapContextValue | null>(null);

export function useRouteMapContext(): RouteMapContextValue {
  const value = useContext(RouteMapContext);
  if (!value) throw new Error("RouteMap 안에서만 사용할 수 있어요");
  return value;
}
