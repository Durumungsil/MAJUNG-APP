/** 라우트의 rouletteId 문자열을 백엔드 ID(양의 정수)로 바꿈. 형식이 틀리면 null */
export function parseRouletteId(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
