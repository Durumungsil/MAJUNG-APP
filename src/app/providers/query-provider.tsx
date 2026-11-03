"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect, useState, type ReactNode } from "react";
import { useSessionStore } from "@/entities/session";
import {
  configureApiAuth,
  makeQueryClient,
  makeQueryPersister,
  PERSISTED_QUERY_MAX_AGE_MS,
  shouldPersistQuery,
} from "@/shared/api";

// 첫 요청보다 먼저 연결돼야 하므로 effect가 아니라 모듈 로드 시점에 주입함
configureApiAuth({
  getAccessToken: () => useSessionStore.getState().session?.accessToken ?? null,
  onUnauthorized: () => useSessionStore.getState().clearSession(),
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  // 요청 간 캐시가 섞이지 않도록 컴포넌트마다 한 번만 생성함 (모듈 전역 인스턴스 금지)
  const [queryClient] = useState(makeQueryClient);
  // 느린 AI 결과를 새로고침 뒤에도 다시 요청하지 않도록 sessionStorage에 남김
  const [persister] = useState(makeQueryPersister);

  // 로그아웃·토큰 만료·다른 계정으로 전환 시 이전 사용자의 데이터가 남지 않게 캐시를 비움
  useEffect(
    () =>
      useSessionStore.subscribe((state, prevState) => {
        if (prevState.session && prevState.session.userId !== state.session?.userId) {
          queryClient.clear();
        }
      }),
    [queryClient],
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: PERSISTED_QUERY_MAX_AGE_MS,
        dehydrateOptions: { shouldDehydrateQuery: shouldPersistQuery },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
