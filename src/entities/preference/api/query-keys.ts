export const preferenceKeys = {
  all: ["preferences"] as const,
  summary: (groupId: number) => [...preferenceKeys.all, "summary", groupId] as const,
};
