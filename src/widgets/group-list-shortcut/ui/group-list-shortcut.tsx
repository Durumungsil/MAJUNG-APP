"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon } from "@/shared/assets";
import { HOME_PATH } from "@/shared/config/routes";

type GroupListShortcutProps = {
  /** 모드 시작 화면 경로. 시작 화면에는 그룹 상세로 나가는 닫기 버튼이 따로 있어 숨김 */
  startPath: string;
};

/**
 * 모드 진행 화면 어디서든 그룹 목록으로 나가는 버튼. 모드 layout에 한 번 둠.
 * 지도처럼 화면을 꽉 채운 화면 위에도 보이도록 왼쪽 위에 띄우고, 모달(z-40 이상)보다는 아래에 둠
 */
export default function GroupListShortcut({ startPath }: GroupListShortcutProps) {
  const pathname = usePathname();
  if (pathname === startPath) return null;

  return (
    <Link
      href={HOME_PATH}
      className="fixed top-[calc(var(--safe-top)+--spacing(3))] left-3 z-30 inline-flex items-center gap-1 rounded-full bg-white/90 py-1.5 pr-3 pl-2 text-s text-text-primary"
    >
      <ChevronLeftIcon className="size-4" />
      그룹 목록
    </Link>
  );
}
