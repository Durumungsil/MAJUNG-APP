import type { LatLng } from "@/shared/model";

export type BusinessStatus = "open" | "closed" | "preparing";

export type PlaceReview = {
  id: string;
  authorName: string;
  /** 표시용 상대 시간 (예: "5시간 전") */
  createdAgo: string;
  content: string;
};

/** 외부 장소 API 응답과 무관한 마중 내부 장소 타입 */
export type Place = {
  id: string;
  name: string;
  category: string;
  address: string;
  location: LatLng;
  businessStatus: BusinessStatus;
  /** 예: "09:30에 영업 시작" */
  businessHoursNote: string;
  /** 예: "개금역 2번출구에서 500m" */
  transitNote: string;
  imageUrls: string[];
  rating: number;
  reviews: PlaceReview[];
};
