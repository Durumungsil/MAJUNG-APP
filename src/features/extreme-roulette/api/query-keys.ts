export const rouletteKeys = {
  all: ["roulette"] as const,
  result: (groupId: number, rouletteId: number) =>
    [...rouletteKeys.all, "result", groupId, rouletteId] as const,
  allergies: (groupId: number) => [...rouletteKeys.all, "allergies", groupId] as const,
};
