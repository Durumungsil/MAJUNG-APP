import Image from "next/image";
import type { Place } from "@/entities/place";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { ROULETTE_KIND_COPY } from "../config/roulette-kinds";
import type { RouletteKind } from "../model/types";

type ExtremeSelectionCardProps = {
  kind: RouletteKind;
  place: Place | null;
  rouletteHref: string;
};

/** 익스트림 메인의 장소/음식점 카드. 고른 장소가 없으면 안내 문구를 보여줌 */
export default function ExtremeSelectionCard({
  kind,
  place,
  rouletteHref,
}: ExtremeSelectionCardProps) {
  const copy = ROULETTE_KIND_COPY[kind];
  const imageUrl = place?.imageUrls[0];

  return (
    <section
      aria-label={copy.title}
      className={cn(
        "flex h-44.75 w-full flex-col rounded-lg bg-primary-100",
        place ? "justify-between px-5 py-7.5" : "items-center justify-end gap-8.5 p-5",
      )}
    >
      {place ? (
        <div className="flex h-16.5 gap-6">
          <div className="relative flex-1 overflow-hidden rounded-lg bg-natural-400">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={`${place.name} 사진`}
                fill
                sizes="140px"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-l text-text-primary">{place.name}</p>
            <p className="truncate text-s text-text-muted">{place.address}</p>
          </div>
        </div>
      ) : (
        <p className="text-l text-text-muted">{copy.emptyLabel}</p>
      )}
      <Button size="xl-compact" href={rouletteHref}>
        {copy.cardSpinLabel}
      </Button>
    </section>
  );
}
