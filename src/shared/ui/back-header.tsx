import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeftIcon } from "@/shared/assets";

type BackHeaderProps = {
  backHref: string;
  title?: string;
  right?: ReactNode;
};

export default function BackHeader({ backHref, title, right }: BackHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={backHref} aria-label="뒤로 가기" className="text-black">
          <ChevronLeftIcon className="size-6.5" />
        </Link>
        {title && <h1 className="text-xxl text-black">{title}</h1>}
      </div>
      {right}
    </header>
  );
}
