"use client";

import { useEffect, useRef, useState } from "react";
import { SPIN_DURATION_MS, SPIN_MIN_TURNS } from "../config/spin";
import { getNextRotation, pickRandom } from "../lib/spin";

/** 휠 회전 각도와 결과. 회전이 끝나면 result가 채워짐 */
export function useRouletteSpin<T>(candidates: readonly T[]) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function spin() {
    if (spinning) return;
    const picked = pickRandom(candidates, Math.random());
    if (picked === null) return;

    setResult(null);
    setSpinning(true);
    setRotation((prev) => getNextRotation(prev, SPIN_MIN_TURNS, Math.random()));
    timerRef.current = window.setTimeout(() => {
      setSpinning(false);
      setResult(picked);
    }, SPIN_DURATION_MS);
  }

  function clearResult() {
    setResult(null);
  }

  return { rotation, spinning, result, spin, clearResult };
}
