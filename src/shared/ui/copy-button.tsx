"use client";

import { CopyIcon } from "@/shared/assets";
import { cn } from "@/shared/lib";

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
};

export default function CopyButton({ value, label, className }: CopyButtonProps) {
  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // 클립보드 권한이 없는 환경에서는 조용히 무시함 (토스트 디자인 확정 후 피드백 추가)
    }
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleCopyClick}
      className={cn("shrink-0 text-text-primary", className)}
    >
      <CopyIcon className="size-full" />
    </button>
  );
}
