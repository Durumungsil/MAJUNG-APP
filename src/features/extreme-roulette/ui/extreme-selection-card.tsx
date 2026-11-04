import { PlaceName, PlaceThumbnail, type Place } from "@/entities/place";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { ROULETTE_KIND_COPY } from "../config/roulette-kinds";
import type { RouletteKind } from "../model/types";

type ExtremeSelectionCardProps = {
  kind: RouletteKind;
  place: Place | null;
  /** 없으면 룰렛 버튼을 보여주지 않음 (룰렛은 대표자만 돌림) */
  rouletteHref: string | null;
};

/** 익스트림 메인의 장소/음식점 카드. 고른 장소가 없으면 안내 문구를 보여줌 */
export default function ExtremeSelectionCard({
  kind,
  place,
  rouletteHref,
}: ExtremeSelectionCardProps) {
  const copy = ROULETTE_KIND_COPY[kind];

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
          {/* 확정한 장소의 사진. 사진 필드만 받는 가벼운 요청이고, 확정 직전 상세에서 받은 사진이 있으면 그대로 씀 */}
          <PlaceThumbnail placeId={place.id} placeName={place.name} className="flex-1" />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-l text-text-primary">
              <PlaceName placeId={place.id} name={place.name} />
            </p>
          </div>
        </div>
      ) : (
        <p className="text-l text-text-muted">{copy.emptyLabel}</p>
      )}
      {rouletteHref !== null && (
        <Button size="xl-compact" href={rouletteHref}>
          {copy.cardSpinLabel}
        </Button>
      )}
    </section>
  );
}
