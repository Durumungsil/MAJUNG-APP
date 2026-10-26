// TODO: 백엔드가 현재 타임라인 id를 내려주면(그룹 상세 등) URL 쿼리로 넘기는 방식을 없앰
const ITINERARY_ID_PARAM = "itineraryId";

/** URL 쿼리의 itineraryId를 백엔드 ID(양의 정수)로 바꿈. 없거나 형식이 틀리면 null */
export function parseItineraryId(value: string | string[] | undefined): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

/** 스토리모드 화면 사이를 오갈 때 타임라인 id를 쿼리로 붙임 */
export function withItineraryId(href: string, itineraryId: number | null): string {
  return itineraryId === null ? href : `${href}?${ITINERARY_ID_PARAM}=${itineraryId}`;
}
