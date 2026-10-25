"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "@/entities/session";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { Button, Spinner } from "@/shared/ui";
import { loginWithGoogle } from "../api/login-with-google";
import { getIdTokenNonce, parseGoogleAuthFragment } from "../lib/google-oauth";
import { takePendingAuthRequest } from "../model/pending-auth-request";

/** 구글에서 돌아온 ID 토큰을 백엔드에 보내 로그인을 마무리함 */
export default function GoogleLoginCallback() {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [failed, setFailed] = useState(false);
  // 개발 모드(StrictMode)에서 effect가 두 번 실행돼도 로그인 요청은 한 번만 보냄
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    async function completeLogin() {
      const result = parseGoogleAuthFragment(window.location.hash);
      const pending = takePendingAuthRequest();

      if (
        !result.ok ||
        !pending ||
        result.state !== pending.state ||
        getIdTokenNonce(result.idToken) !== pending.nonce
      ) {
        setFailed(true);
        return;
      }

      try {
        const response = await loginWithGoogle(result.idToken);
        setSession({
          userId: response.user_id,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        });
        // TODO: first_login이 true면 온보딩 화면으로 분기 (화면 확정 후)
        router.replace("/");
      } catch {
        setFailed(true);
      }
    }

    void completeLogin();
  }, [router, setSession]);

  if (failed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-m text-black">{ERROR_MESSAGES.loginFailed}</p>
        <Button href="/login" size="md">
          다시 로그인하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner />
    </div>
  );
}
