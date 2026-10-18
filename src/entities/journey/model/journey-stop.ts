import type { LatLngLiteral } from "@/shared/model/lat-lng";

export interface JourneyStop {
  id: string;
  placeName: string;
  location: LatLngLiteral;
  rank: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
}

export type MissionPhase = "searching" | "succeeded" | "exploring";
