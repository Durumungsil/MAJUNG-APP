import type { NextConfig } from "next";
import withPWAInit, { runtimeCaching } from "@ducanh2912/next-pwa";

// 정적 에셋만 캐시함. 페이지·RSC·API·cross-origin(Supabase) 응답은 설문 응답 같은
// 민감 정보가 Cache Storage에 남을 수 있어 제외 (AGENTS.md §8)
const STATIC_CACHE_NAMES = new Set([
  "google-fonts-webfonts",
  "google-fonts-stylesheets",
  "static-font-assets",
  "static-image-assets",
  "next-static-js-assets",
  "next-image",
  "static-audio-assets",
  "static-video-assets",
  "static-js-assets",
  "static-style-assets",
]);

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // 시작 페이지(/) HTML도 로그인 사용자 화면이므로 캐시하지 않음
  cacheStartUrl: false,
  dynamicStartUrl: false,
  workboxOptions: {
    runtimeCaching: runtimeCaching.filter(
      (entry) =>
        entry.options?.cacheName != null && STATIC_CACHE_NAMES.has(entry.options.cacheName),
    ),
  },
});

const nextConfig: NextConfig = {};

export default withPWA(nextConfig);
