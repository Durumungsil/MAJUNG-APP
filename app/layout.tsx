import type { Metadata, Viewport } from "next";
import AuthGuard from "@/app/providers/auth-guard";
import QueryProvider from "@/app/providers/query-provider";
import ServiceWorkerRegister from "@/app/providers/service-worker-register";
import { fontVariables } from "@/app/styles/fonts";
import { GOOGLE_SITE_VERIFICATION } from "@/shared/config/env";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/config/site";
import { THEME_COLOR } from "@/shared/config/theme";
import "@/app/styles/index.css";

const DEFAULT_TITLE = `${SITE_NAME} - 그룹 여행 취향을 모아 장소를 추천하는 서비스`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ko_KR",
  },
  // Search Console 소유권 확인 태그. 값이 없으면 태그를 넣지 않음
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  appleWebApp: {
    capable: true,
    title: "MAJUNG",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: THEME_COLOR,
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${fontVariables} antialiased`}>
      <body className="min-h-dvh">
        <ServiceWorkerRegister />
        <div className="relative mx-auto flex min-h-dvh w-full max-w-mobile flex-col bg-background">
          <QueryProvider>
            <AuthGuard>{children}</AuthGuard>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
