import { cn } from "@/shared/lib";
import { getOpenStatus } from "../lib/open-status";
import type { PlaceOpeningHours } from "../model/types";

type PlaceOpenStatusProps = {
  openingHours: PlaceOpeningHours | null;
};

/** 영업중 / 영업종료(+ 다음 여는 시각). 영업시간 정보가 없으면 영업준비 */
export default function PlaceOpenStatus({ openingHours }: PlaceOpenStatusProps) {
  const status = getOpenStatus(openingHours);

  if (status === null) return <p className="text-s text-text-muted">영업준비</p>;

  return (
    <p className="flex items-center gap-3 text-s whitespace-nowrap">
      <span className={cn(status.isOpen ? "text-success" : "text-danger")}>
        {status.isOpen ? "영업중" : "영업종료"}
      </span>
      {!status.isOpen && status.nextOpenTime && (
        <span className="text-text-primary">{status.nextOpenTime}에 영업 시작</span>
      )}
    </p>
  );
}
