"use client";

import { useEffect } from "react";
import { IS_PRODUCTION } from "@/shared/config/env";

export default function ServiceWorkerRegister() {
  // 개발 중에는 캐시가 HMR을 방해하므로 production에서만 등록함
  useEffect(() => {
    if (!IS_PRODUCTION || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" });
  }, []);

  return null;
}
