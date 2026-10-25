import { GOOGLE_AUTH_ENDPOINT, GOOGLE_AUTH_SCOPE } from "../config/google-oauth";

type GoogleAuthUrlParams = {
  clientId: string;
  redirectUri: string;
  /** 다른 사이트가 콜백을 위조하지 못하게 요청마다 새로 만드는 값 */
  state: string;
  /** ID 토큰 재사용을 막기 위해 토큰 안에 담겨 돌아오는 값 */
  nonce: string;
};

/** 구글 로그인 화면 주소. 결과 ID 토큰은 콜백 URL의 # 뒤(fragment)로 돌아옴 */
export function buildGoogleAuthUrl({ clientId, redirectUri, state, nonce }: GoogleAuthUrlParams) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "id_token",
    scope: GOOGLE_AUTH_SCOPE,
    state,
    nonce,
    prompt: "select_account",
  });
  return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
}

export type GoogleAuthResult =
  { ok: true; idToken: string; state: string } | { ok: false; reason: "denied" | "invalid" };

/** 콜백 URL의 fragment(`#id_token=...&state=...`)를 해석함 */
export function parseGoogleAuthFragment(hash: string): GoogleAuthResult {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  if (params.has("error")) return { ok: false, reason: "denied" };

  const idToken = params.get("id_token");
  const state = params.get("state");
  if (!idToken || !state) return { ok: false, reason: "invalid" };

  return { ok: true, idToken, state };
}

/** ID 토큰(JWT) 본문의 nonce. 서명 검증은 백엔드가 하므로 여기서는 값 비교용으로만 읽음 */
export function getIdTokenNonce(idToken: string): string | null {
  const payload = idToken.split(".")[1];
  if (!payload) return null;

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json: unknown = JSON.parse(atob(base64));
    if (typeof json === "object" && json !== null && "nonce" in json) {
      return typeof json.nonce === "string" ? json.nonce : null;
    }
    return null;
  } catch {
    return null;
  }
}
