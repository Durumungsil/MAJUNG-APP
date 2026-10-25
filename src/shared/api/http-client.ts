import { API_BASE_URL } from "@/shared/config/env";

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
  /** 로그인 후 받은 access 토큰. 넘기면 Authorization: Bearer 헤더를 붙임 */
  accessToken?: string;
};

/** 서버 원문 메시지는 화면에 보여주지 않으므로 상태 코드만 들고 다님 */
export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

/** 백엔드 API를 호출하고 응답의 data만 돌려줌 */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, accessToken }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers();
  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) throw new ApiError(response.status);

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}
