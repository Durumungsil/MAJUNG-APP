import Image from "next/image";
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
  const classes = cn("shrink-0 rounded-full object-cover", SIZE[size].className, className);

  if (!src) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cn(classes, "block bg-natural-300")}
      />
    );
  }

  return (
    <Image src={src} alt={alt} width={SIZE[size].px} height={SIZE[size].px} className={classes} />
  );
}
