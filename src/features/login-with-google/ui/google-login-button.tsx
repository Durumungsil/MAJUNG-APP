"use client";

import { GoogleLogoIcon } from "@/shared/assets";
import { GOOGLE_CLIENT_ID } from "@/shared/config/env";
import { cn } from "@/shared/lib";
import { LOGIN_CALLBACK_PATH } from "../config/google-oauth";
import { buildGoogleAuthUrl } from "../lib/google-oauth";
import { savePendingAuthRequest } from "../model/pending-auth-request";

type GoogleLoginButtonProps = {
  className?: string;
};

/**
 * Google 로그인 브랜딩 가이드의 라이트 테마 버튼 규격을 그대로 따름
 * (흰 배경, #747775 테두리, 20px 공식 G 로고, Roboto Medium 14px, 로고와 문구 사이 10px).
 * 색·로고·문구를 서비스 디자인에 맞춰 바꾸면 OAuth 브랜딩 검토에서 반려되므로 바꾸지 말 것
 */
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
    <button
      type="button"
      disabled={!GOOGLE_CLIENT_ID}
      onClick={handleLoginClick}
      className={cn(
        "flex h-10 w-full shrink-0 items-center justify-center gap-2.5 rounded-full border border-google-border bg-google-surface px-3 font-google text-xs leading-5 font-medium text-google-text disabled:opacity-40",
        className,
      )}
    >
      <GoogleLogoIcon className="size-5 shrink-0" />
      Google 계정으로 로그인
    </button>
  );
}
