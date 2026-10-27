"use client";

import { useEffect, useRef, useState } from "react";
import { SPIN_DURATION_MS, SPIN_MIN_TURNS } from "../config/spin";
import { getNextRotation, getRemainingSpinMs } from "../lib/spin";

type UseRouletteSpinOptions<T> = {
  /** 결과를 정하는 요청. 휠은 요청과 동시에 돌기 시작함 */
  draw: () => Promise<T>;
  onError: (error: unknown) => void;
};

/** 휠 회전 각도와 결과. 요청 응답과 회전이 모두 끝나면 result가 채워짐 */
export function useRouletteSpin<T>({ draw, onError }: UseRouletteSpinOptions<T>) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  // 응답이 빨리 와도 휠이 멈춘 뒤에 결과·오류를 보여줌
  function afterSpinStops(startedAt: number, callback: () => void) {
    const remaining = getRemainingSpinMs(Date.now() - startedAt, SPIN_DURATION_MS);
    timerRef.current = window.setTimeout(() => {
      setSpinning(false);
      callback();
    }, remaining);
  }

  function spin() {
    if (spinning) return;
    const startedAt = Date.now();

    setResult(null);
    setSpinning(true);
    setRotation((prev) => getNextRotation(prev, SPIN_MIN_TURNS, Math.random()));
    draw().then(
      (drawn) => afterSpinStops(startedAt, () => setResult(drawn)),
      (error: unknown) => afterSpinStops(startedAt, () => onError(error)),
    );
  }

  function clearResult() {
    setResult(null);
  }

  return { rotation, spinning, result, spin, clearResult };
}
