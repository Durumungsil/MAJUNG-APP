export const groupKeys = {
  all: ["groups"] as const,
  list: () => [...groupKeys.all, "list"] as const,
  detail: (groupId: number) => [...groupKeys.all, "detail", groupId] as const,
  inviteCode: (groupId: number) => [...groupKeys.detail(groupId), "invite-code"] as const,
  trips: (groupId: number) => [...groupKeys.detail(groupId), "trips"] as const,
};
