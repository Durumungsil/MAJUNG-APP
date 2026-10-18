import localFont from "next/font/local";

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

export const fontVariables = `${primaryFont.variable} ${pointFont.variable}`;
