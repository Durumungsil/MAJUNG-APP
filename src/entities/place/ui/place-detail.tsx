import { BusIcon, ReviewStarIcon } from "@/shared/assets";
import type { Place } from "../model/types";
import BusinessStatusText from "./business-status-text";
import PlacePhotos from "./place-photos";
import ReviewItem from "./review-item";

type PlaceDetailProps = {
  place: Place;
  titleId: string;
  visibleReviewCount: number;
  onShowMoreReviews?: () => void;
};

export default function PlaceDetail({
  place,
  titleId,
  visibleReviewCount,
  onShowMoreReviews,
}: PlaceDetailProps) {
  const visibleReviews = place.reviews.slice(0, visibleReviewCount);
  const hasMoreReviews = place.reviews.length > visibleReviewCount;

  return (
    <div className="flex flex-col gap-6 text-text-primary">
      <div className="flex flex-col gap-1 text-s">
        <div className="flex items-center gap-5 whitespace-nowrap">
          <h2 id={titleId} className="text-xxl">
            {place.name}
          </h2>
          <span className="text-m text-primary-800">{place.category}</span>
        </div>
        <p className="flex gap-3 whitespace-nowrap">
          <BusinessStatusText status={place.businessStatus} />
          <span>{place.businessHoursNote}</span>
        </p>
        <p>{place.address}</p>
        <p className="flex items-center gap-2">
          <BusIcon className="size-4 shrink-0 text-text-muted" />
          {place.transitNote}
        </p>
      </div>
      <PlacePhotos imageUrls={place.imageUrls} placeName={place.name} />
      <section aria-label="리뷰" className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-m">
            <ReviewStarIcon className="size-5 text-text-muted" />
            리뷰
            <span className="text-primary-400">{place.rating.toFixed(1)}</span>
          </p>
          <ul className="flex flex-col gap-4">
            {visibleReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ul>
        </div>
        {hasMoreReviews && onShowMoreReviews && (
          <button
            type="button"
            onClick={onShowMoreReviews}
            className="w-full text-center text-xs text-text-muted"
          >
            리뷰 더보기
          </button>
        )}
      </section>
    </div>
  );
}
