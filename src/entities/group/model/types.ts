export type GroupRole = "leader" | "member";

export type Group = {
  id: string;
  name: string;
  destination: string;
  leaderName: string;
  memberCount: number;
  maxMembers: number;
  tripCount: number;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
  /** YYYY-MM-DD */
  createdAt: string;
  inviteCode: string;
  myRole: GroupRole;
  hasPendingSurvey: boolean;
};

export type GroupFormValues = {
  name: string;
  destination: string;
  maxMembers: string;
  startDate: string;
  endDate: string;
};
