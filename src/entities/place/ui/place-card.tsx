import { cn } from "@/shared/lib";
import type { Place } from "../model/types";
import BusinessStatusText from "./business-status-text";

type PlaceCardProps = {
  place: Pick<Place, "name" | "category" | "address" | "businessStatus">;
  selected?: boolean;
  onClick?: () => void;
};

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
        <span className="min-w-0 truncate text-m">{place.name}</span>
        <span className="shrink-0 text-xs text-primary-800">{place.category}</span>
      </span>
      <span className="w-full truncate text-s">{place.address}</span>
      <BusinessStatusText status={place.businessStatus} className="w-full truncate text-xs" />
    </button>
  );
}
