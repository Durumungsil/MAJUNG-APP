import { cn } from "@/shared/lib";
import { formatTimeRange } from "../lib/format-time-range";
import type { TimelineStop } from "../model/types";

type TimelineStopCardProps = {
  stop: Pick<TimelineStop, "startTime" | "endTime" | "placeName">;
  highlighted?: boolean;
  className?: string;
};

export default function TimelineStopCard({
  stop,
  highlighted = false,
  className,
}: TimelineStopCardProps) {
  return (
    <div
      className={cn(
        "flex gap-10 rounded-lg px-9 py-4 text-center text-m text-text-primary transition-colors",
        highlighted ? "bg-primary-200" : "bg-natural-100",
        className,
      )}
    >
      <span className="whitespace-nowrap">{formatTimeRange(stop)}</span>
      {/* 긴 장소 이름은 줄바꿈하지 않고 말줄임표로 자름 */}
      <span className="min-w-0 flex-1 truncate">{stop.placeName}</span>
    </div>
  );
}
