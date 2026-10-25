import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Session } from "./types";

interface SessionState {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

// 새로고침해도 로그인이 유지되도록 localStorage에 토큰만 저장함 (민감 정보는 넣지 말 것)
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "majung-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
