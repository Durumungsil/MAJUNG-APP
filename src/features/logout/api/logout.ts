import { useMutation } from "@tanstack/react-query";
import { useSessionStore } from "@/entities/session";
import { apiRequest } from "@/shared/api";

/** 로그아웃 - 서버에서 refresh 토큰을 폐기함 */
export function logout(refreshToken: string) {
  return apiRequest<null>("/api/v1/auth/logout", {
    method: "POST",
    body: { refresh_token: refreshToken },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = useSessionStore.getState().session?.refreshToken;
      if (refreshToken) await logout(refreshToken);
    },
    // 서버 요청이 실패해도 이 기기에서는 로그아웃돼야 하므로 세션은 항상 지움 (이동은 AuthGuard가 처리)
    onSettled: () => useSessionStore.getState().clearSession(),
  });
}
