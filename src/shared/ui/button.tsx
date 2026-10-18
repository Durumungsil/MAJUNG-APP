import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "lg" | "sm";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-primary-400",
  secondary: "bg-primary-300",
  tertiary: "bg-primary-200",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  lg: "w-full px-5 py-2 text-m",
  sm: "w-25 px-2.5 py-1.25 text-s",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "flex items-center justify-center overflow-clip rounded-lg text-center text-black disabled:opacity-50",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  );

  if (props.href !== undefined) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
