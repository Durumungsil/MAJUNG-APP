import { apiRequest } from "@/shared/api";
import type { Group, GroupSummary, InvitationPreview, InviteCode, Trip } from "../model/types";
import type {
  CreateTripRequest,
  GroupDetailResponse,
  GroupListResponse,
  InviteCodeResponse,
  TripListResponse,
  TripResponse,
  VerifyInviteCodeResponse,
} from "./dto";

function toTrip(trip: TripListResponse["items"][number]): Trip {
  return {
    id: trip.trip_id,
    region: trip.region,
    mode: trip.mode,
    status: trip.status,
    startDate: trip.travel_start_date,
    endDate: trip.travel_end_date,
  };
}

/** 그룹 목록 조회 - 내가 속한 그룹 */
export async function fetchMyGroups(): Promise<GroupSummary[]> {
  const data = await apiRequest<GroupListResponse>("/api/v1/groups");
  return data.items.map((item) => ({
    id: item.group_id,
    name: item.group_name,
    region: item.region,
    tripId: item.trip_id,
    mode: item.mode,
    memberCount: item.member_count,
    maxMembers: item.max_members,
    startDate: item.travel_start_date,
    endDate: item.travel_end_date,
    myPreferencesCompleted: item.my_preferences_completed,
  }));
}

/** 그룹 상세 조회 */
export async function fetchGroup(groupId: number): Promise<Group> {
  const data = await apiRequest<GroupDetailResponse>(`/api/v1/groups/${groupId}`);
  return {
    id: data.group_id,
    name: data.group_name,
    region: data.region,
    memberCount: data.member_count,
    maxMembers: data.max_members,
    ownerId: data.owner_id,
    tripId: data.trip_id,
    status: data.status,
    mode: data.mode,
    preferencesCompletedCount: data.preferences_completed,
    startDate: data.travel_start_date,
    endDate: data.travel_end_date,
  };
}

/** 그룹 초대 코드 조회 */
export async function fetchInviteCode(groupId: number): Promise<InviteCode> {
  const data = await apiRequest<InviteCodeResponse>(`/api/v1/groups/${groupId}/code`);
  return {
    groupId: data.group_id,
    groupName: data.group_name,
    code: data.invite_code,
    expiresAt: data.expires_at,
  };
}

/** 초대 코드 검증 - 참여 전에 어떤 그룹인지 확인 (정원 초과면 403) */
export async function verifyInviteCode(inviteCode: string): Promise<InvitationPreview> {
  const data = await apiRequest<VerifyInviteCodeResponse>(
    `/api/v1/groups/invitations/${encodeURIComponent(inviteCode)}`,
  );
  return {
    groupId: data.group_id,
    groupName: data.group_name,
    region: data.region,
    memberCount: data.member_count,
    maxMembers: data.max_members,
    joinable: data.joinable,
  };
}

/** 여행 회차 목록 */
export async function fetchTrips(groupId: number): Promise<Trip[]> {
  const data = await apiRequest<TripListResponse>(`/api/v1/groups/${groupId}/trips`);
  return data.items.map(toTrip);
}

/** 여행 회차 생성 - 지난 여행이 끝난 그룹에서 새 여행을 시작할 때 */
export async function createTrip(
  groupId: number,
  values: { region: string; startDate: string; endDate: string },
): Promise<Trip> {
  const body: CreateTripRequest = {
    region: values.region,
    travel_start_date: values.startDate,
    travel_end_date: values.endDate,
  };
  const data = await apiRequest<TripResponse>(`/api/v1/groups/${groupId}/trips`, {
    method: "POST",
    body,
  });
  return toTrip(data);
}
