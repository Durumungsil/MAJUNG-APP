export function getRemainingSeconds(startedAt: number, now: number, limitSeconds: number): number {
  const remainingMs = limitSeconds * 1000 - (now - startedAt);
  return Math.max(0, Math.ceil(remainingMs / 1000));
}

export function formatRemainingHintTime(seconds: number): string {
  return `남은 힌트 시간 : ${seconds}초`;
}

export function formatHintLimitNotice(limitSeconds: number): string {
  return `힌트는 ${limitSeconds}초 동안만 제공돼요!`;
}
