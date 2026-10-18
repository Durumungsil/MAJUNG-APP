import type { KakaoMaps } from "./types";

const SDK_URL = "https://dapi.kakao.com/v2/maps/sdk.js";

let sdkPromise: Promise<KakaoMaps> | null = null;

function waitForMaps(maps: KakaoMaps): Promise<KakaoMaps> {
  return new Promise((resolve) => maps.load(() => resolve(maps)));
}

/** 카카오맵 SDK 스크립트를 한 번만 넣고, 준비된 kakao.maps를 돌려줌 (브라우저 전용) */
export function loadKakaoMapSdk(appKey: string): Promise<KakaoMaps> {
  if (window.kakao?.maps) return waitForMaps(window.kakao.maps);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<KakaoMaps>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${SDK_URL}?appkey=${encodeURIComponent(appKey)}&autoload=false`;
    script.async = true;

    script.onload = () => {
      const maps = window.kakao?.maps;
      if (maps) waitForMaps(maps).then(resolve);
      else reject(new Error("kakao.maps is not available"));
    };
    script.onerror = () => {
      // 실패하면 다음 시도에서 스크립트를 다시 넣을 수 있게 초기화
      sdkPromise = null;
      script.remove();
      reject(new Error("Failed to load Kakao Maps SDK"));
    };

    document.head.appendChild(script);
  });

  return sdkPromise;
}
