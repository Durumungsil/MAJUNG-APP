"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/shared/lib";

type AvatarSize = "sm" | "md";

const SIZE: Record<AvatarSize, { className: string; px: number }> = {
  sm: { className: "size-10", px: 40 },
  md: { className: "size-14.5", px: 58 },
};

type AvatarProps = {
  /** 프로필 이미지가 없으면 빈 원으로 자리만 표시함 */
  src: string | null;
  alt: string;
  size?: AvatarSize;
  className?: string;
};

export default function Avatar({ src, alt, size = "sm", className }: AvatarProps) {
  // 불러오지 못한 주소를 기억해 두고 빈 원으로 바꿈. 주소가 바뀌면 다시 시도함
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const classes = cn("shrink-0 rounded-full object-cover", SIZE[size].className, className);

  function handleImageError() {
    setFailedSrc(src);
  }

  if (!src || failedSrc === src) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cn(classes, "block bg-natural-300")}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={SIZE[size].px}
      height={SIZE[size].px}
      // 구글 프로필 사진 서버는 referrer가 붙으면 403을 주는 경우가 있음
      referrerPolicy="no-referrer"
      onError={handleImageError}
      className={classes}
    />
  );
}
