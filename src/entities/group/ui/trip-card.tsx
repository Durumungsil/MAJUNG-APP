import { CalendarIcon, LocationIcon } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { TRIP_MODE_LABEL, TRIP_STATUS_LABEL } from "../config/labels";
import type { Trip } from "../model/types";

type TripCardProps = {
  trip: Trip;
  /** 몇 번째 여행인지 (1부터) */
  order: number;
};

/** 여행 회차 한 개. 그룹 카드와 같은 모양에 회차·상태를 더함 */
export default function TripCard({ trip, order }: TripCardProps) {
  const isCurrent = trip.status !== "COMPLETED";

  return (
    <article
      className={cn(
        "flex flex-col gap-2 rounded-lg px-5 py-4",
        isCurrent ? "bg-primary-200" : "bg-primary-100",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-m text-black">{order}번째 여행</p>
        <p className="text-xs text-text-secondary">{TRIP_STATUS_LABEL[trip.status]}</p>
      </div>
      <div className="flex flex-col">
        <p className="flex items-center gap-1 text-xxs text-primary-800">
          <LocationIcon className="size-3" />
          {trip.region}
          {trip.mode && <span className="text-text-muted"> · {TRIP_MODE_LABEL[trip.mode]}</span>}
        </p>
        <p className="flex items-center gap-1 text-xxs text-text-muted">
          <CalendarIcon className="size-3" />
          {trip.startDate} ~ {trip.endDate}
        </p>
      </div>
    </article>
  );
}
