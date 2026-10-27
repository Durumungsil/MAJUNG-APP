import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "xl" | "xl-compact" | "lg" | "md" | "sm" | "xs";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-primary-400",
  secondary: "bg-primary-300",
  tertiary: "bg-primary-200",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  /** Figma 텍스트 스타일 L(20px)을 쓰는 하단 주요 버튼 */
  xl: "w-full px-5 py-2 text-l",
  /** 카드 안에 들어가는 L(20px) 버튼 (예: 룰렛 돌리기) */
  "xl-compact": "w-full px-5 py-1.5 text-l",
  lg: "w-full px-5 py-2 text-m",
  md: "px-5 py-1.5 text-s",
  sm: "px-5 py-1.25 text-s",
  /** 글자 폭에 맞춤 (입력칸 옆 확인 버튼 등) */
  xs: "px-2.5 py-1.25 text-s",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
  );

export default function Button({
  variant = "secondary",
  size = "lg",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "flex shrink-0 items-center justify-center overflow-clip rounded-lg text-center whitespace-nowrap text-black disabled:opacity-50",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    icon !== undefined && "gap-3",
    className,
  );

  if (props.href !== undefined) {
    return (
      <Link className={classes} {...props}>
        {icon}
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
}
