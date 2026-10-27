/**
 * 다음 회전 각도(deg). 현재 각도에서 최소 회전 수만큼 돌고 random(0~1)만큼 더 돎.
 * 각도를 계속 누적해야 CSS transition이 항상 같은 방향으로 돎
 */
export function getNextRotation(current: number, minTurns: number, random: number): number {
  return current + minTurns * 360 + Math.floor(random * 360);
}

/** random(0~1)으로 후보 하나를 고름. 후보가 없으면 null */
export function pickRandom<T>(items: readonly T[], random: number): T | null {
  if (items.length === 0) return null;
  const index = Math.min(Math.floor(random * items.length), items.length - 1);
  return items[index];
}
