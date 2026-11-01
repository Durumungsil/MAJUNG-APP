/**
 * 추천 장소 목록을 한 번에 불러오는 개수 (백엔드 허용 범위 1~20).
 * 요청마다 Google 검색이 여러 번 일어나므로 최대치로 받아 요청 수를 줄임
 */
export const RECOMMENDATION_PAGE_SIZE = 20;

/**
 * 추천 결과를 다시 받지 않는 시간. 더 보기 cursor가 15분 뒤 만료되므로 그보다 짧게 둠.
 * 다시 받을 때마다 유료 Google 검색이 일어나므로 화면 포커스 등으로 자동 갱신하지 않음
 */
export const RECOMMENDATION_STALE_MS = 10 * 60_000;

/** Google 장소 상세는 정책상 영구 저장할 수 없어 브라우저 메모리에만 이 시간 동안 둠 */
export const PLACE_DETAILS_GC_MS = 30 * 60_000;

/** 상세 사진 요청 폭(px). 시트의 사진 칸(180px)의 2배 */
export const PLACE_PHOTO_MAX_WIDTH_PX = 360;

/** Google 장소 이름을 불러오지 못했을 때 대신 보여주는 문구 */
export const UNKNOWN_PLACE_NAME = "이름을 불러오지 못한 장소";
