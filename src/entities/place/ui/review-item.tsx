import type { PlaceReview } from "../model/types";

type ReviewItemProps = {
  review: PlaceReview;
};

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li className="flex flex-col gap-1 text-xs">
      <p className="flex gap-3 whitespace-nowrap">
        <span className="text-text-primary">{review.authorName}</span>
        <span className="text-text-muted">{review.createdAgo}</span>
      </p>
      <p className="line-clamp-2 text-text-primary">{review.content}</p>
    </li>
  );
}
