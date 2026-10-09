import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

export const primaryFont = localFont({
  src: "../../shared/assets/fonts/lee-seoyun.woff2",
  variable: "--font-primary",
  weight: "400",
  display: "swap",
});

export const pointFont = localFont({
  src: "../../shared/assets/fonts/ok-mallang-b.woff2",
  variable: "--font-secondary",
  weight: "400",
  display: "swap",
});

export const codeFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const fontVariables = `${primaryFont.variable} ${pointFont.variable} ${codeFont.variable}`;
