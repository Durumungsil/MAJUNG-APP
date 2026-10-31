import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { GOOGLE_MAP_ID, GOOGLE_MAPS_API_KEY } from "@/shared/config/env";

/** 마중 지도에서 쓰는 구글 Maps 라이브러리 */
export type GoogleMapsLibraries = {
  maps: google.maps.MapsLibrary;
  marker: google.maps.MarkerLibrary;
};

declare global {
  interface Window {
    /** 구글 Maps가 키 인증에 실패하면 부르는 전역 콜백 */
    gm_authFailure?: () => void;
  }
}

let isConfigured = false;
let hasAuthFailed = false;
const authFailureListeners = new Set<() => void>();

/** 키와 지도 ID가 모두 있어야 지도를 그릴 수 있음 (AdvancedMarkerElement는 지도 ID 필수) */
export function hasGoogleMapsConfig(): boolean {
  return Boolean(GOOGLE_MAPS_API_KEY && GOOGLE_MAP_ID);
}

function configure() {
  if (isConfigured) return;
  isConfigured = true;
  setOptions({ key: GOOGLE_MAPS_API_KEY, language: "ko", region: "KR" });
  window.gm_authFailure = () => {
    hasAuthFailed = true;
    authFailureListeners.forEach((listener) => listener());
  };
}

/** 구글 Maps SDK를 처음 부를 때만 불러오고, 이후에는 불러온 라이브러리를 그대로 돌려줌 */
export async function loadGoogleMaps(): Promise<GoogleMapsLibraries> {
  configure();
  const [maps, marker] = await Promise.all([importLibrary("maps"), importLibrary("marker")]);
  return { maps, marker };
}

/** 키 인증 실패(잘못된 키, 허용되지 않은 도메인 등)를 구독. 이미 실패했으면 바로 알림 */
export function subscribeGoogleMapsAuthFailure(listener: () => void): () => void {
  if (hasAuthFailed) listener();
  authFailureListeners.add(listener);
  return () => {
    authFailureListeners.delete(listener);
  };
}

/** 좌표들을 모두 담는 범위. 좌표가 없으면 null */
export function getBoundsLiteral(
  points: google.maps.LatLngLiteral[],
): google.maps.LatLngBoundsLiteral | null {
  if (points.length === 0) return null;
  const lats = points.map(({ lat }) => lat);
  const lngs = points.map(({ lng }) => lng);
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
}
