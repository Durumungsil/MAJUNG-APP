/**
 * 다음 회전 각도(deg). 현재 각도에서 최소 회전 수만큼 돌고 random(0~1)만큼 더 돎.
 * 각도를 계속 누적해야 CSS transition이 항상 같은 방향으로 돎
 */
export function getNextRotation(current: number, minTurns: number, random: number): number {
  return current + minTurns * 360 + Math.floor(random * 360);
}

/** 회전을 시작한 지 elapsedMs가 지났을 때, 휠이 멈출 때까지 남은 시간. 이미 멈췄으면 0 */
export function getRemainingSpinMs(elapsedMs: number, durationMs: number): number {
  return Math.max(0, durationMs - elapsedMs);
}
