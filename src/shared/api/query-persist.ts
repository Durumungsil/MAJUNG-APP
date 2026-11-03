import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import type { Query } from "@tanstack/react-query";

/** 새로고침 뒤에도 남겨 두는 시간. 탭을 닫으면 sessionStorage와 함께 사라짐 */
export const PERSISTED_QUERY_MAX_AGE_MS = 24 * 60 * 60_000;

const PERSIST_STORAGE_KEY = "majung-query-cache";

/**
 * 새로고침 뒤에도 남길 쿼리에 붙이는 옵션. 다시 만들기 느린 AI 결과에만 붙일 것.
 * Google 장소 데이터(약관상 저장 금지)와 취향 설문 응답에는 붙이지 말 것.
 * 메모리에서 먼저 지워지면 저장소에서도 지워지므로 gcTime을 유지 시간과 맞춤
 */
export const PERSISTED_QUERY_OPTIONS = {
  gcTime: PERSISTED_QUERY_MAX_AGE_MS,
  meta: { persist: true },
} as const;

/** 성공한 결과 중 PERSISTED_QUERY_OPTIONS를 붙인 쿼리만 저장함 */
export function shouldPersistQuery(query: Query): boolean {
  return query.meta?.persist === true && query.state.status === "success";
}

/** 서버 렌더링이거나 저장소를 쓸 수 없는 환경(사파리 비공개 모드 등)이면 undefined → 저장하지 않음 */
function getSessionStorage(): Storage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
}

/** 민감 정보가 섞일 수 있어 localStorage가 아닌 sessionStorage에만 저장함 (AGENTS §8) */
export function makeQueryPersister() {
  return createSyncStoragePersister({ storage: getSessionStorage(), key: PERSIST_STORAGE_KEY });
}
