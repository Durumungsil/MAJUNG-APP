import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 멤버 프로필 사진(구글 계정 사진)
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" }],
  },
  async headers() {
    return [
      {
        // 서비스 워커는 항상 최신 버전을 받도록 브라우저 캐시를 끔
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
