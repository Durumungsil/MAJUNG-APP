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
      <span className="flex items-center gap-3 whitespace-nowrap">
        <span className="text-m">{place.name}</span>
        <span className="text-xs text-primary-800">{place.category}</span>
      </span>
      <span className="text-s">{place.address}</span>
      <BusinessStatusText status={place.businessStatus} className="text-xs" />
    </button>
  );
}
