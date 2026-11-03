"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  getGroupRole,
  GROUP_POLL_INTERVAL_MS,
  isTripEnded,
  useGroupByParam,
  type Group,
} from "@/entities/group";
import { useSessionStore } from "@/entities/session";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { TOAST_DURATION_MS, useToast } from "@/shared/lib";

/** 세션을 불러오기 전(userId null)에는 대표자일 수 있으므로 멤버로 보지 않음 */
function isMemberOf(group: Group, userId: number | null): boolean {
  return userId !== null && getGroupRole(group, userId) === "member";
}

/**
 * 모드·설문 화면의 멤버가 대표자의 여행 종료를 따라가도록 그룹 상세를 주기적으로 다시 조회하고,
 * 여행이 끝났으면 토스트를 보여준 뒤 그룹 상세로 돌려보냄.
 * 대표자는 자기가 종료하면서 직접 이동하므로 조회하지 않음
 */
export function useTripEndRedirect(groupIdParam: string) {
  const router = useRouter();
  const userId = useSessionStore((state) => state.session?.userId ?? null);
  const { toastMessage, showToast } = useToast();
  const { data: group } = useGroupByParam(groupIdParam, (current) =>
    current && isMemberOf(current, userId) && !isTripEnded(current)
      ? GROUP_POLL_INTERVAL_MS
      : false,
  );
  const groupId = group?.id ?? null;
  const shouldLeave = group !== undefined && isMemberOf(group, userId) && isTripEnded(group);

  useEffect(() => {
    if (!shouldLeave || groupId === null) return;
    showToast(ERROR_MESSAGES.tripEnded);
    const timer = setTimeout(() => router.replace(`/groups/${groupId}`), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [shouldLeave, groupId, router, showToast]);

  return { toastMessage };
}
