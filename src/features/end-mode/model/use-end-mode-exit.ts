"use client";

import { useRouter } from "next/navigation";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { useEndMode } from "../api/end-mode";

type UseEndModeExitOptions = {
  groupId: number;
  /** 모드 종료는 대표자만 함. 멤버는 여행을 끝내지 않고 그룹 상세로 나가기만 함 */
  isLeader: boolean;
};

/**
 * 모드 화면의 "종료하기" 동작. 대표자는 여행 회차를 끝낸 뒤 그룹 상세로 이동함.
 * 다른 기기에서 이미 끝냈으면(409) 끝난 것으로 보고 그대로 이동함
 */
export function useEndModeExit({ groupId, isLeader }: UseEndModeExitOptions) {
  const router = useRouter();
  const { mutateAsync, isPending } = useEndMode(groupId);
  const { toastMessage, showToast } = useToast();
  const groupHref = `/groups/${groupId}`;

  /** 종료(또는 멤버의 나가기)에 성공하면 true */
  async function exit(): Promise<boolean> {
    if (!isLeader) {
      router.push(groupHref);
      return true;
    }
    try {
      await mutateAsync();
    } catch (error) {
      if (!isApiError(error, 409)) {
        showToast(
          isApiError(error, 403) ? ERROR_MESSAGES.leaderOnly : ERROR_MESSAGES.requestFailed,
        );
        return false;
      }
    }
    router.push(groupHref);
    return true;
  }

  return { exit, isExiting: isPending, toastMessage };
}
