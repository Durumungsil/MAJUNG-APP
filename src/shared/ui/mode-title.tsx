import { cn } from "@/shared/lib";

type ModeTitleSize = "lg" | "md";

const SIZE_CLASS: Record<ModeTitleSize, string> = {
  /** 모드 시작 화면 */
  lg: "font-point text-display",
  /** 모드 진행 화면 상단 */
  md: "text-point",
};

type ModeTitleProps = {
  children: string;
  size?: ModeTitleSize;
  className?: string;
};

/** "STORY MODE"처럼 Ok Mallang B로 쓰는 모드 제목 */
export default function ModeTitle({ children, size = "md", className }: ModeTitleProps) {
  return (
    <h1
      className={cn("text-center whitespace-nowrap text-primary-400", SIZE_CLASS[size], className)}
    >
      {children}
    </h1>
  );
}
