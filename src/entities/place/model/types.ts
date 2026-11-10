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

/** 영업시간의 한 시점. day는 0(일)~6(토), 시각은 장소 현지 기준 */
export type OpeningTimePoint = {
  day: number;
  hour: number;
  minute: number;
};

/** 영업 구간. close가 없으면 24시간 영업 */
export type OpeningPeriod = {
  open: OpeningTimePoint;
  close: OpeningTimePoint | null;
};

/** 정기 영업시간. 지금 열려 있는지는 화면에서 현재 시각으로 계산함 */
export type PlaceOpeningHours = {
  periods: OpeningPeriod[];
  /** 장소 현지 시각의 UTC 차이(분). 없으면 한국 시각으로 봄 */
  utcOffsetMinutes: number | null;
};

/** 지금 영업 상태. 닫혀 있으면 다음에 여는 시각(HH:mm)을 함께 둠 */
export type PlaceOpenStatus = { isOpen: true } | { isOpen: false; nextOpenTime: string | null };

/** Google 리뷰. 작성자 출처는 리뷰와 함께 반드시 표시해야 함 */
export type PlaceReview = {
  authorName: string;
  /** 작성자 프로필 링크. 없으면 이름만 표시 */
  authorUri: string | null;
  /** Google이 만든 상대 시각 문구 (예: "5시간 전") */
  relativeTime: string | null;
  text: string;
};

/** 상세 시트에 보여주는 Google 장소 정보 (한 번의 요청으로 받음) */
export type PlaceDetailInfo = PlaceDetails & {
  /** Google 대표 업종의 한국어 이름 (예: "돈가스 전문점"). 세부 업종 없이 "음식점"만 오기도 함 */
  primaryTypeName: string | null;
  address: string | null;
  rating: number | null;
  openingHours: PlaceOpeningHours | null;
  photo: PlacePhoto | null;
  reviews: PlaceReview[];
};
