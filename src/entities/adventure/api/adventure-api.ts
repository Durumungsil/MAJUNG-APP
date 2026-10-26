import { apiRequest, isApiError } from "@/shared/api";
import type { LatLngLiteral } from "@/shared/model/lat-lng";
import type {
  AdventureProcess,
  CompletedMission,
  CreatedAdventure,
  CurrentMission,
  MissionHint,
} from "../model/types";
import type {
  AdventureProcessResponse,
  CompleteMissionRequest,
  CompleteMissionResponse,
  CreateAdventureRequest,
  CreateAdventureResponse,
  CurrentMissionResponse,
  MissionHintResponse,
  MissionLocationRequest,
  StartMissionResponse,
} from "./dto";

function toLocationRequest(position: LatLngLiteral): MissionLocationRequest {
  return { latitude: position.lat, longitude: position.lng };
}

/** 자동 여행 커리큘럼 생성 - 날짜마다 하나뿐이라 이미 있으면 409 */
export async function createAdventureProcess(
  groupId: number,
  values: { travelDate: string; missionCount: number },
): Promise<CreatedAdventure> {
  const body: CreateAdventureRequest = {
    travel_date: values.travelDate,
    mission_count: values.missionCount,
  };
  const data = await apiRequest<CreateAdventureResponse>(
    `/api/v1/groups/${groupId}/adventure/process`,
    { method: "POST", body },
  );
  return {
    processId: data.process_id,
    status: data.status,
    missionCount: data.mission_count,
    firstMissionId: data.first_mission_id,
  };
}

/** 진행도 조회 */
export async function fetchAdventureProcess(
  groupId: number,
  processId: number,
): Promise<AdventureProcess> {
  const data = await apiRequest<AdventureProcessResponse>(
    `/api/v1/groups/${groupId}/adventure/process/${processId}`,
  );
  return {
    id: data.process_id,
    status: data.status,
    completedCount: data.progress.completed,
    totalCount: data.progress.total,
    currentMissionId: data.current_mission_id,
    missions: data.missions.map((mission) => ({
      id: mission.mission_id,
      order: mission.order,
      status: mission.status,
      completedAt: mission.completed_at ?? null,
    })),
  };
}

/** 현재 미션 조회 - 오늘 진행할 수 있는 미션이 없으면(404) null */
export async function fetchCurrentMission(groupId: number): Promise<CurrentMission | null> {
  try {
    const data = await apiRequest<CurrentMissionResponse>(
      `/api/v1/groups/${groupId}/missions/current`,
    );
    return {
      id: data.mission_id,
      order: data.order,
      status: data.status,
      title: data.title,
      objective: data.objective,
      hintCount: data.hint_count,
      startedAt: data.started_at,
    };
  } catch (error) {
    if (isApiError(error, 404)) return null;
    throw error;
  }
}

/** 미션 시작 - 요청한 위치를 출발점으로 기록함. 이미 시작했으면 처음 기록을 그대로 돌려줌 */
export async function startMission(
  groupId: number,
  missionId: number,
  position: LatLngLiteral,
): Promise<{ missionId: number; startedAt: string }> {
  const data = await apiRequest<StartMissionResponse>(
    `/api/v1/groups/${groupId}/missions/${missionId}/start`,
    { method: "POST", body: toLocationRequest(position) },
  );
  return { missionId: data.mission_id, startedAt: data.started_at };
}

/** 힌트 제공 - 부를 때마다 힌트 사용 횟수가 오르므로 로드뷰를 보는 동안 다시 부르지 말 것 */
export async function fetchMissionHint(groupId: number, missionId: number): Promise<MissionHint> {
  const data = await apiRequest<MissionHintResponse>(
    `/api/v1/groups/${groupId}/missions/${missionId}/hint`,
  );
  return {
    missionId: data.mission_id,
    location: { lat: data.latitude, lng: data.longitude },
    viewSeconds: data.view_seconds,
    hintCount: data.hint_count,
  };
}

/** 미션 완료 - 서버가 위치를 검증함. 목적지 반경 밖이면 400이고 미션은 다시 시도할 수 있음 */
export async function completeMission(
  groupId: number,
  missionId: number,
  position: LatLngLiteral,
): Promise<CompletedMission> {
  const body: CompleteMissionRequest = toLocationRequest(position);
  const data = await apiRequest<CompleteMissionResponse>(
    `/api/v1/groups/${groupId}/missions/${missionId}/complete`,
    { method: "POST", body },
  );
  return {
    missionId: data.mission_id,
    status: data.status,
    nextMissionId: data.next_mission_id,
    completedAt: data.completed_at,
  };
}
