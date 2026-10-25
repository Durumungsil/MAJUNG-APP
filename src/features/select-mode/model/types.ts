import type { TripMode } from "@/entities/group";

export type TravelModeId = "extreme" | "story" | "adventure";

export type TravelMode = {
  id: TravelModeId;
  /** 백엔드 TripMode 값 */
  apiValue: TripMode;
  name: string;
  /** Figma에 확정된 설명이 있는 모드만 값이 있음 */
  description?: string;
};
