"use client";

// 임시모달임

import { useEffect, useState } from "react";
import { CopyIcon } from "@/shared/assets";
import { cn, copyToClipboard } from "@/shared/lib";
import Toast from "./toast";

type CopyResult = "success" | "failure";

const RESULT_MESSAGE: Record<CopyResult, string> = {
  success: "복사가 완료되었어요!",
  failure: "복사에 실패했어요",
};

const RESULT_VISIBLE_MS = 1500;

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
};

export default function CopyButton({ value, label, className }: CopyButtonProps) {
  const [result, setResult] = useState<CopyResult | null>(null);

  useEffect(() => {
    if (!result) return;
    const timer = window.setTimeout(() => setResult(null), RESULT_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [result]);

  async function handleCopyClick() {
    if (!value) return;
    const copied = await copyToClipboard(value);
    setResult(copied ? "success" : "failure");
  }

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={handleCopyClick}
        className={cn("shrink-0 text-text-primary", className)}
      >
        <CopyIcon className="size-full" />
      </button>
      <Toast open={result !== null} message={result ? RESULT_MESSAGE[result] : ""} />
    </>
  );
}
