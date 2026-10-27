import { MOCK_PLACE_DETAIL, type Place } from "@/entities/place";
import type { RouletteKind } from "../model/types";

// TODO: 익스트림 모드 룰렛 API 연동 전까지 사용하는 퍼블리싱용 목 데이터 (Figma 예시 문구)
export const MOCK_ROULETTE_CANDIDATES: Record<RouletteKind, Place[]> = {
  place: [
    {
      ...MOCK_PLACE_DETAIL,
      id: 101,
      name: "엉덩이 박물관",
      category: "아트",
      address: "부산 부산진구 예시로 2",
      location: { lat: 35.1577, lng: 129.0592 },
    },
    {
      ...MOCK_PLACE_DETAIL,
      id: 102,
      name: "소리의 집",
      category: "아트",
      address: "부산광역시 사상구 덕포2동 경동아파트",
      location: { lat: 35.1708, lng: 128.9847 },
      businessStatus: "closed",
      businessHoursNote: "09:30에 영업 시작",
    },
  ],
  food: [
    {
      ...MOCK_PLACE_DETAIL,
      id: 201,
      name: "사상 합천돼지국밥",
      category: "한식",
      address: "부산광역시 사상구 덕포2동 경동아파트",
      location: { lat: 35.1689, lng: 128.9832 },
      businessStatus: "closed",
      businessHoursNote: "09:30에 영업 시작",
    },
  ],
};

/**
 * 그룹 멤버 알러지를 합친 목록 (누가 냈는지는 담지 않음).
 * TODO: 서버 집계 결과로 교체. 민감 정보이므로 브라우저 저장소에 보관하지 말 것
 */
export const MOCK_GROUP_ALLERGIES = ["땅콩", "우유", "새우"];
