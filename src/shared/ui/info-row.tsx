import type { ReactNode } from "react";

type InfoRowProps = {
  label: string;
  children: ReactNode;
};

/** 라벨과 값을 양 끝에 배치하는 읽기 전용 행 */
export default function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between text-m">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="text-text-primary">{children}</dd>
    </div>
  );
}
