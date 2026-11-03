import type { ReactNode } from "react";
import { BackHeader, Screen } from "@/shared/ui";

type LegalDocumentProps = {
  title: string;
  /** 시행일 (예: 2026년 11월 3일) */
  effectiveDate: string;
  footer?: ReactNode;
  children: ReactNode;
};

/** 개인정보처리방침·이용약관 같은 정적 문서 화면 틀. 서버 HTML에 본문이 그대로 들어가도록 서버 컴포넌트로 둠 */
export default function LegalDocument({
  title,
  effectiveDate,
  footer,
  children,
}: LegalDocumentProps) {
  return (
    <Screen className="gap-8 text-text-primary">
      <BackHeader backHref="/" size="sm" title={title} />
      <article className="flex flex-col gap-8 text-xs leading-relaxed">
        <p className="text-text-secondary">시행일자: {effectiveDate}</p>
        {children}
      </article>
      {footer}
    </Screen>
  );
}
