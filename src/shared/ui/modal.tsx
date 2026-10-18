"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/shared/lib";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  compact?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Modal({
  open,
  onClose,
  labelledBy,
  compact = false,
  className,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleWindowKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-mobile -translate-x-1/2 items-center justify-center bg-black/30 px-page"
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          "flex flex-col items-center rounded-lg bg-white",
          compact ? "p-7" : "px-10 py-7",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
