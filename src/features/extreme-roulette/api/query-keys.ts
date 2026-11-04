export const rouletteKeys = {
  all: ["roulette"] as const,
  result: (groupId: number, rouletteId: number) =>
    [...rouletteKeys.all, "result", groupId, rouletteId] as const,
  confirmed: (groupId: number) => [...rouletteKeys.all, "confirmed", groupId] as const,
  allergies: (groupId: number) => [...rouletteKeys.all, "allergies", groupId] as const,
};
