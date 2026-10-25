"use client";

import { GOOGLE_CLIENT_ID } from "@/shared/config/env";
import { Button } from "@/shared/ui";
import { LOGIN_CALLBACK_PATH } from "../config/google-oauth";
import { buildGoogleAuthUrl } from "../lib/google-oauth";
import { savePendingAuthRequest } from "../model/pending-auth-request";

type GoogleLoginButtonProps = {
  className?: string;
};

export default function GoogleLoginButton({ className }: GoogleLoginButtonProps) {
  function handleLoginClick() {
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();
    savePendingAuthRequest({ state, nonce });

    window.location.assign(
      buildGoogleAuthUrl({
        clientId: GOOGLE_CLIENT_ID,
        // 배포 환경마다 주소가 달라지므로 현재 origin 기준으로 만듦
        redirectUri: `${window.location.origin}${LOGIN_CALLBACK_PATH}`,
        state,
        nonce,
      }),
    );
  }

  return (
    <Button className={className} disabled={!GOOGLE_CLIENT_ID} onClick={handleLoginClick}>
      구글로 로그인하기
    </Button>
  );
}
