export const userKeys = {
  all: ["users"] as const,
  groupMembers: (groupId: number) => [...userKeys.all, "group-members", groupId] as const,
};
