import type { ReactNode } from "react";
import { ScheduleHeader } from "@/entities/journey";
import { ModeTitle, Screen, StripeBackground } from "@/shared/ui";

type StoryLayoutProps = {
  startDate: string;
  endDate: string;
  /** 일정 제목 오른쪽 링크 */
  action?: ReactNode;
  /** 일정 제목 아래 안내 문구 */
  guide?: string;
  children: ReactNode;
};

/** 스토리 모드 진행 화면 공통 틀: 사선 배경 + STORY MODE 제목 + 일정 헤더 */
export default function StoryLayout({
  startDate,
  endDate,
  action,
  guide,
  children,
}: StoryLayoutProps) {
  return (
    <Screen className="relative overflow-x-clip">
      <StripeBackground />
      <div className="relative mt-5 flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <ModeTitle>STORY MODE</ModeTitle>
            <ScheduleHeader startDate={startDate} endDate={endDate} action={action} />
          </div>
          {guide && <p className="text-s text-text-primary">{guide}</p>}
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </Screen>
  );
}
