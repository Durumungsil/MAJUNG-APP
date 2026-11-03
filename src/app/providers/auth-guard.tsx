"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useSessionHydrated, useSessionStore } from "@/entities/session";
import { HOME_PATH, PRIVACY_PATH, TERMS_PATH } from "@/shared/config/routes";

const LOGIN_PATH = "/login";

/**
 * 로그인 여부와 상관없이 바로 보여주는 소개·정책 화면.
 * 구글 OAuth 검토·검색엔진이 JS 없이 서버 HTML로 읽어야 하므로 세션을 기다리지 않고 그림
 */
const OPEN_PAGES = new Set(["/", PRIVACY_PATH, TERMS_PATH]);

/** 로그인 없이 볼 수 있는 경로 (로그인 화면, 구글 로그인 콜백) */
function isLoginPath(pathname: string) {
  return pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);
}

/** 비로그인 사용자는 로그인 화면으로, 로그인한 사용자가 로그인 화면에 오면 앱 홈으로 보냄 */
export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useSessionHydrated();
  const isLoggedIn = useSessionStore((state) => state.session !== null);

  const isPublic = OPEN_PAGES.has(pathname) || isLoginPath(pathname);
  const shouldGoLogin = hydrated && !isLoggedIn && !isPublic;
  const shouldGoHome = hydrated && isLoggedIn && pathname === LOGIN_PATH;

  useEffect(() => {
    if (shouldGoLogin) router.replace(LOGIN_PATH);
    else if (shouldGoHome) router.replace(HOME_PATH);
  }, [router, shouldGoLogin, shouldGoHome]);

  // 공개 화면은 보호할 내용이 없으므로 서버 HTML에 본문(정책 링크 포함)이 들어가도록 세션을 기다리지 않음
  if (isPublic) return shouldGoHome ? null : children;

  // 세션을 불러오기 전이나 이동 중에는 보호된 화면이 잠깐이라도 보이지 않게 비워 둠
  if (!hydrated || shouldGoLogin) return null;

  return children;
}
