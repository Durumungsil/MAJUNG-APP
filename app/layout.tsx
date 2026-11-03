import type { Metadata, Viewport } from "next";
import AuthGuard from "@/app/providers/auth-guard";
import QueryProvider from "@/app/providers/query-provider";
import ServiceWorkerRegister from "@/app/providers/service-worker-register";
import { fontVariables } from "@/app/styles/fonts";
import { THEME_COLOR } from "@/shared/config/theme";
import "@/app/styles/index.css";

export const metadata: Metadata = {
  title: "MAJUNG",
  description: "MAJUNG",
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
