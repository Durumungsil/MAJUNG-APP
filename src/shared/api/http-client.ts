import { API_BASE_URL, API_FALLBACK_BASE_URL } from "@/shared/config/env";

/** 백엔드 공통 응답 형태 { success, message, data } */
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
};

/** 서버 원문 메시지는 화면에 보여주지 않으므로 상태 코드만 들고 다님 */
export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

export function isApiError(error: unknown, ...statuses: number[]): error is ApiError {
  return error instanceof ApiError && (statuses.length === 0 || statuses.includes(error.status));
}

type AuthHandlers = {
  /** 요청마다 현재 access 토큰을 읽어 Authorization: Bearer 헤더에 붙임 */
  getAccessToken: () => string | null;
  /** 401을 받으면 호출됨 (세션 정리 → 로그인 화면 이동) */
  onUnauthorized: () => void;
};

let authHandlers: AuthHandlers | null = null;

/** shared는 세션(entities)을 모르므로, 앱 레이어에서 토큰 읽는 방법을 주입함 */
export function configureApiAuth(handlers: AuthHandlers) {
  authHandlers = handlers;
}

/** 서버 앱까지 요청이 닿지 못했다는 뜻의 게이트웨이 응답 (Cloudflare 52x 포함) */
const SERVER_DOWN_STATUSES = new Set([502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 530]);

/** 기본 서버가 죽은 걸 확인한 뒤 이 시간 동안은 바로 2차 서버로 보냄 */
const PRIMARY_RETRY_COOLDOWN_MS = 30_000;

let primaryDownUntil = 0;

/** 기본 서버로 보내고, 서버가 죽어 있으면 2차 서버(API_FALLBACK_BASE_URL)로 다시 보냄 */
async function fetchWithFallback(path: string, init: RequestInit): Promise<Response> {
  if (!API_FALLBACK_BASE_URL) return fetch(`${API_BASE_URL}${path}`, init);

  if (Date.now() < primaryDownUntil) return fetch(`${API_FALLBACK_BASE_URL}${path}`, init);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, init);
    if (!SERVER_DOWN_STATUSES.has(response.status)) return response;
  } catch {
    // 연결 자체가 안 됨 (DNS 실패, 연결 거부, CORS 응답 없음 등)
  }

  primaryDownUntil = Date.now() + PRIMARY_RETRY_COOLDOWN_MS;
  return fetch(`${API_FALLBACK_BASE_URL}${path}`, init);
}

/** 백엔드 API를 호출하고 응답의 data만 돌려줌 */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers();
  if (body !== undefined) headers.set("Content-Type", "application/json");
  const accessToken = authHandlers?.getAccessToken();
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetchWithFallback(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 401 && accessToken) authHandlers?.onUnauthorized();
    throw new ApiError(response.status);
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}
