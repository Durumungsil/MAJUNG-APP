import { getDistanceMeters } from "@/shared/lib/get-distance-meters";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import { COMPLETION_RETRY_DISTANCE_METERS, COMPLETION_RETRY_INTERVAL_MS } from "../config/attempt";

export type CompletionAttempt = {
  position: LatLngLiteral;
  /** epoch ms */
  attemptedAt: number;
};

/** 지난 완료 요청 이후 충분히 움직였거나 시간이 지났으면 다시 요청함. 처음이면 바로 요청 */
export function shouldAttemptCompletion(
  lastAttempt: CompletionAttempt | null,
  position: LatLngLiteral,
  now: number,
): boolean {
  if (lastAttempt === null) return true;
  return (
    getDistanceMeters(lastAttempt.position, position) >= COMPLETION_RETRY_DISTANCE_METERS ||
    now - lastAttempt.attemptedAt >= COMPLETION_RETRY_INTERVAL_MS
  );
}
