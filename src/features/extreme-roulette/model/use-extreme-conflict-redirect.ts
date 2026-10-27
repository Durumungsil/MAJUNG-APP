"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { TOAST_DURATION_MS, useToast } from "@/shared/lib";

/**
 * 익스트림 API가 409(익스트림모드 아님 / 진행 중인 여행 없음)를 돌려주면
 * 토스트를 보여준 뒤 그룹 상세로 돌려보냄
 */
export function useExtremeConflictRedirect(error: unknown, groupId: number) {
  const router = useRouter();
  const { toastMessage, showToast } = useToast();
  const isConflict = isApiError(error, 409);

  useEffect(() => {
    if (!isConflict) return;
    showToast(ERROR_MESSAGES.extremeUnavailable);
    const timer = setTimeout(() => router.replace(`/groups/${groupId}`), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isConflict, groupId, router, showToast]);

  return { isConflict, toastMessage };
}
