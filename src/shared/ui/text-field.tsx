import type { ComponentProps } from "react";
import { cn } from "@/shared/lib";

type TextFieldProps = Omit<ComponentProps<"input">, "size"> & {
  size?: "md" | "sm";
};

const SIZE_CLASS = {
  md: "py-2",
  sm: "py-1.25",
} as const;

export default function TextField({ size = "md", className, ...props }: TextFieldProps) {
  return (
    <input
      className={cn(
        "w-full min-w-0 rounded-lg bg-natural-200 px-2.5 text-xs text-text-primary outline-none placeholder:text-text-muted focus-visible:ring-1 focus-visible:ring-primary-400 aria-invalid:ring-1 aria-invalid:ring-red",
        SIZE_CLASS[size],
        className,
      )}
      {...props}
    />
  );
}
