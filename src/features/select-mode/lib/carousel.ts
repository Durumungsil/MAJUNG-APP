/** 음수·범위 초과 인덱스를 [0, length) 범위로 순환시킴 */
export function wrapIndex(length: number, index: number): number {
  return ((index % length) + length) % length;
}

export type CarouselSlot = {
  /** 무한 순환을 위한 가상 인덱스. 카드의 key로 사용 */
  virtualIndex: number;
  /** 가운데 카드 기준 상대 위치 (-radius ~ radius) */
  offset: number;
};

/** 현재 가상 위치를 기준으로 화면에 둘 슬롯 목록 (양쪽 radius개씩) */
export function getVisibleSlots(position: number, radius: number): CarouselSlot[] {
  return Array.from({ length: radius * 2 + 1 }, (_, index) => {
    const offset = index - radius;
    return { virtualIndex: position + offset, offset };
  });
}

/** 드래그 거리로 넘길 칸 수를 판정 (왼쪽으로 밀면 다음 카드) */
export function getSwipeStep(dragX: number, threshold: number): -1 | 0 | 1 {
  if (dragX <= -threshold) return 1;
  if (dragX >= threshold) return -1;
  return 0;
}
