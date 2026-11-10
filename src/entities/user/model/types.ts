export type Member = {
  id: number;
  nickname: string;
  /** 구글 프로필 사진. 없으면 null */
  avatarUrl: string | null;
  isLeader: boolean;
};
