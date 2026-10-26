export const placeKeys = {
  all: ["places"] as const,
  recommendations: (groupId: number) => [...placeKeys.all, "recommendations", groupId] as const,
};
