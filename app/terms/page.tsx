import type { Metadata } from "next";
import { TermsOfServicePage } from "@/views/terms-of-service";

export const metadata: Metadata = {
  title: "이용약관",
  description: "MAJUNG 서비스 이용약관",
};

export default function Page() {
  return <TermsOfServicePage />;
}
