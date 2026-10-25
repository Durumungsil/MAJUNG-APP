import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./http-client";

const MAX_RETRY_COUNT = 2;

/** 4xx는 다시 시도해도 결과가 같으므로 네트워크·5xx 오류만 재시도함 */
function shouldRetry(failureCount: number, error: unknown) {
  if (error instanceof ApiError && error.status < 500) return false;
  return failureCount < MAX_RETRY_COUNT;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: shouldRetry,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
