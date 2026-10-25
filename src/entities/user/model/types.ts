export type Member = {
  id: number;
  nickname: string;
  /** 백엔드가 아직 프로필 이미지를 내려주지 않아 null */
  avatarUrl: string | null;
  isLeader: boolean;
};
