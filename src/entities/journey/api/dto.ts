// 백엔드 JSON이 snake_case라서 응답 타입은 필드 이름을 그대로 따름. 화면에서는 model/types로 변환해서 씀

type VisitItemResponse = {
  item_id: number;
  sequence: number;
  type: "VISIT";
  destination_id: number;
  destination_name: string;
  /** HH:mm */
  start_at: string;
  /** HH:mm */
  end_at: string;
  stay_minutes: number;
  memo: string | null;
};

type MoveItemResponse = {
  item_id: number;
  sequence: number;
  type: "MOVE";
  from_destination_id: number;
  from_destination_name: string;
  to_destination_id: number;
  to_destination_name: string;
  duration_minutes: number;
  distance_meters: number;
  long_distance: boolean;
  memo: string | null;
};

export type ItineraryItemResponse = VisitItemResponse | MoveItemResponse;

/** 타임라인 생성(POST)·조회(GET) 공통 응답. generated_by는 생성 응답에만 있음 */
export type ItineraryResponse = {
  itinerary_id: number;
  group_id: number;
  start_date: string;
  end_date: string;
  transport_type: string;
  max_move_meters: number;
  day_start_time: string;
  day_end_time: string;
  days: { day: number; date: string; items: ItineraryItemResponse[] }[];
  generated_at: string;
  updated_at: string;
  generated_by?: "AI" | "RULE";
};
