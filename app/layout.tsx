import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/styles/fonts";
import { THEME_COLOR } from "@/shared/config/theme";
import "@/app/styles/index.css";

export const metadata: Metadata = {
  title: "MAJUNG",
  description: "MAJUNG",
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
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
