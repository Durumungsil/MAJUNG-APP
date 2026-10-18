import Image from "next/image";
import { cn } from "@/shared/lib";

type AvatarSize = "sm" | "md";

const SIZE: Record<AvatarSize, { className: string; px: number }> = {
  sm: { className: "size-10", px: 40 },
  md: { className: "size-14.5", px: 58 },
};

type AvatarProps = {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
};

export default function Avatar({ src, alt, size = "sm", className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={SIZE[size].px}
      height={SIZE[size].px}
      className={cn("shrink-0 rounded-full object-cover", SIZE[size].className, className)}
    />
  );
}
