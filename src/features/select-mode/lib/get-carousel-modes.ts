/** 선택된 인덱스를 기준으로 [이전, 현재, 다음] 항목을 순환해서 반환 */
export function getCarouselItems<T>(items: T[], selectedIndex: number): [T, T, T] {
  const length = items.length;
  const at = (offset: number) => items[(selectedIndex + offset + length) % length];
  return [at(-1), at(0), at(1)];
}

export function shiftIndex(length: number, index: number, offset: number): number {
  return (index + offset + length) % length;
}
