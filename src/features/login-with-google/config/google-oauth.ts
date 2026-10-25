export const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";

/** ID 토큰에 sub·email·name이 들어오도록 요청하는 범위 */
export const GOOGLE_AUTH_SCOPE = "openid email profile";

/** 구글이 로그인 후 돌려보내는 경로. 구글 콘솔의 승인된 리디렉션 URI와 같아야 함 */
export const LOGIN_CALLBACK_PATH = "/login/callback";
