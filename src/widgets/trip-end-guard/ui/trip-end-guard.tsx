"use client";

import { Toast } from "@/shared/ui";
import { useTripEndRedirect } from "../model/use-trip-end-redirect";

type TripEndGuardProps = {
  groupId: string;
};

/** 모드·설문 화면 layout에 한 번 두어, 대표자가 여행을 종료하면 멤버를 그룹 상세로 돌려보냄 */
export default function TripEndGuard({ groupId }: TripEndGuardProps) {
  const { toastMessage } = useTripEndRedirect(groupId);
  return <Toast open={toastMessage !== null} message={toastMessage ?? ""} />;
}
