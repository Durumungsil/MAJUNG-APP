const STORAGE_KEY = "majung-google-auth-request";

type PendingAuthRequest = {
  state: string;
  nonce: string;
};

/** 구글로 떠나기 전에 state·nonce를 보관함. 탭이 닫히면 사라지도록 sessionStorage 사용 */
export function savePendingAuthRequest(request: PendingAuthRequest) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(request));
}

/** 보관한 state·nonce를 꺼내고 바로 지움 (한 번만 쓸 수 있게) */
export function takePendingAuthRequest(): PendingAuthRequest | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PendingAuthRequest;
  } catch {
    return null;
  }
}
