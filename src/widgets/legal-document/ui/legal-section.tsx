import type { ReactNode } from "react";

type LegalSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** 문서의 조항 하나 (제목 + 본문) */
export default function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="text-m">
        {title}
      </h2>
      {children}
    </section>
  );
}
