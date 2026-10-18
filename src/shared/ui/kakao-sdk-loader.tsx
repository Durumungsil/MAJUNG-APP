"use client";

import Script from "next/script";
import { KAKAO_MAP_APP_KEY } from "@/shared/config/env";
import { getKakaoMaps, getKakaoMapsSdkUrl } from "@/shared/lib/kakao-maps";

interface KakaoSdkLoaderProps {
  onReady: () => void;
}

export default function KakaoSdkLoader({ onReady }: KakaoSdkLoaderProps) {
  function handleScriptReady() {
    getKakaoMaps()?.load(onReady);
  }

  if (!KAKAO_MAP_APP_KEY) return null;

  return (
    <Script
      src={getKakaoMapsSdkUrl(KAKAO_MAP_APP_KEY)}
      strategy="afterInteractive"
      onReady={handleScriptReady}
    />
  );
}
