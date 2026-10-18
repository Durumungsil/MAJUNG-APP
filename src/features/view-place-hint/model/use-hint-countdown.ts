"use client";

import { useEffect, useState } from "react";
import { getRemainingSeconds } from "../lib/hint-countdown";

const TICK_MS = 250;

interface HintCountdown {
  remainingSeconds: number;
  isStarted: boolean;
  isExpired: boolean;
  start: () => void;
}

export function useHintCountdown(limitSeconds: number): HintCountdown {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const remainingSeconds =
    startedAt === null || now === null
      ? limitSeconds
      : getRemainingSeconds(startedAt, now, limitSeconds);
  const isStarted = startedAt !== null;
  const isExpired = isStarted && remainingSeconds === 0;

  useEffect(() => {
    if (!isStarted || isExpired) return;
    const intervalId = window.setInterval(() => setNow(Date.now()), TICK_MS);
    return () => window.clearInterval(intervalId);
  }, [isStarted, isExpired]);

  function start() {
    const startTime = Date.now();
    setStartedAt(startTime);
    setNow(startTime);
  }

  return { remainingSeconds, isStarted, isExpired, start };
}
