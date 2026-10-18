import { InfoRow } from "@/shared/ui";
import type { Group } from "../model/types";

type TripPeriodCardProps = {
  group: Pick<Group, "startDate" | "endDate">;
};

export default function TripPeriodCard({ group }: TripPeriodCardProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-m text-text-primary">여행 계획 기간</h2>
      <dl className="flex flex-col gap-2 rounded-lg bg-secondary-300 p-5">
        <InfoRow label="시작 일시">{group.startDate}</InfoRow>
        <InfoRow label="종료 일시">{group.endDate}</InfoRow>
      </dl>
    </section>
  );
}
