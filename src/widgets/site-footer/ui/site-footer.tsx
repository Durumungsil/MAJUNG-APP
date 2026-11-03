import Link from "next/link";
import { PRIVACY_PATH, TERMS_PATH } from "@/shared/config/routes";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/shared/config/site";
import { cn } from "@/shared/lib";

type SiteFooterProps = {
  className?: string;
};

/** 소개·정책·로그인 화면 하단의 정책 링크와 운영 주체·문의처 */
export default function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("flex flex-col gap-2 text-xs text-text-secondary", className)}>
      <nav aria-label="정책" className="flex gap-4">
        <Link href={PRIVACY_PATH} className="underline">
          개인정보처리방침
        </Link>
        <Link href={TERMS_PATH} className="underline">
          이용약관
        </Link>
      </nav>
      <p>
        운영: {OPERATOR_NAME} · 문의:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>© {SITE_NAME}</p>
    </footer>
  );
}
