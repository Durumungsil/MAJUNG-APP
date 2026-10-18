import StampImage from "@/shared/assets/images/stamp-image";
import {
  formatDuration,
  formatEndedAt,
  formatRank,
  getDurationMinutes,
  isJourneyStopCompleted,
} from "../lib/journey-stop";
import type { JourneyStop } from "../model/journey-stop";

interface JourneyStopCardProps {
  stop: JourneyStop;
  isCurrent: boolean;
}

export default function JourneyStopCard({ stop, isCurrent }: JourneyStopCardProps) {
  return (
    <li
      className={`flex items-center gap-6 overflow-clip rounded-lg px-5 py-4 ${isCurrent ? "bg-primary-200" : "bg-natural-100"}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 whitespace-nowrap">
        <div className="flex justify-between text-m text-text-primary">
          <p>{stop.placeName}</p>
          <p>{formatRank(stop.rank)}</p>
        </div>
        <div className="flex justify-between text-xs text-text-muted">
          <p>{formatDuration(getDurationMinutes(stop))}</p>
          <p>{formatEndedAt(stop.endedAt)}</p>
        </div>
      </div>
      <StampImage isCompleted={isJourneyStopCompleted(stop)} />
    </li>
  );
}
