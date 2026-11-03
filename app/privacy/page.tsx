import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/views/privacy-policy";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "MAJUNG이 수집하는 개인정보 항목, 이용 목적, 보유 기간과 Google 사용자 데이터 취급 방식",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
