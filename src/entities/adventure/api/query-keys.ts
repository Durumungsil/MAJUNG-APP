export const adventureKeys = {
  all: ["adventure"] as const,
  group: (groupId: number) => [...adventureKeys.all, groupId] as const,
  process: (groupId: number, processId: number) =>
    [...adventureKeys.group(groupId), "process", processId] as const,
  currentMission: (groupId: number) =>
    [...adventureKeys.group(groupId), "current-mission"] as const,
};
