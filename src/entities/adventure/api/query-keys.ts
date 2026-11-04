import type { LatLngLiteral } from "@/shared/model/lat-lng";

export const adventureKeys = {
  all: ["adventure"] as const,
  group: (groupId: number) => [...adventureKeys.all, groupId] as const,
  todayProcess: (groupId: number) => [...adventureKeys.group(groupId), "today-process"] as const,
  currentMission: (groupId: number) =>
    [...adventureKeys.group(groupId), "current-mission"] as const,
  distance: (groupId: number, missionId: number, position: LatLngLiteral | null) =>
    [...adventureKeys.group(groupId), "distance", missionId, position] as const,
};
