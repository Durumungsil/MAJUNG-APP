import type { ReactNode } from "react";

type FormRowProps = {
  label: string;
  htmlFor: string;
  hint?: ReactNode;
  children: ReactNode;
};

/** 왼쪽 라벨 + 오른쪽 입력 필드 한 줄 */
export default function FormRow({ label, htmlFor, hint, children }: FormRowProps) {
  return (
    <div className="flex items-start gap-4">
      <label htmlFor={htmlFor} className="w-17 shrink-0 py-1 text-m text-text-primary">
        {label}
      </label>
      <div className="flex flex-1 flex-col gap-1.25">
        {children}
        {hint}
      </div>
    </div>
  );
}
