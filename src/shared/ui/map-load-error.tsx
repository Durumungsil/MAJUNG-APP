"use client";

import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { hasGoogleMapsConfig } from "@/shared/lib/google-maps";

/** 지도를 못 불러왔을 때 지도 자리를 덮는 안내. 키가 없으면 다시 시도해도 소용없으므로 버튼을 숨김 */
export default function MapLoadError() {
  // 구글 Maps SDK는 실패한 로드를 다시 시도하지 않으므로 새로고침으로 재시도
  function handleRetryClick() {
    window.location.reload();
  }

  return (
    <div
      role="alert"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-s text-text-secondary"
    >
      <p>{ERROR_MESSAGES.mapLoadFailed}</p>
      {hasGoogleMapsConfig() && (
        <button
          type="button"
          onClick={handleRetryClick}
          className="rounded-lg bg-primary-300 px-4 py-1 text-xs text-black"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
