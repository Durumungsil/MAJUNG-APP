"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Group } from "@/entities/group";
import { withItineraryId } from "@/entities/journey";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { TOAST_DURATION_MS, useToast } from "@/shared/lib";

type ConfirmedTimelineRedirectOptions = {
  group: Pick<Group, "id" | "status">;
  itineraryId: number | null;
  /** 내가 방금 확정해서 직접 이동하는 중이면 false로 꺼 둠 */
  enabled?: boolean;
};

/**
 * 타임라인이 확정된 여행(IN_PROGRESS)에서는 여행지 선택·타임라인 생성이 409가 되므로,
 * 장소 선택·타임라인 수정 화면에 들어오면 토스트를 보여준 뒤 확정된 타임라인 화면으로 보냄
 */
export function useConfirmedTimelineRedirect({
  group,
  itineraryId,
  enabled = true,
}: ConfirmedTimelineRedirectOptions) {
  const router = useRouter();
  const { toastMessage, showToast } = useToast();
  const isConfirmed = enabled && group.status === "IN_PROGRESS";
  const confirmedHref = withItineraryId(
    `/groups/${group.id}/story/timeline/confirmed`,
    itineraryId,
  );

  useEffect(() => {
    if (!isConfirmed) return;
    showToast(ERROR_MESSAGES.timelineAlreadyConfirmed);
    const timer = setTimeout(() => router.replace(confirmedHref), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isConfirmed, confirmedHref, router, showToast]);

  return { isConfirmed, toastMessage };
}
