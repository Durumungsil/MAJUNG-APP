import { cn } from "@/shared/lib";

type SkeletonProps = {
  className?: string;
};

/** 불러오는 동안 실제 레이아웃 자리를 채우는 블록 */
export default function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden className={cn("animate-pulse rounded-lg bg-natural-300", className)} />;
}
