/** POST /api/v1/auth/google 응답. 백엔드 JSON이 snake_case라서 필드 이름도 그대로 따름 */
export type LoginResponse = {
  user_id: number;
  /** 이번 로그인으로 회원가입된 경우 true (온보딩 화면 분기용) */
  first_login: boolean;
  access_token: string;
  refresh_token: string;
  token_type: string;
  /** access 토큰 유효 기간(초) */
  expires_in: number;
};
