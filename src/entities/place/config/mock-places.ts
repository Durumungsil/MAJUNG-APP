import type { LatLng } from "@/shared/model";
import type { Place, PlaceReview } from "../model/types";

// TODO: 장소 상세 API(v2) 연동 전까지 사용하는 퍼블리싱용 목 데이터 (Figma 예시 문구)
const MOCK_REVIEW_CONTENT =
  "너무 편안하고 내 집 같아서 좋아용 저는 멍청하고 뚱뚱한 비둘기입니다 그리고 많이 먹습니다 제가 마크돼지입니다 죽어드리겟스빈";

const MOCK_REVIEWS: PlaceReview[] = ["r1", "r2", "r3"].map((id) => ({
  id,
  authorName: "yajaya",
  createdAgo: "5시간 전",
  content: MOCK_REVIEW_CONTENT,
}));

/** 추천 API가 아직 내려주지 않는 장소 정보 (영업 상태, 교통 안내, 사진, 리뷰) */
export const MOCK_PLACE_DETAIL: Pick<
  Place,
  "businessStatus" | "businessHoursNote" | "transitNote" | "imageUrls" | "rating" | "reviews"
> = {
  businessStatus: "open",
  businessHoursNote: "22:00에 영업 종료",
  transitNote: "덕포역 2번출구에서 500m",
  imageUrls: [],
  rating: 5,
  reviews: MOCK_REVIEWS,
};

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
    ...MOCK_PLACE_DETAIL,
    id: index + 1,
    name: "소리의 집",
    category: "아트",
    address: "부산광역시 사상구 덕포2동 경동아파트",
    location: { lat: center.lat + latOffset, lng: center.lng + lngOffset },
    businessStatus: "closed",
    businessHoursNote: "09:30에 영업 시작",
  }));
}
