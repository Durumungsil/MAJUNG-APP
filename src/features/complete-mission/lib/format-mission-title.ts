const KOREAN_ORDINALS = ["첫", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열"];

export function formatMissionSuccessTitle(missionNumber: number): string {
  const ordinal = KOREAN_ORDINALS[missionNumber - 1] ?? String(missionNumber);
  return `${ordinal}번째 미션 성공!`;
}
