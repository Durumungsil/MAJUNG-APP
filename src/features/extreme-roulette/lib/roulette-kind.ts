import { ROULETTE_KINDS } from "../config/roulette-kinds";
import type { RouletteKind } from "../model/types";

/** URL 경로 값이 룰렛 종류인지 확인 */
export function isRouletteKind(value: string): value is RouletteKind {
  return (ROULETTE_KINDS as string[]).includes(value);
}
