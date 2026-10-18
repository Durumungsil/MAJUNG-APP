"use client";

import { useState } from "react";
import { JourneyStopCard, type JourneyStop } from "@/entities/journey";
import { Button } from "@/shared/ui";
import { reorderStopPlaces } from "../lib/reorder-stops";
import { useLongPressReorder } from "../model/use-long-press-reorder";

type TimelineEditorProps = {
  initialStops: JourneyStop[];
  confirmHref: string;
};

export default function TimelineEditor({ initialStops, confirmHref }: TimelineEditorProps) {
  const [stops, setStops] = useState(initialStops);

  function handleStopMove(from: number, to: number) {
    setStops((prev) => reorderStopPlaces(prev, from, to));
  }

  const { draggingIndex, getItemProps } = useLongPressReorder({ onMove: handleStopMove });

  return (
    <>
      <ol aria-label="타임라인" className="flex flex-col gap-5 select-none">
        {stops.map((stop, index) => (
          <li key={stop.id} {...getItemProps(index)} className="[-webkit-touch-callout:none]">
            <JourneyStopCard stop={stop} highlighted={draggingIndex === index} />
          </li>
        ))}
      </ol>
      <Button size="xl" href={confirmHref} className="mt-10">
        타임라인 확정하기
      </Button>
    </>
  );
}
