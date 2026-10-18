import { cn } from "@/shared/lib";
import { formatTimeRange } from "../lib/format-time-range";
import type { JourneyStop } from "../model/types";

type JourneyStopCardProps = {
  stop: Pick<JourneyStop, "startTime" | "endTime" | "placeName">;
  highlighted?: boolean;
  className?: string;
};

export default function JourneyStopCard({
  stop,
  highlighted = false,
  className,
}: JourneyStopCardProps) {
  return (
    <div
      className={cn(
        "flex gap-10 rounded-lg px-9 py-4 text-center text-m text-text-primary transition-colors",
        highlighted ? "bg-primary-200" : "bg-natural-100",
        className,
      )}
    >
      <span className="whitespace-nowrap">{formatTimeRange(stop)}</span>
      <span className="min-w-0 flex-1">{stop.placeName}</span>
    </div>
  );
}
