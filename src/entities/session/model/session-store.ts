import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Session } from "./types";

interface SessionState {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

const SESSION_STORAGE_KEY = "majung-session";

// 새로고침해도 로그인이 유지되도록 localStorage에 토큰만 저장함 (민감 정보는 넣지 말 것)
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// persist는 다른 탭의 변경을 자동으로 반영하지 않음. 다른 탭에서 로그인·로그아웃하면
// 이 탭은 이전 계정 세션을 메모리에 들고 있게 되므로 storage 이벤트로 다시 불러옴
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === SESSION_STORAGE_KEY || event.key === null) {
      void useSessionStore.persist.rehydrate();
    }
  });
}
