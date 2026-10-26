import type { MissionProgress } from "@/entities/adventure";
import type { JourneyStop } from "@/entities/journey";

/**
 * 진행도 응답을 여정 카드로 바꿈.
 * 목적지명·랭크·시작 시각은 API가 내려주지 않으므로 미션 순서와 완료 시각만 채움
 * TODO: 백엔드가 완료한 미션의 장소명·랭크를 내려주면 연결
 */
export function toJourneyStops(missions: MissionProgress[]): JourneyStop[] {
  return [...missions]
    .sort((a, b) => a.order - b.order)
    .map((mission) => ({
      id: String(mission.id),
      placeName: `미션 ${mission.order}`,
      rank: null,
      startedAt: null,
      endedAt: mission.completedAt === null ? null : new Date(mission.completedAt),
    }));
}
