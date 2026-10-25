/** 백엔드가 발급한 로그인 세션 */
export type Session = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};
