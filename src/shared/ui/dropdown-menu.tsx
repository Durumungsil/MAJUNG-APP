"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type DropdownMenuItem = { label: string } & (
  { href: string; onSelect?: undefined } | { href?: undefined; onSelect: () => void }
);

type DropdownMenuProps = {
  triggerLabel: string;
  trigger: ReactNode;
  items: DropdownMenuItem[];
};

const ITEM_CLASS =
  "block w-full rounded-lg px-3 py-1.5 text-left text-xs whitespace-nowrap text-black hover:bg-natural-200 focus-visible:bg-natural-200 focus-visible:outline-none";

export default function DropdownMenu({ triggerLabel, trigger, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleDocumentPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => document.removeEventListener("pointerdown", handleDocumentPointerDown);
  }, [open]);

  function handleTriggerClick() {
    setOpen((prev) => !prev);
  }

  function handleLinkClick() {
    setOpen(false);
  }

  function handleItemClick(item: DropdownMenuItem) {
    setOpen(false);
    item.onSelect?.();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={triggerLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleTriggerClick}
        className="flex text-black"
      >
        {trigger}
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute top-full right-0 z-40 mt-2 flex w-max min-w-28.25 flex-col gap-1 rounded-lg border border-natural-300 bg-white p-1"
        >
          {items.map((item) => (
            <li key={item.label} role="none">
              {item.href !== undefined ? (
                <Link
                  role="menuitem"
                  href={item.href}
                  className={ITEM_CLASS}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  role="menuitem"
                  className={ITEM_CLASS}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
