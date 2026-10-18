import { create } from "zustand";

interface CreatedGroupState {
  /** 방금 생성한 그룹의 초대 코드. 그룹 목록에서 완료 모달을 띄우는 데 사용 */
  inviteCode: string | null;
  setInviteCode: (inviteCode: string) => void;
  clear: () => void;
}

// 브라우저 메모리에만 둠 (새로고침 시 초기화)
export const useCreatedGroupStore = create<CreatedGroupState>()((set) => ({
  inviteCode: null,
  setInviteCode: (inviteCode) => set({ inviteCode }),
  clear: () => set({ inviteCode: null }),
}));
