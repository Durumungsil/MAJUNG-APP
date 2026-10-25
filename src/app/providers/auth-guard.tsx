"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useSessionHydrated, useSessionStore } from "@/entities/session";

const LOGIN_PATH = "/login";

/** 로그인 없이 볼 수 있는 경로 (로그인 화면, 구글 로그인 콜백) */
function isPublicPath(pathname: string) {
  return pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);
}

/** 비로그인 사용자는 로그인 화면으로, 로그인한 사용자가 로그인 화면에 오면 홈으로 보냄 */
export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useSessionHydrated();
  const isLoggedIn = useSessionStore((state) => state.session !== null);

  const isPublic = isPublicPath(pathname);
  const shouldGoLogin = hydrated && !isLoggedIn && !isPublic;
  const shouldGoHome = hydrated && isLoggedIn && pathname === LOGIN_PATH;

  useEffect(() => {
    if (shouldGoLogin) router.replace(LOGIN_PATH);
    else if (shouldGoHome) router.replace("/");
  }, [router, shouldGoLogin, shouldGoHome]);

  // 세션을 불러오기 전이나 이동 중에는 보호된 화면이 잠깐이라도 보이지 않게 비워 둠
  if (!hydrated || shouldGoLogin || shouldGoHome) return null;

  return children;
}
