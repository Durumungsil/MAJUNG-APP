import { ReviewStarIcon } from "@/shared/assets";
import { PLACE_REVIEW_PREVIEW_COUNT } from "../config/constants";
import type { PlaceReview } from "../model/types";

type PlaceReviewsProps = {
  rating: number | null;
  reviews: PlaceReview[];
  expanded: boolean;
  onExpand: () => void;
};

/**
 * 평점과 Google 리뷰. 처음에는 1개만, "리뷰 더보기"를 누르면 받은 리뷰를 모두 보여줌.
 * Google 정책상 리뷰 작성자를 함께 표시해야 함
 */
export default function PlaceReviews({ rating, reviews, expanded, onExpand }: PlaceReviewsProps) {
  const visibleReviews = expanded ? reviews : reviews.slice(0, PLACE_REVIEW_PREVIEW_COUNT);
  const canExpand = !expanded && reviews.length > PLACE_REVIEW_PREVIEW_COUNT;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-m">
          <ReviewStarIcon className="size-5 text-text-muted" />
          <h3 className="text-text-primary">리뷰</h3>
          {rating !== null && <span className="text-primary-400">{rating.toFixed(1)}</span>}
        </div>
        <ul className="flex flex-col gap-4 text-xs">
          {visibleReviews.map((review, index) => (
            <li key={`${review.authorName}-${index}`} className="flex flex-col gap-1">
              <p className="flex items-start gap-3 whitespace-nowrap">
                {review.authorUri ? (
                  <a
                    href={review.authorUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary"
                  >
                    {review.authorName}
                  </a>
                ) : (
                  <span className="text-text-primary">{review.authorName}</span>
                )}
                {review.relativeTime && (
                  <span className="text-text-muted">{review.relativeTime}</span>
                )}
              </p>
              <p className="line-clamp-2 text-text-primary">{review.text}</p>
            </li>
          ))}
        </ul>
      </div>
      {canExpand && (
        <button type="button" onClick={onExpand} className="w-full text-xs text-text-muted">
          리뷰 더보기
        </button>
      )}
    </section>
  );
}
