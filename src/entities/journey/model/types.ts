import type { LatLng } from "@/shared/model";

/** 타임라인의 한 칸. 시간은 "HH:mm" */
export type JourneyStop = {
  id: string;
  startTime: string;
  endTime: string;
  placeName: string;
  location: LatLng;
};
