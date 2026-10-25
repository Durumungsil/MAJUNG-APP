import { apiRequest } from "@/shared/api";
import type { LoginResponse } from "../model/types";

/** 구글 ID 토큰으로 로그인 (처음이면 서버가 회원가입까지 처리) */
export function loginWithGoogle(idToken: string) {
  return apiRequest<LoginResponse>("/api/v1/auth/google", {
    method: "POST",
    body: { id_token: idToken },
  });
}
