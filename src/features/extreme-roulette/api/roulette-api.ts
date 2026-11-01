import type { Place } from "@/entities/place";
import { apiRequest } from "@/shared/api";
import { toLatLng } from "@/shared/lib";
import { ROULETTE_DRAW_PATH, ROULETTE_KIND_BY_TYPE } from "../config/roulette-kinds";
import type { RouletteKind, RouletteResult } from "../model/types";
import type {
  DrawRouletteResponse,
  MinimumConstraintsResponse,
  RoulettePlaceDto,
  RouletteResultResponse,
} from "./dto";

/** 룰렛 장소 → 마중 Place. 이름·빈 좌표는 화면에서 Google SDK로 채움 */
function toPlace(place: RoulettePlaceDto): Place {
  return {
    id: place.place_id,
    name: null,
    category: place.category,
    location: toLatLng(place.latitude, place.longitude),
  };
}

function toRouletteResult(data: DrawRouletteResponse | RouletteResultResponse): RouletteResult {
  return {
    id: data.roulette_id,
    kind: ROULETTE_KIND_BY_TYPE[data.type],
    place: toPlace(data.place),
  };
}

/**
 * 여행지/식당 룰렛 추첨. 본문 값은 모두 생략함
 * (지역은 서버가 여행 지역을 쓰고, 이미 뽑은 장소는 서버가 제외함)
 */
export async function drawRoulette(groupId: number, kind: RouletteKind): Promise<RouletteResult> {
  const data = await apiRequest<DrawRouletteResponse>(
    `/api/v2/groups/${groupId}/roulette/${ROULETTE_DRAW_PATH[kind]}`,
    { method: "POST", body: {} },
  );
  return toRouletteResult(data);
}

/** 룰렛 결과 조회 */
export async function fetchRouletteResult(
  groupId: number,
  rouletteId: number,
): Promise<RouletteResult> {
  const data = await apiRequest<RouletteResultResponse>(
    `/api/v2/groups/${groupId}/roulette/${rouletteId}`,
  );
  return toRouletteResult(data);
}

/** 최소 조건 로드 - 그룹 멤버 알레르기 합집합만 꺼냄 (누가 냈는지·몇 명인지는 쓰지 않음) */
export async function fetchGroupAllergies(groupId: number): Promise<string[]> {
  const data = await apiRequest<MinimumConstraintsResponse>(
    `/api/v2/groups/${groupId}/constraints/minimum`,
  );
  return data.allergies;
}
