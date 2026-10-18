"use client";

import { createContext, useContext } from "react";
import type { KakaoMap, KakaoMaps } from "@/shared/lib/kakao-map";

type KakaoMapContextValue = {
  maps: KakaoMaps;
  map: KakaoMap;
};

export const KakaoMapContext = createContext<KakaoMapContextValue | null>(null);

export function useKakaoMapContext(): KakaoMapContextValue {
  const value = useContext(KakaoMapContext);
  if (!value) throw new Error("KakaoMap 안에서만 사용할 수 있어요");
  return value;
}
