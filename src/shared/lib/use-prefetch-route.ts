"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * 버튼·요청 뒤에 router.push로 넘어갈 화면을 미리 받아 둠.
 * <Link>와 달리 router.push는 스스로 미리 받지 않아, 동적 라우트는 누른 뒤에야 서버 응답을 기다리게 됨.
 * 동적 라우트는 loading.tsx까지만 받아 두므로 요청이 가볍고, production에서만 동작함
 */
export function usePrefetchRoute(href: string | null) {
  const router = useRouter();

  useEffect(() => {
    if (href) router.prefetch(href);
  }, [router, href]);
}
