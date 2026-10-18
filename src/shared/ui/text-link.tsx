import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib";

type TextLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
};

/** 밑줄 텍스트 링크 (예: 지도로 보기) */
export default function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn("text-s whitespace-nowrap text-text-primary underline", className)}
      {...props}
    />
  );
}
