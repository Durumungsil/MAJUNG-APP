/**
 * 카카오맵 JS SDK 중 마중에서 쓰는 부분만 옮긴 타입. 지도는 구글로 옮겨 로드뷰만 남음
 * 구글 약관상 구글에서 받은 좌표·place_id를 카카오 컴포넌트에 넘기지 말 것 (로드뷰 좌표는 백엔드 힌트 응답)
 */
export interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

export interface KakaoRoadview {
  setPanoId(panoId: number, position: KakaoLatLng): void;
  relayout(): void;
}

export interface KakaoRoadviewClient {
  getNearestPanoId(
    position: KakaoLatLng,
    radius: number,
    callback: (panoId: number | null) => void,
  ): void;
}

export interface KakaoMapsNamespace {
  load(callback: () => void): void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Roadview: new (container: HTMLElement) => KakaoRoadview;
  event: {
    addListener(target: KakaoRoadview, type: "init", handler: () => void): void;
  };
  RoadviewClient: new () => KakaoRoadviewClient;
}

declare global {
  interface Window {
    kakao?: { maps: KakaoMapsNamespace };
  }
}

export function getKakaoMapsSdkUrl(appKey: string): string {
  return `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
}

export function getKakaoMaps(): KakaoMapsNamespace | null {
  if (typeof window === "undefined") return null;
  return window.kakao?.maps ?? null;
}
