import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeftIcon } from "@/shared/assets";

type BackHeaderSize = "sm" | "md";

const ICON_SIZE_CLASS: Record<BackHeaderSize, string> = {
  sm: "size-5",
  md: "size-6.5",
};

type BackHeaderProps = {
  backHref: string;
  size?: BackHeaderSize;
  title?: string;
  right?: ReactNode;
};

export default function BackHeader({ backHref, size = "md", title, right }: BackHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={backHref} aria-label="뒤로 가기" className="text-black">
          <ChevronLeftIcon className={ICON_SIZE_CLASS[size]} />
        </Link>
        {title && <h1 className="text-l text-black">{title}</h1>}
      </div>
      {right}
    </header>
  );
}
