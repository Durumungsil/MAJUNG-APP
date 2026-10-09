import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/styles/fonts";
import { THEME_COLOR } from "@/shared/config/theme";
import "@/app/styles/index.css";

export const metadata: Metadata = {
  // TODO: 서비스 소개 문구로 교체 (PWA 설치 화면, 검색 결과에 노출됨)
  title: "MAJUNG",
  description: "MAJUNG",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
