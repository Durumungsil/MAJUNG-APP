/** 카카오맵 JS SDK 중 마중에서 쓰는 부분만 옮긴 타입 */
export interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

export interface KakaoLatLngBounds {
  extend(latLng: KakaoLatLng): void;
}

export interface KakaoMap {
  setCenter(latLng: KakaoLatLng): void;
  setLevel(level: number): void;
  setBounds(
    bounds: KakaoLatLngBounds,
    paddingTop?: number,
    paddingRight?: number,
    paddingBottom?: number,
    paddingLeft?: number,
  ): void;
  relayout(): void;
}

export interface KakaoCustomOverlay {
  setMap(map: KakaoMap | null): void;
  setPosition(latLng: KakaoLatLng): void;
}

export interface KakaoPolyline {
  setMap(map: KakaoMap | null): void;
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
  LatLngBounds: new () => KakaoLatLngBounds;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level?: number; draggable?: boolean },
  ) => KakaoMap;
  CustomOverlay: new (options: {
    position: KakaoLatLng;
    content: HTMLElement | string;
    map?: KakaoMap;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
    clickable?: boolean;
  }) => KakaoCustomOverlay;
  Polyline: new (options: {
    path: KakaoLatLng[];
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
  }) => KakaoPolyline;
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
