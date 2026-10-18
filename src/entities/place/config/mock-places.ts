import type { LatLng } from "@/shared/model";
import type { Place, PlaceReview } from "../model/types";

// TODO: 장소 API 연동 전까지 사용하는 퍼블리싱용 목 데이터 (Figma 예시 문구)
const MOCK_REVIEW_CONTENT =
  "너무 편안하고 내 집 같아서 좋아용 저는 멍청하고 뚱뚱한 비둘기입니다 그리고 많이 먹습니다 제가 마크돼지입니다 죽어드리겟스빈";

const MOCK_REVIEWS: PlaceReview[] = ["r1", "r2", "r3"].map((id) => ({
  id,
  authorName: "yajaya",
  createdAgo: "5시간 전",
  content: MOCK_REVIEW_CONTENT,
}));

export const MOCK_RECOMMENDED_PLACES: Place[] = [
  {
    id: "misu-house",
    name: "미수의 집",
    category: "아트",
    address: "부산광역시 부산진구 개금3동 현대아파트",
    location: { lat: 35.153, lng: 129.02 },
    businessStatus: "closed",
    businessHoursNote: "09:30에 영업 시작",
    transitNote: "개금역 2번출구에서 500m",
    imageUrls: [],
    rating: 5,
    reviews: MOCK_REVIEWS,
  },
  {
    id: "sori-house",
    name: "소리의 집",
    category: "숙박",
    address: "부산광역시 사상구 덕포2동 경동아파트",
    location: { lat: 35.17, lng: 128.985 },
    businessStatus: "open",
    businessHoursNote: "22:00에 영업 종료",
    transitNote: "덕포역 2번출구에서 500m",
    imageUrls: [],
    rating: 5,
    reviews: MOCK_REVIEWS,
  },
  {
    id: "hyuntae-house",
    name: "현태의 집",
    category: "아트",
    address: "부산광역시 북구 구포3동 시랑로 109번길",
    location: { lat: 35.205, lng: 128.999 },
    businessStatus: "closed",
    businessHoursNote: "09:30에 영업 시작",
    transitNote: "구포역 1번출구에서 300m",
    imageUrls: [],
    rating: 5,
    reviews: MOCK_REVIEWS,
  },
  {
    id: "jungwoo-house",
    name: "정우의 집",
    category: "숙박",
    address: "부산광역시 사상구 괘법동",
    location: { lat: 35.162, lng: 128.984 },
    businessStatus: "preparing",
    businessHoursNote: "10:00에 영업 시작",
    transitNote: "사상역 3번출구에서 200m",
    imageUrls: [],
    rating: 5,
    reviews: MOCK_REVIEWS,
  },
];

/** 일정 장소 주변 추천 장소를 흉내 내기 위한 위치 오프셋 (위도, 경도) */
const NEARBY_OFFSETS: Array<[number, number]> = [
  [0.004, -0.006],
  [-0.003, -0.007],
  [0.006, 0.002],
  [0.002, 0.007],
  [-0.005, 0.004],
  [-0.001, -0.002],
];

/** 지도에서 일정 장소 주변으로 추천하는 장소 (2차 추천) */
export function createMockNearbyPlaces(center: LatLng): Place[] {
  return NEARBY_OFFSETS.map(([latOffset, lngOffset], index) => ({
    id: `nearby-${center.lat}-${center.lng}-${index + 1}`,
    name: "소리의 집",
    category: "아트",
    address: "부산광역시 사상구 덕포2동 경동아파트",
    location: { lat: center.lat + latOffset, lng: center.lng + lngOffset },
    businessStatus: "closed",
    businessHoursNote: "09:30에 영업 시작",
    transitNote: "덕포역 2번출구에서 500m",
    imageUrls: [],
    rating: 5,
    reviews: MOCK_REVIEWS,
  }));
}
