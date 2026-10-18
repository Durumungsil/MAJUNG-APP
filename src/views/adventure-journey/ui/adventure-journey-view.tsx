"use client";

import { JourneyStopCard, useJourneyStore } from "@/entities/journey";
import { Button } from "@/shared/ui";

export default function AdventureJourneyView() {
  const stops = useJourneyStore((state) => state.stops);
  const currentIndex = useJourneyStore((state) => state.currentIndex);

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 justify-center px-page pt-[max(--spacing(16),calc(--spacing(5)+var(--safe-top)))] pb-8">
        <h1 className="text-point text-primary-400">ADVENTURE MODE</h1>
      </header>

      <ol className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-page">
        {stops.map((stop, index) => (
          <JourneyStopCard key={stop.id} stop={stop} isCurrent={index === currentIndex} />
        ))}
      </ol>

      <nav className="flex shrink-0 flex-col px-page pt-20 pb-[max(--spacing(14),calc(--spacing(5.5)+var(--safe-bottom)))]">
        <Button href="/adventure" size="xl">
          지도로 가기
        </Button>
      </nav>
    </main>
  );
}
