/** 휠이 멈출 때까지 걸리는 시간. roulette-wheel의 duration 클래스와 같은 값이어야 함 */
export const SPIN_DURATION_MS = 3000;

/** 한 번 돌릴 때 최소 회전 수 */
export const SPIN_MIN_TURNS = 5;

/** 돌리기 버튼 대신 보여줄 안내. 불러오는 중에는 아무것도 보여주지 않음 */
export const SPIN_BLOCK_MESSAGE = {
  member: "룰렛은 대표자가 돌려요",
  survey: "모든 멤버가 취향 설문을 마치면 룰렛을 돌릴 수 있어요",
} as const;
