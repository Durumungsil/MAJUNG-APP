// 백엔드 JSON이 snake_case라서 응답 타입은 필드 이름을 그대로 따름. 화면에서는 model 타입으로 변환해서 씀

/** 룰렛 종류 (백엔드 enum) */
export type RouletteType = "DESTINATION" | "RESTAURANT";

/** 룰렛으로 뽑힌 장소 */
export type RoulettePlaceDto = {
  place_id: number;
  name: string;
  category: string | null;
  address: string;
  latitude: number;
  longitude: number;
};

/** POST /roulette/destinations, /roulette/restaurants 응답 (201) */
export type DrawRouletteResponse = {
  roulette_id: number;
  type: RouletteType;
  place: RoulettePlaceDto;
  /** 식당 룰렛에만 내려옴 */
  group_allergies?: string[];
  round: number;
  drawn_at: string;
};

/** GET /roulette/{rouletteId} 응답 */
export type RouletteResultResponse = {
  roulette_id: number;
  group_id: number;
  type: RouletteType;
  place: RoulettePlaceDto;
  drawn_at: string;
};

/** GET /constraints/minimum 응답. 멤버 수(source_member_count)는 익명성 때문에 화면에서 쓰지 않음 */
export type MinimumConstraintsResponse = {
  group_id: number;
  allergies: string[];
  excluded_categories: string[];
  source_member_count: number;
  updated_at: string;
};
