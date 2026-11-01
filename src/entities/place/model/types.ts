import type { LatLng } from "@/shared/model";

/** 장소 카테고리 (백엔드 TravelCategory enum) */
export type PlaceCategory =
  | "HEALING"
  | "FESTIVAL"
  | "SHOPPING"
  | "CULTURE"
  | "ACTIVITY"
  | "FOOD"
  | "NATURE"
  | "CAFE"
  | "SIGHTSEEING";

/**
 * 마중 내부 장소. 백엔드는 Google 장소 정보를 저장하지 않으므로
 * 일정·룰렛 응답에는 이름이 없고, 좌표는 캐시가 만료되면 비어 있음 → Google SDK로 조회해서 채움
 */
export type Place = {
  /** Google place_id */
  id: string;
  /** 추천 응답에만 있음 */
  name: string | null;
  category: PlaceCategory | null;
  location: LatLng | null;
};

/** Google SDK로 조회한 장소 이름·좌표 */
export type PlaceDetails = {
  name: string;
  location: LatLng | null;
};

/** Google 사진 작성자 출처. 사진과 함께 반드시 표시해야 함 */
export type PlacePhotoAttribution = {
  name: string;
  /** 작성자 프로필 링크. 없으면 이름만 표시 */
  uri: string | null;
};

/** 상세 화면에 띄우는 사진 1장. URL은 만료되므로 저장하지 말 것 */
export type PlacePhoto = {
  url: string;
  attributions: PlacePhotoAttribution[];
};
