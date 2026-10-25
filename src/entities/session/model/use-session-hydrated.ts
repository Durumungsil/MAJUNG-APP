import { useSyncExternalStore } from "react";
import { useSessionStore } from "./session-store";

/** localStorage에서 세션을 다 불러왔는지. 불러오기 전에는 로그인 여부를 판단하면 안 됨 */
export function useSessionHydrated() {
  return useSyncExternalStore(
    (onChange) => useSessionStore.persist.onFinishHydration(onChange),
    () => useSessionStore.persist.hasHydrated(),
    () => false,
  );
}
