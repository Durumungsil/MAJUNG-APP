// 도착 판정은 서버가 함(목적지 반경 안이면 완료). 위치가 바뀔 때마다 요청하지 않도록 다시 시도하는 간격을 둠

/** 지난 시도 위치에서 이만큼 움직이면 다시 완료를 요청함 */
export const COMPLETION_RETRY_DISTANCE_METERS = 20;

/** 제자리에 있어도 이 시간이 지나면 다시 요청함 (GPS 정확도가 나아졌을 수 있음) */
export const COMPLETION_RETRY_INTERVAL_MS = 15_000;
