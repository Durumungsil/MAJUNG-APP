"use client";

import { useEffect, useRef } from "react";

/**
 * ref를 단 요소가 화면에 보이면 onIntersect를 부름 (무한 스크롤 트리거용).
 * enabled가 false면 관찰하지 않음
 */
export function useIntersection<T extends Element>(onIntersect: () => void, enabled: boolean) {
  const targetRef = useRef<T>(null);
  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const target = targetRef.current;
    if (!enabled || !target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) callbackRef.current();
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled]);

  return targetRef;
}
