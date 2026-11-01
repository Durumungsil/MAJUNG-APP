import { cn } from "@/shared/lib";
import { PLACE_CATEGORY_LABEL } from "../config/category";
import type { Place } from "../model/types";
import PlaceName from "./place-name";

type PlaceCardProps = {
  place: Pick<Place, "id" | "name" | "category">;
  selected?: boolean;
  onClick?: () => void;
};

/** 목록용 장소 카드. 사진·주소는 추천 응답에 없고 목록에서는 Google 상세를 조회하지 않음 */
export default function PlaceCard({ place, selected = false, onClick }: PlaceCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex w-full flex-col gap-0.5 rounded-lg px-9 py-2.5 text-left text-text-primary transition-colors",
        selected ? "bg-primary-200" : "bg-natural-100",
      )}
    >
      {/* 카드 폭을 넘는 글자는 줄바꿈하지 않고 말줄임표로 자름 */}
      <span className="flex w-full min-w-0 items-center gap-3 whitespace-nowrap">
        <span className="min-w-0 truncate text-m">
          <PlaceName placeId={place.id} name={place.name} />
        </span>
        {place.category && (
          <span className="shrink-0 text-xs text-primary-800">
            {PLACE_CATEGORY_LABEL[place.category]}
          </span>
        )}
      </span>
    </button>
  );
}
