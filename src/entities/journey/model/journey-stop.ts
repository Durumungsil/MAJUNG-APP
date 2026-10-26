/** 모험모드 "나의 여정"의 한 칸 */
export interface JourneyStop {
  id: string;
  placeName: string;
  rank: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
}
