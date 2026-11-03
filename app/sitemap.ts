import type { MetadataRoute } from "next";
import { PRIVACY_PATH, TERMS_PATH } from "@/shared/config/routes";
import { SITE_URL } from "@/shared/config/site";

/** 로그인 없이 볼 수 있는 공개 화면만 넣음 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", PRIVACY_PATH, TERMS_PATH].map((path) => ({ url: `${SITE_URL}${path}` }));
}
