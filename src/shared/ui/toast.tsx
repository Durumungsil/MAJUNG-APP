"use client";

import { createPortal } from "react-dom";

type ToastProps = {
  open: boolean;
  message: string;
};

export default function Toast({ open, message }: ToastProps) {
  if (!open) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-[calc(var(--safe-bottom)+--spacing(24))] left-1/2 z-60 w-max max-w-[calc(100vw-var(--spacing-gutter)*2)] -translate-x-1/2 rounded-lg bg-black/80 px-5 py-2.5 text-center text-s text-white transition-opacity duration-200 starting:opacity-0"
    >
      {message}
    </div>,
    document.body,
  );
}
