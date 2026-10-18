import type { KakaoMaps } from "./types";

const SDK_URL = "https://dapi.kakao.com/v2/maps/sdk.js";

let sdkPromise: Promise<KakaoMaps> | null = null;

function waitForMaps(maps: KakaoMaps): Promise<KakaoMaps> {
  return new Promise((resolve) => maps.load(() => resolve(maps)));
}

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
      sdkPromise = null;
      script.remove();
      reject(new Error("Failed to load Kakao Maps SDK"));
    };

    document.head.appendChild(script);
  });

  return sdkPromise;
}
