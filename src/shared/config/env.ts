/** 카카오맵 JavaScript 키 (도메인 제한으로 보호되는 공개 키) */
export const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? "";

/** 구글 Maps JavaScript API 키 (HTTP 리퍼러 제한으로 보호되는 공개 키) */
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

/** 구글 지도 ID (AdvancedMarkerElement에 필요한 공개 값) */
export const GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "";

/** 구글 OAuth 웹 클라이언트 ID (공개 값). 백엔드 GOOGLE_CLIENT_IDS에 들어 있는 값과 같아야 함 */
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

/** 마중 백엔드 API 주소 (예: https://durumungsil.parafara.com) */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/** 기본 서버가 죽었을 때 대신 붙을 2차 백엔드 주소 (예: http://localhost:8080). 비워두면 대체 없음 */
export const API_FALLBACK_BASE_URL = process.env.NEXT_PUBLIC_API_FALLBACK_BASE_URL ?? "";

/** Search Console 소유권 확인용 HTML 태그의 content 값. 루트 layout의 <head>에 들어감 */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

/** production 빌드 여부 (서비스 워커처럼 배포 환경에서만 켜는 기능에 사용) */
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
