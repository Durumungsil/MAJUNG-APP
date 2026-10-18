import type { ReactNode } from "react";
import { cn } from "@/shared/lib";

type ScreenProps = {
  className?: string;
  children: ReactNode;
};

/** 모바일 화면 한 장. 상·하단 safe area와 좌우 거터를 포함함 */
export default function Screen({ className, children }: ScreenProps) {
  return (
    <main
      className={cn(
        "flex flex-1 flex-col px-page pt-[calc(var(--safe-top)+--spacing(11))] pb-[calc(var(--safe-bottom)+--spacing(11))]",
        className,
      )}
    >
      {children}
    </main>
  );
}
