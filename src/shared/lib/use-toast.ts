"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const TOAST_DURATION_MS = 2000;

/** Toast 컴포넌트에 넘길 메시지와, 메시지를 잠깐 띄우는 함수 */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((nextMessage: string) => {
    clearTimeout(timerRef.current);
    setMessage(nextMessage);
    timerRef.current = setTimeout(() => setMessage(null), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toastMessage: message, showToast };
}
